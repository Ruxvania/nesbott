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

export const Message = sequelize.define('message', {
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

export const TbMessage = sequelize.define('tbMessage', {
	content: {
		type: Sequelize.TEXT,
	},
	home: Sequelize.STRING,
	nick: Sequelize.TEXT,
});
TbMessage.sync();

export const Block = sequelize.define('block', {
	discordId: Sequelize.INTEGER,
	discordDisplay: Sequelize.STRING,
	tbHome: Sequelize.STRING,
	tbNick: Sequelize.TEXT,
	tbColor: Sequelize.TEXT,
	comment: Sequelize.TEXT
});
Block.sync();
