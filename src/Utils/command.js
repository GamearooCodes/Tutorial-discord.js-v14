const { Client } = require("discord.js");
const { readdirSync } = require("fs");
const { beta, devGuildId } = require("../../config");
const path = require('node:path');
const ConsoleLog = require("./logger");

/**
 * 
 * @param {Client} client 
 */
module.exports = (client) => {
    var commands = client.application.commands;

    if (beta) commands = client.guilds.cache.get(devGuildId).commands;

    readdirSync("./src/Commands/").forEach(dir => {
        const commands2 = readdirSync(`./src/Commands/${dir}/`).filter(f => f.endsWith('.js'));

        for (const file of commands2) {
            let pull = require(`../Commands/${dir}/${file}`);

            client.commands.set(pull.name, pull);

            let { name, options, description } = pull;

            commands?.create({
                name,
                description,
                options
            })

            new ConsoleLog().info(`Loaded Command ${name}`);
        }
    })
}