const { Client, Collection } = require('discord.js');
const { readdirSync } = require('fs');
const colors = require('colors');

class Bot extends Client {
    constructor(options) {
        super(options);

        this.commands = new Collection();
        this.config = require('./config.json');

    };

    async loadCommands() {

        const commandsFiles = readdirSync('./src/commands');
        for (const dir of commandsFiles) {
            const cmdFile = readdirSync(`./src/commands/${dir}`).filter(f => f.endsWith('.js'));
            for (const cmd of cmdFile) {
                const command = new (require(`./commands/${dir}/${cmd}`))(client);
                if (command.config.name) {

                    this.commands.set(command.config.name, command);
                    console.log(`[COMMANDS]`.red + ` chargé > ` + `${command.config.name}`.green);

                } else { continue };
            };
        };

    };

    async loadEvents() {

        const eventsFiles = readdirSync('./src/events');
        for (const dir of eventsFiles) {
            const evtFile = readdirSync(`./src/events/${dir}`).filter(f => f.endsWith('.js'));
            for (const evt of evtFile) {

                const event = new (require(`./events/${dir}/${evt}`))(client);
                const eventName = evt.split('.')[0];
                
                if (event.run) {
                    this.on(eventName, (...args) => event.run(...args));
                    console.log(`[EVENTS]`.red + ` chargé > ` + `${eventName}`.green);
                } else continue;

            };
        };

    };

    async init() {

        console.clear();

        this.loadCommands();
        this.loadEvents();

        this.login(this.config.token);

    };

};

const client = new Bot();
client.init();