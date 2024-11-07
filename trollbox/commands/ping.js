export default {
	cooldown: 0,
	name: "ping",
	description: 'Pong!',
	async execute(data, message, args) {
		data.tb.sendMessage("Pong!");
	},
};
