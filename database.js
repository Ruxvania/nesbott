import cls from 'cls-hooked';
import Sequelize from 'sequelize';
import config from './config.json' with {type: 'json'};

// Prepare Database
const namespace = cls.createNamespace('namespace');
Sequelize.useCLS(namespace);

const sequelize = new Sequelize({
	host: 'localhost',
	dialect: 'sqlite',
	logging: config.dbLogging ? console.log : false,
	// SQLite only
	storage: 'database.sqlite',
});

// Messages collected from Discord
export const Message = sequelize.define('discord_message', {
	content: Sequelize.TEXT,
	message: {
		type: Sequelize.INTEGER,
		unique: true,
	},
	author: Sequelize.INTEGER,
	guild: Sequelize.INTEGER,
	channel: Sequelize.INTEGER,
	displayName: Sequelize.TEXT,
	username: Sequelize.TEXT,
	nsfw: Sequelize.BOOLEAN,
});
Message.sync();

// Messages collected from Trollbox
export const TbMessage = sequelize.define('trollbox_message', {
	content: {
		type: Sequelize.TEXT,
	},
	home: Sequelize.STRING,
	nick: Sequelize.TEXT,
});
TbMessage.sync();

// Users banned from the bot
export const Block = sequelize.define('block', {
	discordId: Sequelize.INTEGER,
	discordDisplay: Sequelize.STRING,
	tbHome: Sequelize.STRING,
	tbNick: Sequelize.TEXT,
	tbColor: Sequelize.TEXT,
	comment: Sequelize.TEXT
});
Block.sync();

// Settings for a Discord server
export const DiscordGuildSetting = sequelize.define('discord_guild_setting', {
	guildId: Sequelize.INTEGER,
	setting: Sequelize.STRING,
	value: Sequelize.STRING
});
DiscordGuildSetting.sync();

// Settings for a Discord user
export const DiscordUserSetting = sequelize.define('discord_user_setting', {
	userId: Sequelize.INTEGER,
	setting: Sequelize.STRING,
	value: Sequelize.STRING
});
DiscordUserSetting.sync();