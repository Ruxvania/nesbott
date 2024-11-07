import fs from 'node:fs';
import path from 'node:path';
import config from '../../config.json' with {type: 'json'};
import { SlashCommandBuilder } from 'discord.js';
import Sequelize from 'sequelize';
import { Op } from 'sequelize';
import { Message, TbMessage, Block } from '../../database.js';

export default {
	category: 'utility',
	cooldown: 0,
	data: new SlashCommandBuilder()
		.setName('eval')
		.setDescription('Run arbitrary code.')
		.addStringOption(option =>
			option.setName('code')
				.setDescription('The code to run')
				.setRequired(true)),
	async execute(data, interaction) {
		if (interaction.user.id == config.ownerId) {
			try {
				const code = interaction.options.getString('code');
				let result = eval(code);

				// If the result is a Promise, await it
				if (result instanceof Promise) {
					result = await result;
				}

				// Send the result back to the Discord channel
				await interaction.reply(`${result}`);
			} catch (error) {
				await interaction.reply(`${error.message}`);
			}
		} else {
			await interaction.reply("You are not the owner of the bot!");
		}
	},
};
