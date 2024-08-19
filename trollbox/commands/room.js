import { tb } from '../../index.js';
import { isArgsVaild, censor, arrayToString } from '../../common-functions.js';

export default {
    cooldown: 2,
    name: "room",
    description: "Change the bot's room.",
	async execute(message, args) {
		if (isArgsVaild(args) == true && censor(arrayToString(args), "report", "hardbanned", "gayleb") == false) {
            tb.room = arrayToString(args);

            console.log(tb.room);

            tb.sendMessage(`/room ${tb.room}`);
            setTimeout(() => {
                if (tb.room !== tb.defaultRoom) {
                    tb.room = tb.defaultRoom;
                    tb.sendMessage(`/room ${tb.defaultRoom}`); 
                    if (tb.room == "atrium") {
                        tb.chatbot = false;
                    }
                }
        }, 300000);
        } else {
            tb.sendMessage(`I am in the room ${tb.room}.`);
        }
        if (tb.room == "atrium") {
			tb.chatbot = false;
		}
	},
}