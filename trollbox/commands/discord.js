import { tb } from '../../index.js';
import config from '../../config.json' with {type: 'json'};

export default {
	cooldown: 0,
	name: "disc",
	description: "View the link to the bot's discord server.",
	async execute(message, args) {
		tb.sendMessage(config.serverLink);
	},
};
