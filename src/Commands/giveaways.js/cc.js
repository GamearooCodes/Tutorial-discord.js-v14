//create, end, reroll
const { PermissionFlagsBits, ApplicationCommandOptionType, CommandInteraction, Client, ChannelType } = require("discord.js");
const ms = require("ms");
const ConsoleLog = require("../../Utils/logger");


module.exports = {
    name: "giveaways",
    description: "Giveaways Commands",
    perm: PermissionFlagsBits.Administrator,
    options: [
        {
            name: "create",
            description: "Create a giveaway",
            type: ApplicationCommandOptionType.Subcommand,
            options: [
                {
                    name: "channel",
                    description: "The channel the giveaway posts too!",
                    type: ApplicationCommandOptionType.Channel,
                    required: true
                },
                {
                    name: "duration",
                    description: "the duration D|H|M|S", // 1D 1H 1S 6M
                    type: ApplicationCommandOptionType.String,
                    required: true
                },
                {
                    name: "winners",
                    description: "Number of winners",
                    type: ApplicationCommandOptionType.Number,
                    required: true
                },
                {
                    name: "prize",
                    description: 'The prize',
                    type: ApplicationCommandOptionType.String,
                    required: true
                }
            ]
        },
        {
            name: 'end',
            description: "Ends the giveaway early",
            type: ApplicationCommandOptionType.Subcommand,
            options: [
                {
                    name: "msgid",
                    description: "the id of the giveaway message",
                    type: ApplicationCommandOptionType.String,
                    required: true

                }
            ]
        },
        {
            name: 'reroll',
            description: "Rerolls a nw winner",
            type: ApplicationCommandOptionType.Subcommand,
            options: [
                {
                    name: "msgid",
                    description: "the id of the giveaway message",
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
        const {options, member, guild, channel} = interaction;


        switch(options.getSubcommand()) {
            case "reroll":
                var msgidreroll = options.getString("msgid");

                client.giveaways.reroll(msgidreroll).then(() =>{
                     
                    interaction.channel.send("success Giveaway rerolled")
                }).catch((err)=> {
                    new ConsoleLog().errorAsync(err);
                    interaction.channel.send("An error has poped up which caused this to fail please try again or report to the bot dev...")
                })
                interaction.reply({content: "COMPLETED", ephemeral: true})
                break;
                case "end":
                    var msgidend = options.getString("msgid");

                    client.giveaways.end(msgidend).then(() => {
                        interaction.channel.send("Giveaway ended")
                    }).catch((err) => {
                        new ConsoleLog().errorAsync(err);
                    interaction.channel.send("An error has poped up which caused this to fail please try again or report to the bot dev...")
                    })
                    interaction.reply({content: "COMPLETED", ephemeral: true})
                    break;
                    case "create":
                        var givechannel = options.getChannel("channel");

                        if(givechannel.type !== ChannelType.GuildText) 
                            return interaction.reply({
                                content: "giveaway channel must be a Text Channel not a category or voice",
                                ephemeral: true
                        })
                        var duration = options.getString("duration");
                        var winners = options.getNumber("winners");
                        var prize = options.getString("prize");


                        client.giveaways.start(givechannel, {
                            duration: ms(duration),
                            prize,
                            lastChance: {
                                enabled: true,
                                content: "**LAST CHANCE TO ENTER !**",
                                threshold: 18000000,
                                embedColor: "#ff002b"
                            },
                            winnerCount: winners,
                            hostedBy: member.user,
                            messages: {
                                giveaway: "�" + " Giveaway",
                                giveawayEnded: "�" + " Giveaway Ended!",
                                drawing: "Time Remaining **{timestamp}**",
                                inviteToParticipate: "React with � to enter!",
                                winMessage: "Congrats, {winners}! You won **{this.prize}**!\n {this.messageURL}",
                                noWinner: "No one entered the giveaway!",
                                hostedBy: "Hosted by {this.hostedBy}",
                                winners: "Winners:",
                                emjbedFooter: "{this.winnerCount} winner(s) | Ends at:",
                                endedAt: "Ended AT",
                                units: {
                                    seconds: "seconds",
                                    minutes: "minutes",
                                    hours: "hours",
                                    days: "days",
                                    plurals: false,
                                }
                            }
                        }).catch(err => {
                            new ConsoleLog().errorAsync(err);
                        })
                        interaction.reply({content: `Starting ${givechannel}`, ephemeral: true})

        }

    }
}