export default {
	cooldown: 2,
    localCooldown: 10,
	name: "chat",
	description: "Can't be used in atrium; toggle the bot's talking.",
	async execute(data, message, args) {
		if (data.tb.chatbot) {

            data.tb.chatbot = data.tb.chatbot == false ? true : false;
            data.tb.sendMessage("Chatbot disabled.");
        
        } else if (data.tb.room == "atrium") {
            
            data.tb.sendMessage(`${data.tb.prefix}chat can't be used in atrium!`)

        } else {
            data.tb.chatbot = data.tb.chatbot == false ? true : false;
            data.tb.sendMessage("Chatbot enabled.");
        }
	},
};

