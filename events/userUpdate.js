const { MessageEmbed } = require('discord.js');
//const { diffdata } = require("../functions.js");

module.exports = {
	name: 'userUpdate',
    execute(oldUser, newUser) {
        console.log('userUpdate');
        console.log(`${newUser.tag} triggered an userUpdate.`);

      

        if (newUser.avatar == null) {
            ava = 'https://cdn.discordapp.com/embed/avatars/0.png'
          } 
          else {
            ava = newUser.displayAvatarURL()
          };

          //console.log(oldUser.avatar + ' - ' + newUser.avatar);
          //console.log(oldmember.user.avatar + newmember.user.avatar);

          if (oldUser.avatar != newUser.avatar) {
            try {

                mess = newUser.client.channels.cache.find(channel => channel.name == "модерация-лог"); // получение канала    
                
                const embed = new MessageEmbed() //RichEmbed() //Создаём новый эмбед.
                .setAuthor(newUser.tag, ava) //Устанавливаем заголовок.
                .setColor(`RED`) //Цвет красный. Можно указать hex.
                .setThumbnail(ava)
                .setDescription('📝Пользователь <@' + newUser.id + '> измеил свой профиль!') //Устанавливаем описание.
                .setFooter("ID пользователя: " + newUser.id)
                .addField("**Аватарка** ", `[[до](${oldUser.displayAvatarURL()})]->[[после](${newUser.displayAvatarURL()})]`)
                .setImage(oldUser.displayAvatarURL())
                //.setImage(newUser.displayAvatarURL())
                //.addField("**Старый аватар:** ", "`" + `${oldUser.avatar}` + "`", true)
                //.addField("**Новый аватар:** ", "`" + `${newUser.avatar}` + "`", true)
                mess.send({ embeds: [embed] }); //Отправляем.
            } catch(err) {console.log('ошибка при изменении профиля'); console.error(err)};
          }
    
        },
    };

