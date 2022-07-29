const { Logs } = require("ram-api.js");

class ConsoleLog extends Logs {
    constructor() {
        super('Tutorial Bot')
    }
}

module.exports = ConsoleLog;