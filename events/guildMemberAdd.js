const { MessageEmbed } = require('discord.js');
const { diffdata, timedata } = require("../functions.js");

module.exports = {
	name: 'guildMemberAdd',
    execute(member) {
        console.log('guildMemberAdd');
        console.log(`${member.user.tag} triggered an guildMemberAdd.`);
        console.log('Пользователь @' + member.user.tag + ' подключился к серверу!');
        
        try {
            var role = member.guild.roles.cache.find(role => role.name == "Входящий")
            member.roles.add(role);
            mess = member.guild.channels.cache.find(channel => channel.name == "общее"); // получение канала 
            chan = member.guild.channels.cache.find(chan => chan.name === "приветствие-и-правила"); // определение канала оповещения
        } catch {console.log('на сервере нет роли "Входящий"'); console.error(err)}
        
        if (member.user.avatar == null) {
            ava = 'https://cdn.discordapp.com/embed/avatars/0.png';
          } 
          else {
            ava = member.user.displayAvatarURL()
          };
         
        try {
            mess_log = member.guild.channels.cache.find(channel => channel.name == "модерация-лог");
            //console.log(mess_log);
            let data = new Date();
            const embed = new MessageEmbed() //RichEmbed() //Создаём новый эмбед.
            .setAuthor(member.user.tag, ava) //Устанавливает автора.
            .setColor(`GREEN`) //Цвет зелёный. Можно указать hex.
            //.setTitle({files:[ava]} + ' ' + member.user.tag) //Устанавливаем заголовок.
            .setDescription('📥Пользователь <@' + member.user.id + '> подключился к серверу!') //Устанавливаем описание.
            //.addField('Аккаунт создан: ', member.user.createdAt.toLocaleString()) //Когда создан аккаунт
            .addField('Аккаунт создан: ', diffdata(member.user.createdAt, data)) //Когда создан аккаунт
            .addField("Присоединился: ", member.joinedAt.toLocaleString()) //Когда зашёл на сервер
            .setThumbnail(member.user.displayAvatarURL()) //Аватар человека
            .setFooter("ID пользователя: " + member.user.id); //Устанавливает подпись мелким шрифтом под эмбедом.
            
            //console.log(embed);

            mess_log.send({ embeds: [embed] }); //Отправляем.
            mess.send('<@'+member.user.id + '> Спасибо что подключились к серверу. C правилами можете ознакомиться в канале: <#'+chan+'>')
                    
        } catch(err) {console.log('ошибка в регистрации'); console.error(err)}

    },
};