import { SlashCommandBuilder } from 'discord.js';

export default {
	category: 'utility',
	cooldown: 0,
	data: new SlashCommandBuilder()
		.setName('user')
		.setDescription('Provides information about the user.'),
	async execute(data, interaction) {
		await interaction.reply(`This command was run by ${interaction.user.username}, who joined on ${interaction.member.joinedAt}.`);
	},
};
