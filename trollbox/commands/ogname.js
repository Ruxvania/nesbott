export default {
	cooldown: 2,
	name: "ogname",
	description: "Change the bot's name back to the original name.",
	async execute(data, message, args) {
		if (data.tb.name !== data.tb.defaultName) {
            data.tb.name = data.tb.defaultName;
            data.tb.socket.emit("user joined", `${data.tb.genName()}`, data.tb.color, "", "");
        } else {
            data.tb.sendMessage(`I am already called ${data.tb.genName()}.`);
        }
	},
};
