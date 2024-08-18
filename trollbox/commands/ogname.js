import { tb } from '../../index.js';

export default {
	cooldown: 2,
	name: "ogname",
	description: "Change the bot's name back to the original name.",
	async execute(message, args) {
		if (tb.name !== tb.defaultName) {
            tb.name = tb.defaultName;
            tb.socket.emit("user joined", `${tb.genName()}`, tb.color, "", "");
        } else {
            tb.sendMessage(`I am already called ${tb.genName()}.`);
        }
	},
};
