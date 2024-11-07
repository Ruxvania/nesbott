export default {
	cooldown: 0,
	name: "pong",
	description: 'Ping!',
	async execute(data, message, args) {
		data.tb.sendMessage("Ping!");
	},
};
