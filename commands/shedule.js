const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data : new SlashCommandBuilder()
	.setName('ротации')
	.setDescription('Вывод расписания ротации')
	.addStringOption(option =>
		option.setName('выбор')
			.setDescription('Что именно выводить выберите')
			.setRequired(true)
            .addChoice('Все расписание', 'Вывод полного расписания ротации')
            .addChoice('Ближайшее расписание', 'Вывод только ближайшего расписания ротации')
        ),
    async execute(interaction) {

        choice = interaction.options.getString('выбор');
        console.log(choice);
        switch (choice) {

            case 'Вывод полного расписания ротации' :
            
                await interaction.reply('Тут будет все расписание');
            break;

            case 'Вывод только ближайшего расписания ротации' :

                await interaction.reply('тут будет только ближайшее расписание');
            break;

            default :

            await interaction.reply('такого выбора нет в расписании');

        }


    },
};