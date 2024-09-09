import { Events } from 'discord.js';
import { Message } from '../index.js';
import { ActivityType } from 'discord.js';


export default {
	name: Events.ClientReady,
	once: true,
	execute(client) {
		console.log(`Logged in to Discord as ${client.user.tag}`);

		client.user.setActivity('/help - Chatting with you', { type: ActivityType.Custom });
	},
};
