import { tb } from '../../index.js';

export default {
	cooldown: 2,
    localCooldown: tb.chatbot ? 10 : 100,
	name: "chat",
	description: "Can't be used in atrium; toggle the bot's talking.",
	async execute(message, args) {
		if (tb.chatbot) {

            tb.chatbot = tb.chatbot == false ? true : false;
            tb.sendMessage("Chatbot disabled.");
        
        } else if (tb.room == "atrium") {
            
            tb.sendMessage(`${tb.prefix}c can't be used in atrium!`)

        } else {
            tb.chatbot = tb.chatbot == false ? true : false;
            tb.sendMessage("Chatbot enabled.");
        }
	},
};

