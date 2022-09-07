const { MessageEmbed } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Replies with Pong!')
		.addIntegerOption(option => option.setName('int').setDescription('Enter an integer')),
	async execute(interaction) {

		const integer = interaction.options.getInteger('int');

		function proz(tek) {
			const p = 5;
			let full = '\u2593';
			let pool = '\u2591'
			let text = '\n';
		
			for (let i=1;  i <= Math.round(tek/p); i++) {
				text = text + full
			}
		
			for (let i=1;  i <= 100/p-Math.round(tek/p); i++) {
				text = text + pool
			}
		
			return text + ' - ' + tek + '%';
		}



		//await interaction.reply('Pong!');

		const embed = new MessageEmbed()
                .setColor('#0099ff')
                //.setAuthor(autor, ava)
                .setTitle(`Вопрос:`)
                //.setURL('https://discord.js.org')
                .setDescription('pong!')
                .addField('Поставьте реакцию', proz(integer), true)
                //.addField('Варианты', answ2_st, true)
                //.addField('Варианты', answ3_st, true)
        await interaction.reply({ embeds: [embed]});
	},
};
