import { Events } from 'discord.js';
import { Message } from '../database.js';
import { createSplicedMessage, generateNyaReply } from "../common-functions.js";
import config from "../config.json" with {type: 'json'};

export default {
	name: Events.MessageCreate,
	async execute(data, message) {

		console.log(`[${message.channel.name}] ${message.author.displayName}: ${message.content}`);

		if (message.author.id != 1163315574357635173 &&
		message.author.id != 1251210562826928251) {
			if (message.content.search(/meow/i) >= 0 ||
			message.content.search(/nya/i) >= 0 ||
			message.content.search(/:3/i) >= 0) {
				message.reply(generateNyaReply());
			} else if (config.nesbottChannelId.some(id => id == message.channel.id) || message.channel.type == 1 ) { // If type is 1, it is DM

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

			} if (config.tbChannelId.some(id => id == message.channel.id) &&
			config.discordToTb){
				data.tb.sendMessage(`${message.author.displayName}: ${message.content}`);
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
			
			await Message.create({
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
