// Require the necessary discord.js classes
const { Client, Collection, Intents } = require('discord.js');
const { token, prefix, clientId } = require('./config.json');
const tocen = secrets.DISCORD_TOKEN;
const fs = require('fs');

// Create a new client instance
const client = new Client({ intents: [
    Intents.FLAGS.GUILDS, 
    Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MEMBERS , 
    Intents.FLAGS.GUILD_PRESENCES, Intents.FLAGS.DIRECT_MESSAGE_REACTIONS,
	Intents.FLAGS.GUILD_MESSAGE_REACTIONS
] });

client.commands = new Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));


for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	// Set a new item in the Collection
	// With the key as the command name and the value as the exported module
	client.commands.set(command.data.name, command);
}


client.commands.forEach(slashCommand => {
    console.log(`command ${slashCommand.id}`);
});


async function prem(client) {
		//const commandy = client.application?.commands.fetch('912338722748506142');

		if (!client.application?.owner) await client.application?.fetch();

		const commandy = await client.guilds.cache.get('806169537996914798')?.commands.fetch('912338722748506142');


		const permissions = [
			{
				id: '912773882061148200',
				type: 'USER',
				permission: false,
			},
		];

		console.log(commandy);
		await commandy.permissions.add({ permissions });
	}

//prem(client);



for (const file of eventFiles) {
	const event = require(`./events/${file}`);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
        console.log(event.name);
		client.on(event.name, (...args) => event.execute(...args));
	}
}



// Login to Discord with your client's token
client.login(tocen);
