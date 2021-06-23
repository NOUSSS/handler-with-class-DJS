class Command {
    constructor(client, {
        name = null,
        aliases = new Array()
    }) {
        this.client = client;
        this.config = { name, aliases };
    };
};

module.exports = Command;