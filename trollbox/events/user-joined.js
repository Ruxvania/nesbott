import { tb } from '../../index.js';
import { clean } from '../../common-functions.js';

export default {
    name: "user joined",
    async execute(data) {
        
        tb.sendDiscordMessage(`**${clean(data.nick)}** *has entered teh trollbox*`);

    },
};