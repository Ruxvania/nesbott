import { clean } from '../../common-functions.js';

export default {
    name: "user joined",
    async execute(data, message) {
        
        data.tb.sendDiscordMessage(`**${clean(message.nick)}** *has entered teh trollbox*`);

    },
};