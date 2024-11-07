import { clean } from '../../common-functions.js';

export default {
    name: "user left",
    async execute(data, message) {

        data.tb.sendDiscordMessage(`**${clean(message.nick)}** *has left teh trollbox*`);
        
        if (message.nick == data.tb.genName()) {

            console.log("Trollbox bot disconnected.");
            Process.emit('SIGINT');
    
        }

    },
};