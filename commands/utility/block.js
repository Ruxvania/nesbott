import config from '../../config.json' with {type: 'json'};
import { SlashCommandBuilder } from 'discord.js';
import { Block, tb } from '../../index.js';
import { Op } from 'sequelize';

export default {
    category: 'utility',
    cooldown: 0,
    data: new SlashCommandBuilder()
        .setName('block')
        .setDescription('Manage users blocked from the bot.')
        .addSubcommand(subcommand =>
            subcommand
                .setName('view')
                .setDescription('View blocks.')
                .addUserOption(option =>
                    option.setName('content')
                        .setDescription('The string to search for')))
        .addSubcommand(subcommand =>
            subcommand
                .setName('add')
                .setDescription('Add a block.')
                .addUserOption(option =>
                    option.setName('discord-user')
                        .setDescription('The Discord user to block'))
                .addStringOption(option =>
                    option.setName('tb-home')
                        .setDescription("The Trollbox user's home to block"))
                .addStringOption(option =>
                    option.setName('tb-nick')
                        .setDescription("The Trollbox user's nick to block"))
                .addStringOption(option =>
                    option.setName('tb-color')
                        .setDescription("The Trollbox user's color to block"))
                .addStringOption(option =>
                    option.setName('comment')
                        .setDescription("Addition info about the block.")))
        .addSubcommand(subcommand =>
            subcommand
                .setName('remove')
                .setDescription('Remove a block.')
                .addStringOption(option =>
                    option.setName('id')
                        .setDescription('The ID of the block to remove.')
                        .setRequired(true))),
    async execute(interaction) {
        if (interaction.user.id == config.ownerId) {

            switch (interaction.options.getSubcommand()) {
                case "view":

                    const content = interaction.options.getString('content') ?? null;
                    let blockArray;
                    if (content) {
                        blockArray = await Block.findAll({
                            where: {
                                [Op.or]: [
                                    { id: { [Op.like]: `%${content}%` } },
                                    { discordId: { [Op.like]: `%${content}%` } },
                                    { discordDisplay: { [Op.like]: `%${content}%` } },
                                    { tbHome: { [Op.like]: `%${content}%` } },
                                    { tbNick: { [Op.like]: `%${content}%` } },
                                    { tbColor: { [Op.like]: `%${content}%` } },
                                    { comment: { [Op.like]: `%${content}%` } },
                                ]
                            },
                        });
                    } else {
                        blockArray = await Block.findAll();
                    }

                    let blockString = "**ID   DiscordId   DiscordDisplay   TbHome   TbNick   TbColor   Comment**";

                    for (let i in blockArray) {
                        blockString += `\n[${blockArray[i].id}]   ${blockArray[i].discordId ?? "-"}   ${blockArray[i].discordDisplay ?? "-"}   ${blockArray[i].tbHome ?? "-"}   ${blockArray[i].tbNick ?? "-"}   ${blockArray[i].tbColor ?? "-"}   ${blockArray[i].comment ?? "-"}`
                    }

                    await interaction.reply(blockString ?? "No reults.");

                    break;

                case "add":

                    const discordUser = interaction.options.getUser('discord-user') ?? null;
                    const discordUserId = discordUser ? discordUser.id : null;
                    const discordUserName = discordUser ? discordUser.displayName : null;
                    const tbHome = interaction.options.getString('tb-home') ?? null;
                    const tbNick = interaction.options.getString('tb-nick') ?? null;
                    const tbColor = interaction.options.getString('tb-color') ?? null;
                    const comment = interaction.options.getString('comment') ?? null;

                    if (discordUserId ||
                        tbHome ||
                        tbNick ||
                        tbColor
                    ) {

                        const block = await Block.create({
                            discordId: discordUserId,
                            discordDisplay: discordUserName,
                            tbHome: tbHome,
                            tbNick: tbNick,
                            tbColor: tbColor,
                            comment: comment,
                        })

                        tb.refreshBlocks();

                        await interaction.reply('✅');

                    } else {

                        await interaction.reply("Please specify at least one way to block.");

                    }

                    break;

                case "remove":

                    let id = interaction.options.getString('id') ?? null;

                    if (id) {

                        await Block.destroy({
                            where: {
                                id: id,
                            },
                        });

                        tb.refreshBlocks();

                        await interaction.reply("✅");

                    } else {

                        await interaction.reply("Please provide an ID to unblock.");

                    }

                    break;

                default:
                    await interaction.reply("Please specify a subcommand.");
            }



        } else {

            await interaction.reply("You are not the owner of the bot!");

        }
    },
};
