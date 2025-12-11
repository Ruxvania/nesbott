import { isArgsVaild, censor, arrayToString, clean } from '../../common-functions.js';

export default {
    cooldown: 2,
    name: "fuck",
    description: "Fuck a user.",
	async execute(data, message, args) {
        let targetUser;
        let originUser;
		if (isArgsVaild(args) == true && censor(arrayToString(args), "report", "tbServerMessageBan") == false) {
            targetUser = clean(arrayToString(args));
            if (censor(arrayToString(args), "report", "tbServerMessageBan") == false) { 
                originUser = clean(message.nick);
            } else {
                originUser = "anonymous";
            }
            data.tb.sendMessage(`${originUser} fucks ${targetUser}, lewd!`);
        } else {
            data.tb.sendMessage(`Invaild agruments!`);
        }
	},
}