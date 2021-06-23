class Message {
    constructor(client) {
        this.client = client;
    };

    async run (message) {

        if (message.author.bot || !message.guild || !message.content.startsWith(this.client.config.prefix)) return;
        const args = message.content.slice(this.client.config.prefix.length).trim().split(/ +/g);
        const cmd = args.shift().toLowerCase();
        const command = this.client.commands.get(cmd) || this.client.commands.find(c => c.config.aliases && c.config.aliases.includes(cmd));
        if (command) command.run(message, args).catch((err) => message.channel.send(`Une erreur est survenue.\n\`\`\`${err}\`\`\``));
        else return;

    };

};

module.exports = Message;