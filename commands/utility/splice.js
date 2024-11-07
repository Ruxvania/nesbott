import { SlashCommandBuilder } from 'discord.js';

export default {
	category: 'utility',
	cooldown: 0,
	data: new SlashCommandBuilder()
		.setName('splice')
		.setDescription('Combine two sentences.')
		.addStringOption(option =>
			option.setName('message1')
				.setDescription('The message to splice')
				.setRequired(true))
        .addStringOption(option =>
			option.setName('message2')
				.setDescription('The message to splice')
				.setRequired(true))
        .addStringOption(option =>
            option.setName('word')
                .setDescription('The word to merge the messages at')),
	async execute(data, interaction) {

        function getRandomInteger(min, max) {
            return Math.floor(Math.random() * (max - min + 1) ) + min;
          }
        
		const message1 = interaction.options.getString('message1').split(" ");
        const message2 = interaction.options.getString('message2').split(" ");
        const combineWord = interaction.options.getString('word') ?? message1.at(getRandomInteger(0, message1.length - 1));
        let combineWordSearchResult = -1;

        for (let i = 0; i < message2.length; i++) {
            if (message2[i].toLowerCase() == combineWord.toLowerCase()) {
                combineWordSearchResult = i;
                console.log(`${combineWordSearchResult}, ${i}, ${message2[i].toLowerCase}, ${combineWord.toLowerCase}`);
            }
        }

        if (combineWordSearchResult == -1) {
            await interaction.reply("Splicing failed!");
        } else {
            let result = " ";
            for (let i = 0; i < message1.length; i++) {
                if (message1[i] == combineWord) {
                    i = message1.length;
                } else {
                    result = result + " " + message1[i];
                }
                console.log("Message 1");
                console.log(result);
                console.log(message1[i]);
            }
            for (let i = combineWordSearchResult; i < message2.length; i++) {
                result = result + " " + message2[i];
                console.log("Message 2");
                console.log(result);
                console.log(message2[i]);
            }
            await interaction.reply(result);
        }
        
	},
};
