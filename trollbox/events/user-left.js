import { tb } from '../../index.js';
import { clean } from '../../common-functions.js';

export default {
    name: "user left",
    async execute(data) {

        tb.sendDiscordMessage(`**${clean(data.nick)}** *has left teh trollbox*`);
        
        if (data.nick == tb.genName()) {

            console.log("Trollbox bot disconnected.");
            Process.emit('SIGINT');
    
        }

    },
};