const { Interaction, PermissionsBitField } = require('discord.js');
const { beta } = require('../../config');
const ConsoleLog = require('../Utils/logger');
module.exports = {
    name: 'interactionCreate',
    once: false,
    /**
     * 
     * @param {Interaction} interaction 
     */
    async run(interaction) {
        const client = interaction.client;
        const { commandName } = interaction;
        if (!interaction.isCommand()) return null;

        let command = client.commands.get(commandName);

        var commands = client.application.commands;

        if (beta) commands = interaction.guild.commands;

        if (!command) {
            interaction.reply(`${commandName} was removed!`);
            commands.delete(interaction.commandId).then(cmd => {
                new ConsoleLog().warn(`${commandName} was not found so i removed it`);
            })
            return;
        }

        const permcheck = new PermissionsBitField(command.perm);

        if (!interaction.member.permissions.has(permcheck)) return interaction.reply({ content: `Missing ${permcheck.toArray()}`, ephemeral: true }).catch(err => { });

        let extras = {};

        command.run(interaction, client, extras);
    }
}