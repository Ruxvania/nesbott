import { getRandomInteger } from '../../common-functions.js';

export default {
	cooldown: 0,
	name: "8ball",
	description: 'Roll a 8ball.',
	async execute(data, message, args) {
		const replys = {
			positive: ["Yes.",
				"Definitely.",
				"Totally.",
				"Yeah, sure.",
				"Affirmative.",
				"It is certain.",
				"It is decidedly so.",
				"Without a doubt.",
				"Yes, definitely.",
				"You may rely on it.",
				"As I see it, yes.",
				"Most likely.",
				"Outlook good.",
				"Signs point to yes."],
			neutral: ["Try again later.",
				"Reply hazy.",
				"Undecided.",
				"Maybe.",
				"Why the hell would you ask me that?",
				"What am I supposed to say?",
				"Reply hazy, try again",
				"Ask again later.",
				"Better not tell you now.",
				"Cannot predict now.",
				"Concentrate and ask again."],
			negative: ["No.",
				"Nope.",
				"Never.",
				"What!? No!",
				"Outlook poor.",
				"Don't count on it.",
				"My reply is no.",
				"My sources say no.",
				"Outlook not so good.",
				"Very doubtful."]
		};
		let chosenReply;
		const replyType = getRandomInteger(1, 3);
		if (replyType == 1) {
			chosenReply = `🟢 ${replys.positive[getRandomInteger(0, replys.positive.length - 1)]}`
		} else if (replyType == 2) {
			chosenReply = `🟡 ${replys.neutral[getRandomInteger(0, replys.neutral.length - 1)]}`
		} else {
			chosenReply = `🔴 ${replys.negative[getRandomInteger(0, replys.negative.length - 1)]}`
		}
		data.tb.sendMessage(`🎱 | ${chosenReply}`);
	},
};
