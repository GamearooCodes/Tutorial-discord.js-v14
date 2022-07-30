const { PermissionFlagsBits, ApplicationCommandOptionType, CommandInteraction, Client, EmbedBuilder } = require("discord.js");
const RamApi = require("../../Utils/apiclient");
const ConsoleLog = require("../../Utils/logger");

module.exports = {
    name: 'fun',
    description: 'Fun commands',
    perm: PermissionFlagsBits.SendMessages,
    options: [
        {
            name: '8ball',
            description: 'Ask the bot a question',
            type: ApplicationCommandOptionType.Subcommand,
            options: [
                {
                    name: 'question',
                    description: 'the question to ask the bot',
                    type: ApplicationCommandOptionType.String,
                    required: true
                }
            ]
        }
    ],
    /**
     * 
     * @param {CommandInteraction} interaction 
     * @param {Client} client 
     * @param {*} extras 
     */
    async run(interaction, client, extras) {
        const { options } = interaction;

        const cmd = options.getSubcommand();

        let apiclient = new RamApi();
        let logger = new ConsoleLog();

        switch (cmd) {
            case "8ball":
                let q = options.getString('question');

                let res = await apiclient._8ball('english').catch(err => logger.error(err));

                let embed = new EmbedBuilder()
                    .setColor("Random")
                    .setDescription(`Question: ${q}\n Answer: ${res.text}`);

                interaction.reply({ embeds: [embed] })
                break;
        }
    }
}