import { isArgsVaild, clean, censor, arrayToString } from '../../common-functions.js';

export default {
	cooldown: 0,
	name: "say",
	description: 'Make the bot say something.',
	async execute(data, message, args) {
		if (isArgsVaild(args) == true && !censor(clean(arrayToString(args)), "report", "hardbanned", "gayleb", "tbcommand")) {
            data.tb.sendMessage(clean(arrayToString(args)));
        } else {
            data.tb.sendMessage("Invaild arguments!");
        }
	},
};
