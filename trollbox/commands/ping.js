import { tb } from '../../index.js';

export default {
	cooldown: 0,
	name: "ping",
	description: 'Pong!',
	async execute(message, args) {
		tb.sendMessage("Pong!");
	},
};
