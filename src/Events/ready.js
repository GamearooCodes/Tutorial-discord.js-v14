const { Client } = require("discord.js");
const { version } = require("../../config");
const RamApi = require("../Utils/apiclient");
const ConsoleLog = require("../Utils/logger");
const { Utils } = require("ram-api.js");
const { GiveawaysManager } = require('discord-giveaways');

module.exports = {
    name: 'ready',
    once: true,
    /**
     * 
     * @param {Client} client 
     */
    async run(client) {
        require('../Utils/command')(client);
        new Utils().VersionCheck("v16");

        //code here

        client.giveaways = new GiveawaysManager(client, {
            storage: '.give.json',
            updateCountdownEntry: "10000",
            embedColor: "Random",
            reaction: "�"
        });

        new ConsoleLog().infoAsync(`${client.user.tag} is ready on v${version}`);
    }
}