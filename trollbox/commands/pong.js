import { tb } from '../../index.js';

export default {
	cooldown: 0,
	name: "pong",
	description: 'Ping!',
	async execute(message, args) {
		tb.sendMessage("Ping!");
	},
};
