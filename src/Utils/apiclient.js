const {NormalEndpoints } = require("ram-api.js");
const { apikey } = require("../../config");

class RamApi extends NormalEndpoints {
    constructor() {
        super(apikey, 'v16', 8000, 2)
    }
}

module.exports = RamApi;