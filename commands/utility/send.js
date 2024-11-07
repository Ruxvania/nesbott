import { SlashCommandBuilder } from 'discord.js';

export default {
	category: 'utility',
	cooldown: 1,
	data: new SlashCommandBuilder()
		.setName('send')
		.setDescription('Send a message to Trollbox.')
		.addStringOption(option =>
			option.setName('message')
				.setDescription('The message to send')
				.setRequired(true)),
	async execute(data, interaction) {
        data.tb.sendMessage(`${interaction.user.displayName}: ${interaction.options.getString('message')}`);
        await interaction.reply({ content: '✅', ephemeral: true });
	},
};
