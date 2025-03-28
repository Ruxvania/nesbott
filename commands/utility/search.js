import { SlashCommandBuilder } from 'discord.js';
import { Op } from 'sequelize';
import { Message, TbMessage } from '../../database.js';
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



    async execute(data, interaction) {
        try {

            const Database = interaction.options.getString('database') == "Message" ? Message : TbMessage;
            const content = interaction.options.getString('content');
            const page = interaction.options.getInteger('page') || 1;
            const offset = (page - 1) * 25;

            let messageList;
            let names;
            let values;
            let pagination = false;
            let pages;
            let currentPage = page;

            if (Database == Message) {
                messageList = await Database.findAll({
                    attributes: ['content', 'author', 'displayName'],
                    where: {
                        content: {
                            [Op.like]: `%${content}%`,
                        },
                    },
                });

                names = messageList.map(message => {
                    if (message.displayName) {
                        return message.displayName;
                    } else {
                        return message.author;
                    }
                })

                values = messageList.map(message => {
                    return message.content;
                })

            } else if (Database == TbMessage) {
                messageList = await Database.findAll({
                    attributes: ['content', 'nick', 'home'],
                    where: {
                        content: {
                            [Op.like]: `%${content}%`,
                        },
                    },
                });

                names = messageList.map(message => {
                    if (message.nick) {
                        return message.nick;
                    } else {
                        return message.home;
                    }
                })

                values = messageList.map(message => {
                    return message.content;
                })
            }

            console.log(messageList);

            const replyEmbed = new EmbedBuilder()
                .setColor(0xFFD700)
                .setTitle('Results for "' + content + '"')
                .setAuthor({ name: 'Mrs. Nesbott' })
                .setTimestamp()
                .setFooter({ text: '/search' });

            function populateEmbed(nameArray, valueArray, offset) {
                if (nameArray.length > offset) {
                    for (let i = offset; i < offset + 25 && i < nameArray.length; i++) {
                        if (valueArray[i].length > 200) {
                            replyEmbed.addFields({
                                name: nameArray[i].toString().substring(0, 50),
                                value: valueArray[i].toString().substring(0, 197) + "...",
                                inline: true
                            });
                        } else {
                            replyEmbed.addFields({
                                name: nameArray[i].toString(),
                                value: valueArray[i].toString(),
                                inline: true
                            });
                        }
                    }
                    pages = Math.ceil(nameArray.length / 25);
                    if (pages > 1) {
                        pagination = true;
                        replyEmbed.setFooter({ text: '/search • Page ' + currentPage + ' of ' + pages });
                    };
                } else {
                    replyEmbed.addFields({ name: 'No results found.', value: ':<', inline: true });
                }
            }

            populateEmbed(names, values, offset);

            await interaction.reply({ embeds: [replyEmbed] });
        } catch (error) {
            console.log(error);
        }
    },
};
