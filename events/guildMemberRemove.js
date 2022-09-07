const { MessageEmbed } = require('discord.js');
//const { diffdata } = require("../functions.js");

module.exports = {
	name: 'guildMemberRemove',
    async execute(member) {
        console.log('guildMemberRemove');
        console.log(`${member.user.tag} triggered an guildMemberRemove.`);
        console.log('Пользователь @' + member.user.tag + ' покинул сервер!');

        const fetchedLogs = await member.guild.fetchAuditLogs({
          limit: 1,
          type: 'MEMBER_KICK',
        })


          // Since there's only 1 audit log entry in this collection, grab the first one
          const kickLog = fetchedLogs.entries.first();

          console.log(kickLog);
          // Perform a coherence check to make sure that there's *something*
          if (!kickLog) return console.log(`${member.user.tag} left the guild, most likely of their own will.`);
                
          // Now grab the user object of the person who kicked the member
          // Also grab the target of this action to double-check things
          const { executor, target } = kickLog;

          // Update the output with a bit more information
          // Also run a check to make sure that the log returned was for the same kicked member
          
          if (member.user.avatar == null) {
            ava = 'https://cdn.discordapp.com/embed/avatars/0.png'
          } 
          else {
            ava = member.user.displayAvatarURL()
          };
  
          console.log(member.deleted);

          if (member.deleted) {console.log('Был удален принудительно')};
          
          
          if (target.id === member.id) {
            console.log(`${member.user.tag} left the guild; kicked by ${executor.tag}?`);

            try {
              mess = member.guild.channels.cache.find(channel => channel.name == "модерация-лог"); // получение канала    
              
              const embed = new MessageEmbed() //RichEmbed() //Создаём новый эмбед.
              .setAuthor(member.user.tag, ava) //Устанавливаем заголовок.
              .setColor(`RED`) //Цвет красный. Можно указать hex.
              .setThumbnail(ava)
              .setDescription('📤Пользователь <@' + member.user.id + '> покинул сервер!') //Устанавливаем описание.
              .addField('Пользователь был удален принудительно: ', `${executor.tag} (ID:${executor.id}) \n По причине: ${kickLog.reason}`) //
              .setFooter("ID пользователя: " + member.user.id)
              mess.send({ embeds: [embed] }); //Отправляем.
              } catch(err) {console.log('ошибка при покидании сервера'); console.error(err)}

          } else {
            console.log(`${member.user.tag} left the guild, audit log fetch was inconclusive.`);

              try {
              mess = member.guild.channels.cache.find(channel => channel.name == "модерация-лог"); // получение канала    
              
              const embed = new MessageEmbed() //RichEmbed() //Создаём новый эмбед.
              .setAuthor(member.user.tag, ava) //Устанавливаем заголовок.
              .setColor(`RED`) //Цвет красный. Можно указать hex.
              .setThumbnail(ava)
              .setDescription('📤Пользователь <@' + member.user.id + '> покинул сервер!') //Устанавливаем описание.
              //.addField('Пользователь был удален принудительно: ', executor.tag) //Когда создан аккаунт
              .setFooter("ID пользователя: " + member.user.id)
              mess.send({ embeds: [embed] }); //Отправляем.
              } catch(err) {console.log('ошибка при покидании сервера'); console.error(err)}

            }



    },
};