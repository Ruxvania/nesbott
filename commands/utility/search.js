import { SlashCommandBuilder } from 'discord.js';
import { Op } from 'sequelize';
import { Message, TbMessage } from '../../index.js';
import { EmbedBuilder } from 'discord.js';

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
                .setRequired(true))
        .addIntegerOption(option =>
            option.setName('page')
                .setDescription('The page to view')),



    async execute(interaction) {
        try {

            const Database = interaction.options.getString('database') == "Message" ? Message : TbMessage;
            const content = interaction.options.getString('content');
            const page = interaction.options.getInteger('page') || 1;
            const offset = (page - 1) * 25

            const messageList = await Database.findAll({
                attributes: ['content', 'author', 'displayName'],
                where: {
                    content: {
                        [Op.like]: `%${content}%`,
                    },
                },
            });

            const replyEmbed = new EmbedBuilder()
                .setColor(0xFFD700)
                .setTitle('Results for "' + content + '"')
                .setAuthor({ name: 'Mrs. Nesbott' })
                .setTimestamp()
                .setFooter({ text: '/search' });

            let pagination = false;
            let pages;
            let currentPage = page;

            if (messageList.length > offset) {
                for (let i = offset; i < offset + 25 && i < messageList.length; i++) {
                    let name;
                    if (messageList[i].displayName)
                        name = messageList[i].displayName;
                    else {
                        name = messageList[i].author.toString();
                    }
                    let value;
                    if (messageList[i].content.length <= 200) {
                        value = messageList[i].content;
                    } else {
                        value = messageList[i].content.substring(0, 197) + "...";
                    }
                    replyEmbed.addFields({
                        name: name,
                        value: value,
                        inline: true
                    });
                }
                pages = Math.ceil(messageList.length / 25);
                if (pages > 1) {
                    pagination = true;
                    replyEmbed.setFooter({ text: '/search • Page ' + currentPage + ' of ' + pages });
                };
            } else {
                replyEmbed.addFields({ name: 'No results found.', value: ':<', inline: true });
            }

            await interaction.reply({ embeds: [replyEmbed] });
        } catch (error) {
            console.log(error);
        }
    },
};
