const { MessageEmbed } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('опрос')
		.setDescription('Проведение опроса')
        .addStringOption(option => option.setName('вопрос').setDescription('Введите вопрос').setRequired(true))
        .addBooleanOption(option => 
            option.setName('мульти_опрос')
                .setDescription('Выберите да или нет')
                .setRequired(true)
            )
        .addStringOption(option => //строковый ввод
            option.setName('вариант_ответа_1')
                .setDescription('Назначте вариант ответа')
            )
        .addStringOption(option => //строковый ввод
            option.setName('вариант_ответа_2')
                .setDescription('Назначте вариант ответа')
            )
        .addStringOption(option => //строковый ввод
            option.setName('вариант_ответа_3')
                .setDescription('Назначте вариант ответа')
            )
        .addStringOption(option => //строковый ввод
            option.setName('вариант_ответа_4')
                .setDescription('Назначте вариант ответа')
            )
        .addStringOption(option => //строковый ввод
            option.setName('вариант_ответа_5')
                .setDescription('Назначте вариант ответа')
            )
        .addStringOption(option => //строковый ввод
            option.setName('вариант_ответа_6')
                .setDescription('Назначте вариант ответа')
            ),
	async execute(interaction) {

        const qwer_st = interaction.options.getString('вопрос');
        const bool = interaction.options.getBoolean('мульти_опрос');

        if (bool) {
        
            var answ = [];
            var df = [];
            const answ1_st = interaction.options.getString('вариант_ответа_1');
            const answ2_st = interaction.options.getString('вариант_ответа_2');
            const answ3_st = interaction.options.getString('вариант_ответа_3');
            const answ4_st = interaction.options.getString('вариант_ответа_4');
            const answ5_st = interaction.options.getString('вариант_ответа_5');
            const answ6_st = interaction.options.getString('вариант_ответа_6');

            
                if (answ1_st !== null) {
                    answ = answ.concat(answ1_st);
                    let react1 = answ1_st.codePointAt(0);
                    const df1 = String.fromCodePoint(react1);
                    df = df.concat(df1);
                    if (answ2_st !== null) {
                        answ = answ.concat(answ2_st);
                        let react2 = answ2_st.codePointAt(0);
                        const df2 = String.fromCodePoint(react2);
                        df = df.concat(df2);
                        if (answ3_st !== null) {
                            answ = answ.concat(answ3_st);
                            let react3 = answ3_st.codePointAt(0);
                            const df3 = String.fromCodePoint(react3);
                            df = df.concat(df3);
                            if (answ4_st !== null) {
                                answ = answ.concat(answ4_st);
                                let react4 = answ3_st.codePointAt(0);
                                const df4 = String.fromCodePoint(react4);
                                df = df.concat(df4);
                                if (answ5_st !== null) {
                                    answ = answ.concat(answ5_st);
                                    let react5 = answ5_st.codePointAt(0);
                                    const df5 = String.fromCodePoint(react5);
                                    df = df.concat(df5);
                                    if (answ6_st !== null) {
                                        answ = answ.concat(answ6_st);
                                        let react6 = answ6_st.codePointAt(0);
                                        const df6 = String.fromCodePoint(react6);
                                        df = df.concat(df6);
                                    }
                                }
                            }
                        }
                    }
                } else {
                    console.log('Мульти вопрос без параметров');
                    await interaction.reply({ content:'Вам следует использовать не мульти опрос', ephemeral: true });
                    return;
                };
           


            console.log(answ);
            console.log(df);

            //console.log(`${df[0]} ${df[1]} ${df[2]}`);

            var strin = '';
            for (let i=0; i<df.length; i++) {
                strin = strin + `${answ[i]} \n`
            };

            const embed = new MessageEmbed()
                .setColor('#0099ff')
                //.setAuthor(autor, ava)
                .setTitle(`Вопрос:`)
                //.setURL('https://discord.js.org')
                .setDescription(qwer_st)
                .addField('Поставьте реакцию', strin, true)
                //.addField('Варианты', answ2_st, true)
                //.addField('Варианты', answ3_st, true)
            const message = await interaction.reply({ embeds: [embed], fetchReply: true });

            for (let i=0; i<df.length; i++) {
            message.react(df[i]);
            }
            //message.react(df[1]); 
            //message.react(df[2]);

        } else {
            const embed = new MessageEmbed()
                .setColor('#0099ff')
                //.setAuthor(autor, ava)
                .setTitle(`Вопрос:`)
                //.setURL('https://discord.js.org')
                .setDescription(qwer_st)
                .addField('Поставьте реакцию', `👍 - Да \n 👎 - Нет \n 🙄 - Не знаю`, true)
                //.addField('Варианты', answ2_st, true)
                //.addField('Варианты', answ3_st, true)
            const message = await interaction.reply({ embeds: [embed], fetchReply: true });
            
            //channel = interaction.channel;
            //console.log(channel.lastmessage);

            message.react('👍');
            message.react('👎'); 
            message.react('🙄');  

        }
	},
};