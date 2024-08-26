const {  ExecuteLogger } = require("ram-api.js");

class ConsoleLog extends ExecuteLogger {
    constructor() {
        super('Tutorial Bot')
    }
}

module.exports = ConsoleLog;