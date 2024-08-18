import { SlashCommandBuilder } from 'discord.js';
import { Op } from 'sequelize';
import { Message, TbMessage } from '../../index.js';

export default {
    category: 'utility',
    cooldown: 0,
    data: new SlashCommandBuilder()
        .setName('search')
        .setDescription('Search for messages containing a string.')
        .addStringOption(option =>
            option.setName('database')
                .setDescription('The database to search')
                .setRequired(true)
                .addChoices(
                    { name: 'Discord', value: 'Message' },
                    { name: 'Trollbox', value: 'TbMessage' },
                ))
        .addStringOption(option =>
            option.setName('content')
                .setDescription('The string to search for')
                .setRequired(true)),

    async execute(interaction) {
        try {
            const Database = interaction.options.getString('database') == "Message" ? Message : TbMessage;
            const content = interaction.options.getString('content');
            const messageList = await Database.findAll({
                attributes: ['content'],
                where: {
                    content: {
                        [Op.like]: `%${content}%`,
                    },
                },
            });

            const messageArray = messageList.map(text => text.content) || 'No messages logged.';
            let messageString = "";

            function messageArrayToString(item){
                messageString = messageString + '\n\n' + item;
            }
            messageArray.forEach(messageArrayToString);

            await interaction.reply(messageString.substring(0,2000) !== "" ? messageString.substring(0,2000) : "No results.");
        } catch (error) {
            console.log(error);
        }
    },
};
