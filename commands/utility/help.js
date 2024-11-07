import { SlashCommandBuilder } from 'discord.js';

export default {
	category: 'utility',
	cooldown: 0,
	data: new SlashCommandBuilder()
		.setName('help')
		.setDescription('Information about the bot.'),
	async execute(data, interaction) {

		let commands = "";

		const commandsIterator = interaction.client.commands.values();
		for (const command of commandsIterator) {
			commands += "/" + command.data.name + " - " + command.data.description + "\n";
		}

		await interaction.reply("# Nesbott \n" + commands);
	},
};
