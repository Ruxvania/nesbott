import { tb } from '../../index.js';

export default {
	cooldown: 2,
	name: "ogroom",
	description: "Change the bot's room back to the original room.",
	async execute(message, args) {
		if (tb.room !== tb.defaultRoom) {
            tb.room = tb.defaultRoom;
            tb.sendMessage(`/room ${tb.room}`); 
        } else {
            tb.sendMessage(`I am already in ${tb.room}.`);
        }
		if (tb.room == "atrium") {
			tb.chatbot = false;
		}
	},
};
