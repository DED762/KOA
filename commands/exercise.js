const { MessageEmbed } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
const { zanatie, zanadd, zanread, zanremove, zanrewrite } = require("../functions.js");
//const { channel } = require('diagnostics_channel');

module.exports = {
    data : new SlashCommandBuilder()
	.setName('занятие')
	.setDescription('Проведение занятий на сервере!')
	.addSubcommand(subcommand =>
		subcommand
			.setName('открыть')
			.setDescription('Открытие занятия')
			.addStringOption(option => option
                .setName('тема')
                .setDescription('Ввод темы занятия')
                .setRequired(true)
            )
        )
	.addSubcommand(subcommand =>
		subcommand
			.setName('начать')
			.setDescription('Начало занятия')
            .addIntegerOption(option => option
                .setName('номер')
                .setDescription('Введите номер занятия')
                .setRequired(true)
            )
        )
    .addSubcommand(subcommand =>
        subcommand
            .setName('завершить')
            .setDescription('Завершение занятия')
            .addIntegerOption(option => option
                .setName('номер')
                .setDescription('Введите номер занятия')
                .setRequired(true)
            )
        )
    .addSubcommand(subcommand =>
        subcommand
            .setName('закрыть')
            .setDescription('Закрытие занятия')
            .addIntegerOption(option => option
                .setName('номер')
                .setDescription('Введите номер занятия')
                .setRequired(true)
            )
        ),
    async execute(interaction) {
         //await interaction.reply('Вот занятие');

         const ava = interaction.member.user.displayAvatarURL();
         let rarr = interaction.member._roles;
         let role_teacher = interaction.guild.roles.cache.find(role => role.name === 'Преподаватель');
         var tema = '';
         var vse_zanyatia = zanread('test.json');
         let data = new Date();
      if (rarr.includes(role_teacher.id)) {
        if (interaction.options.getSubcommand() === 'открыть') {
          	
            tema = interaction.options.getString('тема');
            let autor = interaction.member.user.username;
            let cannel_id = interaction.channel.id;
            let time_start = data.toLocaleString().replace(',', ' в' );
            let zan = zanatie(vse_zanyatia.length,'open',autor,cannel_id,tema,['нет'],['нет'],['нет'], time_start, '')
            zanadd('test.json',zan);
            let id_zan = zanread('test.json').length-1; // так как созданное занятие добавленно

            //let data = new Date();

            const embed = new MessageEmbed()
			.setColor('#0099ff')
            .setAuthor(autor, ava)
			.setTitle(`Тема занятия: ${tema}`)
			//.setURL('https://discord.js.org')
			.setDescription('Занятие созданно под номером: **' + id_zan + '**.' + '\r\n' + ' Посещаемость на занятии открыта. Введите `1` для отметки посещения' )
            .addField("Время открытия: ", time_start);

			await interaction.reply({ embeds: [embed] });

		
		} else if (interaction.options.getSubcommand() === 'начать') {

            let id_zan = interaction.options.getInteger('номер'); // присвоение номера занятия 
            let autor = interaction.member.user.username;
            
            //console.log(vse_zanyatia.length);
            //console.log(id_zan <= vse_zanyatia.length-1);

            if ((id_zan != '') && (id_zan <= vse_zanyatia.length-1) && (vse_zanyatia[id_zan] != undefined)) { // проверка наличия занятия
              if (vse_zanyatia[id_zan].avtor == autor) { // проверка  автора
                //console.log(id_zan);
                //console.log(vse_zanyatia);
                if (interaction.channel.id == vse_zanyatia[id_zan].channel_id ) { //проверка канала занятия по номеру занятия как третий аргумент
                  if (vse_zanyatia[id_zan].status == 'open')  {
                    vse_zanyatia[id_zan].status = 'start';
                    //zanyatie.channel = mess.channel;
                    
                    //interaction.delete().catch();
                    if (vse_zanyatia[id_zan].spisok.length > 1) {
                      vse_zanyatia[id_zan].spisok.splice(0,1);
                    }
                    vse_zanyatia[id_zan].spisok.sort();

                    console.log(vse_zanyatia[id_zan].spisok);


                    zanrewrite('test.json',id_zan,vse_zanyatia[id_zan]);


                    const embed = new MessageEmbed() //RichEmbed() //Создаём новый эмбед.
                      .setColor('#0099ff') //Цвет зелёный. Можно указать hex.
                      .setAuthor(autor, ava) //Устанавливает автора.
                      .setTitle(`Тема: ${vse_zanyatia[id_zan].tema}`) //Устанавливаем заголовок.
                      .setDescription('Введите `0` Если Вы опоздали.') //Устанавливаем описание.
                      .addField('Время начала: ', data.toLocaleString()) //Добавляет поле.
                      .addField("Присутствие:", vse_zanyatia[id_zan].spisok.join('\n')); //Добавляет поле.

                    await interaction.reply({ embeds: [embed] });  //Отправляем.
                    
                  } else {await interaction.reply({content:'Сначало нужно открыть занятие.', ephemeral: true }) }
                } else {await interaction.reply({content:'Занятие открыто в другом канале', ephemeral: true })}  
              } else {await interaction.reply({content:'Занятие под этим номером открыто другим преподавателем', ephemeral: true })} // не тот автор
            } else {await interaction.reply({content:'Занятие не имеет номер или номер не правильный', ephemeral: true })} // не тот номер


        } else if (interaction.options.getSubcommand() === 'завершить') {

            const id_zan = interaction.options.getInteger('номер');
            let autor = interaction.member.user.username;

            if ((id_zan != '') && (id_zan <= vse_zanyatia.length-1) && (vse_zanyatia[id_zan] != undefined)) { // проверка наличия занятия
              if (interaction.channel.id == vse_zanyatia[id_zan].channel_id ) { //проверка канала занятия
                if (vse_zanyatia[id_zan].status == 'start') {
                  vse_zanyatia[id_zan].status = 'finish';
                  //zanyatie.channel = mess.channel;
                  //interaction.delete().catch();

                  zanrewrite('test.json',id_zan,vse_zanyatia[id_zan]);

                  const embed = new MessageEmbed() //RichEmbed() //Создаём новый эмбед.
                    .setTitle(`Тема: ${vse_zanyatia[id_zan].tema}`) //Устанавливаем заголовок.
                    .setColor('#0099ff') //Цвет зелёный. Можно указать hex.
                    .setAuthor(autor, ava) //Устанавливает автора.
                    .addField("Время завершения: ", data.toLocaleString()) //Добавляет поле.
                    .setDescription("Итоговая посещаемость в конце занятия открыта. Введите `9` для отметки посещения. Если Вы перед началом занятия не вводили __**1**__ или во время занятия - __**0**__. То Ваше итоговое посещение не будет учтено." ); //Устанавливаем описание.
            
                  await interaction.reply({ embeds: [embed] });//Отправляем.

                } else {await interaction.reply({content:'Занятие еще не началось', ephemeral: true }) }  
              } else {await interaction.reply({content:'Занятие открыто в другом канале', ephemeral: true })}
            } else {await interaction.reply({content:'Занятие не имеет номер или номер не правильный', ephemeral: true })} // не тот номер


        } else if (interaction.options.getSubcommand() === 'закрыть') {

            const id_zan = interaction.options.getInteger('номер');
            let autor = interaction.member.user.username;
            let time_end = data.toLocaleString().replace(',', ' в' );

            if ((id_zan != '') && (id_zan <= vse_zanyatia.length-1) && (vse_zanyatia[id_zan] != undefined)) { // проверка наличия занятия
                if (interaction.channel.id == vse_zanyatia[id_zan].channel_id ) { //проверка канала занятия
                  if (vse_zanyatia[id_zan].status == 'finish') {
                    vse_zanyatia[id_zan].status = 'close';
        
                    //var spisok = zanyatie.spisok;
                    //zanyatie.spisok = ['нет'];  
        
                    //zanyatie.channel = mess.channel;
                    //interaction.delete().catch();
        
                    if (vse_zanyatia[id_zan].opozd.length > 1) {
                      vse_zanyatia[id_zan].opozd.splice(0,1);
                    }
        
                    let spisok = [];
                    let opozd = [];
        
                    vse_zanyatia[id_zan].spisok.forEach((item,index,array) => {
                      if (vse_zanyatia[id_zan].spisok_z.includes(item)) {
                        spisok.push(array[index]);
                      }
                    });
                    if (spisok.length < 1) {
                      spisok = ['нет'];
                    };
                    vse_zanyatia[id_zan].spisok = spisok;
        
                    vse_zanyatia[id_zan].opozd.forEach((item,index,array) => {
                      if (vse_zanyatia[id_zan].spisok_z.includes(item)) {
                        opozd.push(array[index]);
                      }
                    });
                    if (opozd.length < 1) {
                      opozd = ['нет'];
                    };
                    vse_zanyatia[id_zan].opozd = opozd;
        
                    vse_zanyatia[id_zan].spisok.sort();
                    vse_zanyatia[id_zan].opozd.sort();

                    vse_zanyatia[id_zan].time_end = time_end;
        
                    zanrewrite('test.json',id_zan,vse_zanyatia[id_zan]);
                    //console.log(zanyatie);
                    //try {
                      const embed = new MessageEmbed() //RichEmbed() //Создаём новый эмбед.
                      .setTitle(`Тема: ${vse_zanyatia[id_zan].tema}`) //Устанавливаем заголовок.
                      .setColor('#0099ff') //Цвет зелёный. Можно указать hex.
                      .setAuthor(autor, ava) //Устанавливает автора.
                      .setDescription("Спасибо за посещение занятия. Теперь можно раслабиться. Если Вас нет в списках значит Вы не отмечались перед началом занятия или во время занятия. А может Вы забыли отметится в конце занятия." ) //Устанавливаем описание.
                      .addField("Время закрытия: ", time_end) //Добавляет поле.
                      .addField("Присутствие:", vse_zanyatia[id_zan].spisok.join('\n')) //Добавляет поле.
                      .addField("Опоздали:", vse_zanyatia[id_zan].opozd.join('\n')); //Добавляет поле.
                  
                    //} catch(err) {console.log(err)}
        
                    await interaction.reply({ embeds: [embed] });//Отправляем.
                    //delete vse_zanyatia[id_zan];
        
                  } else {await interaction.reply({content:'Сначало занятие должно быть завершено', ephemeral: true }) }  
                } else {await interaction.reply({content:'Занятие открыто в другом канале', ephemeral: true })}
              } else {await interaction.reply({content:'Занятие не имеет номер или номер не правильный', ephemeral: true })} // не тот номер

           

        }
      } else { await interaction.reply('Занятие может открыть только преподаватель.'); return}
    },        
};
