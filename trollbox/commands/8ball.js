import { getRandomInteger } from '../../common-functions.js';

export default {
	cooldown: 0,
	name: "8ball",
	description: 'Roll a 8ball.',
	async execute(data, message, args) {
		const replys = {
			positive: ["Yes.", "Definitely.", "Totally.", "Yeah, sure.", "Go ahead.", "Affirmative."],
			neutral: ["Ask again later.", "Try again later.", "Reply hazy.", "Undecided.", "Maybe.", "Why the hell would you ask me that?", "What am I supposed to say?"],
			negative: ["No.", "Nope.", "Never.", "What!? No!"]
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
