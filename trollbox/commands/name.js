import { tb } from '../../index.js';
import { isArgsVaild, censor, arrayToString } from '../../common-functions.js';

export default {
	cooldown: 2,
	name: "name",
	description: "Change the bot's name.",
	async execute(message, args) {
		if (isArgsVaild(args) == true && !censor(arrayToString(args), "report", "hardbanned", "gayleb")) {
            tb.name = arrayToString(args);
            tb.socket.emit("user joined", `${tb.genName()}`, tb.color, "", "");
        } else {
            tb.sendMessage("Invaild arguments!");
        }
	},
};
