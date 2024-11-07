import { isArgsVaild, censor, arrayToString } from '../../common-functions.js';

export default {
    cooldown: 2,
    name: "room",
    description: "Change the bot's room.",
	async execute(data, message, args) {
		if (isArgsVaild(args) == true && censor(arrayToString(args), "report", "hardbanned", "gayleb") == false) {
            data.tb.room = arrayToString(args);

            console.log(data.tb.room);

            data.tb.sendMessage(`/room ${data.tb.room}`);
            setTimeout(() => {
                if (data.tb.room !== data.tb.defaultRoom) {
                    data.tb.room = data.tb.defaultRoom;
                    data.tb.sendMessage(`/room ${data.tb.defaultRoom}`); 
                    if (data.tb.room == "atrium") {
                        data.tb.chatbot = false;
                    }
                }
        }, 300000);
        } else {
            data.tb.sendMessage(`I am in the room ${data.tb.room}.`);
        }
        if (data.tb.room == "atrium") {
			data.tb.chatbot = false;
		}
	},
}