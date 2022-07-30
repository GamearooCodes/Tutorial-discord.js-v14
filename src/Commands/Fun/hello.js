const { PermissionFlagsBits, CommandInteraction, Client } = require("discord.js");
const RamApi = require("../../Utils/apiclient");
const ConsoleLog = require("../../Utils/logger");

module.exports = {
    name: 'hello',
    description: 'Get a hello',
    perm: PermissionFlagsBits.SendMessages,
    /**
     * 
     * @param {CommandInteraction} interaction 
     * @param {Client} client 
     * @param {*} extras 
     */
    async run(interaction, client, extras) {
        let res = await new RamApi().hello('english').catch(err => new ConsoleLog().error(err));

        interaction.reply({ content: res.text });
    }
}