// Imports
import fs from 'node:fs';
import path from 'node:path';
import { Client, Collection, GatewayIntentBits } from 'discord.js';
import config from './config.json' with {type: 'json'};
import { clean, censor } from "./common-functions.js";
import io from "socket.io-client";
import tbHeaders from 'trollbox-headers';
import { Message, TbMessage, Block } from './database.js';



// Discord
// Client Intents
console.log("Preparing Discord Client...");

const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,
	],
});

// Prepare commands
console.log("Preparing Discord commands...")

client.cooldowns = new Collection();

client.commands = new Collection();
const foldersPath = path.join(import.meta.dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
	const commandsPath = path.join(foldersPath, folder);
	const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
	console.log(commandFiles);
	for (const file of commandFiles) {
		const filePath = path.join(commandsPath, file);
		console.log(filePath);
		import(filePath).then(
			function (command) {
				console.log(filePath);
				if ('data' in command.default && 'execute' in command.default) {
					client.commands.set(command.default.data.name, command.default);
					console.log("(Discord Command) " + command.default.data.name);
				} else {
					console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
				}
			}
		);
	}
}

// Prepare events
console.log("Preparing Discord events...")

const eventsPath = path.join(import.meta.dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
	const filePath = path.join(eventsPath, file);
	import(filePath).then(
		function (event) {
			if (event.default.once) {
				client.once(event.default.name, (...args) => event.default.execute({client, tb}, ...args));
				console.log("(Discord Event) " + event.default.name);
			} else {
				client.on(event.default.name, (...args) => event.default.execute({client, tb}, ...args));
				console.log("(Discord Event) " + event.default.name);
			}
		}
	)
}

// Login to Discord
console.log("Logging into Discord...");

client.login(config.token);



// Trollbox
const tb = {
	channelId: config.tbChannelId,
	defaultName: config.tbDefaultName,
	defaultRoom: config.tbDefaultRoom,
	defaultColor: config.tbDefaultColor,
	prefix: config.tbPrefix,
	home: "91284083c1e557374ca4495371d875506d5ddbfc2891dceae56f6ba0cc3a8c63",
	name: config.tbDefaultName,
	color: config.tbDefaultColor,
	room: config.tbDefaultRoom,
	lastMessage: "",
	chatCooldown: false,
	chatbot: false,
	commandsEnabled: config.tbCommandsEnabled,

	sendMessage: function (message) {
		message = message == this.lastMessage ? clean(message) + " " : clean(message);
		this.socket.emit('message', message);
		this.lastMessage = message;
	},

	sendTbMessageToDiscord: function (message) {
		if (client.isReady()) {
			tb.channelId.forEach(id => {
				client.channels.fetch(id).then(
					function (channel) { channel.send(`**${censor(clean(message.nick), "omit", "link", "ping")}:** ${censor(clean(message.msg), "omit", "link", "ping")}`.substring(0, 1000)); }
				);
			})
		}
	},

	sendDiscordMessage: function (message) {
		if (client.isReady()) {
			tb.channelId.forEach(id => {
				client.channels.fetch(id).then(
					function (channel) { channel.send(message.substring(0, 1000)); }
				);
			})
		}
	},

	genName: function () {
		return `${this.name} [${this.prefix}]`;
	},

	refreshBlocks: async function () {

		let blockArray = await Block.findAll({
			attributes: ['tbHome', 'tbNick', 'tbColor'],
		});

		this.blocked = {};
		this.blocked.home = [];
		this.blocked.nick = [];
		this.blocked.color = [];

		for (let i in blockArray) {

			if (blockArray[i].tbHome) {
				this.blocked.home.push(blockArray[i].tbHome);
			}
			if (blockArray[i].tbNick) {
				this.blocked.nick.push(blockArray[i].tbNick);
			}
			if (blockArray[i].tbColor) {
				this.blocked.color.push(blockArray[i].tbColor);
			}

		}
	}
};

await tb.refreshBlocks();

tb.eventsPath = path.join(import.meta.dirname, 'trollbox/events');
tb.eventFiles = fs.readdirSync(tb.eventsPath).filter(file => file.endsWith('.js'));

// Login to Trollbox
tb.socket = io('http://www.windows93.net:8081', tbHeaders.headers());

for (const file of tb.eventFiles) {
	const filePath = path.join(tb.eventsPath, file);
	import(filePath).then(
		function (event) {
			tb.socket.on(event.default.name, (...args) => event.default.execute({client, tb}, ...args));
		}
	)
}

tb.globalCooldowns = {};
tb.localCooldowns = {};

tb.commands = {};
tb.commandsPath = path.join(import.meta.dirname, 'trollbox/commands');
tb.commandFiles = fs.readdirSync(tb.commandsPath).filter(file => file.endsWith('.js'));

for (const file of tb.commandFiles) {
	const filePath = path.join(tb.commandsPath, file);
	import(filePath).then(
		function (command) {
			if ('name' in command.default && 'execute' in command.default) {
				tb.commands[command.default.name] = command.default;
			} else {
				console.log(`[WARNING] The command at ${filePath} is missing a required "name" or "execute" property.`);
			}
		}
	)
}



// Exports
export { Message, TbMessage, Block, tb, client };