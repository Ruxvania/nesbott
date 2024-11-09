import { Events } from 'discord.js';
import { Message } from '../database.js';
import { createSplicedMessage, generateNyaReply } from "../common-functions.js";
import config from "../config.json" with {type: 'json'};

export default {
	name: Events.MessageCreate,
	async execute(data, message) {

		if (message.member != message.client.user.id && message.member != 1163315574357635173) {
			console.log(`[${message.channel.name}] ${message.author.displayName}: ${message.content}`);

			if (message.content.search(/meow/i) >= 0 || message.content.search(/nya/i) >= 0 ||
			message.content.search(/:3/i) >= 0) {
				message.reply(generateNyaReply());
			} else if (config.nesbottChannelId.some(id => id == message.channel.id)) {

				try {
					let messageReply = await createSplicedMessage(message.content, Message);
					await message.reply(messageReply);
				} catch (error) {
					if (error == "Nothing returned" || error == "Splicing failed") {
						return;
					} else {
						await message.reply(`Error: ${error}`);
					}
				}

			}
		}



		if (message.author.bot == false &&
			(message.content.split(" ").length >= 4 && message.content.split(" ").length <= 25 ||
				Array.isArray(message.content.match(/(?:http[s]?:\/\/.)?(?:www\.)?[-a-zA-Z0-9@%._\+~#=]{2,256}\.[a-z]{2,6}\b(?:[-a-zA-Z0-9@:%_\+.~#?&\/\/=]*)/m)))) {

			let nsfw;
			if (message.channel.nsfw == false) {
				nsfw = false;
			} else {
				nsfw = true;
			}
			
			const loggedMessage = await Message.create({
				content: message.content,
				message: message.id,
				author: message.author.id,
				guild: message.guild.id,
				channel: message.channel.id,
				displayName: message.author.displayName,
				username: message.author.username,
				nsfw: nsfw,
			})
		}

	},
};