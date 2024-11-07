import { SlashCommandBuilder } from 'discord.js';
import config from '../../config.json' with {type: 'json'};

export default {
	category: 'utility',
	cooldown: 0,
	data: new SlashCommandBuilder()
		.setName('source')
		.setDescription('Shows the source code of the bot.'),
	async execute(data, interaction) {
		await interaction.reply(config.sourceLink);
	},
};
