class Ready {
    constructor(client) {
        this.client = client;
    };

    async run () {
        console.log(`[CLIENT]`.red + ' connecté.'.green);
    };

};

module.exports = Ready;