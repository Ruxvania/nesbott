import { Events } from 'discord.js';
import { ActivityType } from 'discord.js';

export default {
	name: Events.ClientReady,
	once: true,
	execute(data) {
		console.log(data);
		console.log(`Logged in to Discord as ${data.client.user.tag}`);

		data.client.user.setActivity('/help - Chatting with you', { type: ActivityType.Custom });
	},
};
