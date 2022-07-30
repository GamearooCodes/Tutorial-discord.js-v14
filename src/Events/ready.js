const { Client } = require("discord.js");
const { version } = require("../../config");
const RamApi = require("../Utils/apiclient");
const ConsoleLog = require("../Utils/logger");

module.exports = {
    name: 'ready',
    once: true,
    /**
     * 
     * @param {Client} client 
     */
    async run(client) {
        require('../Utils/command')(client);
        new RamApi().version_check();

        //code here

        new ConsoleLog().info(`${client.user.tag} is ready on v${version}`);
    }
}