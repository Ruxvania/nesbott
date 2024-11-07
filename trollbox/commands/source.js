import config from '../../config.json' with {type: 'json'};

export default {
	cooldown: 1,
	name: "source",
	description: "Shows the bot's source code.",
	async execute(data, message, args) {
		data.tb.sendMessage(config.sourceLink);
	},
};
