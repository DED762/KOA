const { MessageEmbed } = require('discord.js');
//const { diffdata } = require("../functions.js");

module.exports = {
	name: 'guildMemberUpdate',
    execute(oldmember, newmember) {
        console.log('guildMemberUpdate');
        console.log(`${newmember.user.tag} triggered an guildMemberUpdate.`);

      //if (oldmember.nickname === newmember.nickname) return;  

        if (newmember.user.avatar == null) {
            ava = 'https://cdn.discordapp.com/embed/avatars/0.png'
          } 
          else {
            ava = newmember.user.displayAvatarURL()
          };
      if (oldmember.nickname != newmember.nickname) {
        try {
            mess = newmember.guild.channels.cache.find(channel => channel.name == "модерация-лог"); // получение канала    
            
            const embed = new MessageEmbed() //RichEmbed() //Создаём новый эмбед.
            .setAuthor(newmember.user.tag, ava) //Устанавливаем заголовок.
            .setColor(`RED`) //Цвет красный. Можно указать hex.
            .setThumbnail(ava)
            .setDescription('📝Пользователь <@' + newmember.user.id + '> измеил свой профиль!') //Устанавливаем описание.
            .setFooter("ID пользователя: " + newmember.user.id)
            .addField("**Старый никнейм:** ", "`" + `${oldmember.nickname}` + "`", true)
            .addField("**Новый никнейм:** ", "`" + `${newmember.nickname}` + "`", true)
            mess.send({ embeds: [embed] }); //Отправляем.
        } catch(err) {console.log('ошибка при изменении профиля'); console.error(err)};
      }
      console.log(oldmember.avatar + newmember.avatar);
      console.log(oldmember.user.avatar + newmember.user.avatar);
      if (oldmember.avatar != newmember.avatar) {
        try {
            mess = newmember.guild.channels.cache.find(channel => channel.name == "модерация-лог"); // получение канала    
            
            const embed = new MessageEmbed() //RichEmbed() //Создаём новый эмбед.
            .setAuthor(newmember.user.tag, ava) //Устанавливаем заголовок.
            .setColor(`RED`) //Цвет красный. Можно указать hex.
            .setThumbnail(ava)
            .setDescription('📝Пользователь <@' + newmember.user.id + '> измеил свой профиль!') //Устанавливаем описание.
            .setFooter("ID пользователя: " + newmember.user.id)
            .addField("**Старый аватар:** ", "`" + `${oldmember.avatar}` + "`", true)
            .addField("**Новый аватар:** ", "`" + `${newmember.avatar}` + "`", true)
            mess.send({ embeds: [embed] }); //Отправляем.
        } catch(err) {console.log('ошибка при изменении профиля'); console.error(err)};
      }

    },
};