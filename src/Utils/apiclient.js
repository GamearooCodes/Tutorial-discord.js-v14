const { APiClient } = require("ram-api.js");
const { apikey } = require("../../config");

class RamApi extends APiClient {
    constructor() {
        super(apikey, 'v10')
    }
}

module.exports = RamApi;