import { Events } from 'discord.js';
import { Message } from '../index.js';


export default {
	name: Events.ClientReady,
	once: true,
	execute(client) {
		try {
			Message.sync();
		} catch(error){
			console.log(error);
		}
		console.log(`Logged in to Discord as ${client.user.tag}`);
	},
};
