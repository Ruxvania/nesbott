import { SlashCommandBuilder } from 'discord.js';

export default {
	category: 'utility',
	cooldown: 0,
	data: new SlashCommandBuilder()
		.setName('pong')
		.setDescription('Replies with Ping!'),
	async execute(data, interaction) {
		await interaction.reply('Ping!');
	},
};
