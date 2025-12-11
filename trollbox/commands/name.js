import { isArgsVaild, censor, arrayToString } from '../../common-functions.js';

export default {
	cooldown: 2,
	name: "name",
	description: "Change the bot's name.",
	async execute(data, message, args) {
		if (isArgsVaild(args) == true && !censor(arrayToString(args), "report", "tbServerNickBan")) {
            data.tb.name = arrayToString(args);
            data.tb.socket.emit("user joined", `${data.tb.genName()}`, data.tb.color, "", "");
        } else {
            data.tb.sendMessage("Invaild arguments!");
        }
	},
};
