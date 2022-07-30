const fs = require('node:fs');
const path = require('node:path');
const { Client, GatewayIntentBits, Partials, Collection } = require('discord.js')

class BotClient extends Client {
    constructor() {
        super({
            intents: [GatewayIntentBits.Guilds],
            partials: [Partials.User],
        })
        this.commands = new Collection();
    }
    start(token) {
        const eventsPath = path.join(__dirname, 'Events');
        const eventsFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

        for (const file of eventsFiles) {
            const filePath = path.join(eventsPath, file);

            const event = require(filePath);
            if (event.once) {
                this.once(event.name, (...args) => event.run(...args));
            } else {
                this.on(event.name, (...args) => event.run(...args));
            }
        }

        this.login(token);
    }
}

module.exports = BotClient;