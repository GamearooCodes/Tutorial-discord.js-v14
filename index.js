const { token } = require("./config");
const BotClient = require("./src/client");

new BotClient().start(token);