const Command = require('../../base/command');

class Ping extends Command {
    constructor(client) {
        super(client, {
            name: 'ping',
            aliases: [] // je veux rien mettre.
        });
    };

    async run(message, args) { // pas besoin de mettre client car tu peux directement faire this.client pour accéder au client.

        if (args[0] === 'x)') {
            message.delete();
            return message.channel.send('x)');
        };

        const msg = await message.channel.send(`Pong!`);
        await msg.edit(`${this.client.ws.ping}MS!`);

    };

};

module.exports = Ping;