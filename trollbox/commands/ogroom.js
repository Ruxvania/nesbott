export default {
	cooldown: 2,
	name: "ogroom",
	description: "Change the bot's room back to the original room.",
	async execute(message, args) {
		if (data.tb.room !== data.tb.defaultRoom) {
            data.tb.room = data.tb.defaultRoom;
            data.tb.sendMessage(`/room ${data.tb.room}`); 
        } else {
            data.tb.sendMessage(`I am already in ${data.tb.room}.`);
        }
		if (data.tb.room == "atrium") {
			data.tb.chatbot = false;
		}
	},
};
