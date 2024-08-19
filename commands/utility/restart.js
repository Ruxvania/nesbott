import { SlashCommandBuilder } from 'discord.js';

export default {
	category: 'utility',
	cooldown: 0,
	data: new SlashCommandBuilder()
		.setName('restart')
		.setDescription('Restarts the bot.'),
	async execute(interaction) {
		await interaction.reply('Restarting...');
		process.exit();
	},
};
