const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'guildMemberAdd',
    execute(member) {
        console.log('guildMemberAdd');
        console.log(`${member.user.tag} triggered an guildMemberAdd.`);
        console.log('User @' + member.user.tag + ' connect to server!');
        
        try {
            var role = member.guild.roles.cache.find(role => role.name == "incoming") // the rolle is incoming
            member.roles.add(role); // assign rolle
            mess = member.guild.channels.cache.find(channel => channel.name == "входящий-incoming"); // the channel is incoming 
            
        } catch {console.log('on server not rolle "incoming"'); console.error(err)}
        
        if (member.user.avatar == null) { //Avatar check
            ava = 'https://cdn.discordapp.com/embed/avatars/0.png';
          } 
          else {
            ava = member.user.displayAvatarURL()
          };
         
        try {
            mess_log = member.guild.channels.cache.find(channel => channel.name == "log"); //the channel is log
                       
            const embed = new MessageEmbed() //Create new Embed
                .setAuthor(member.user.tag, ava) //Set Autor
                .setColor(`GREEN`) //Set color Embed
                .setDescription('📥User <@' + member.user.id + '> connect to server!') //Set description
                .addField('Acount create: ', member.user.createdAt.toLocaleString()) //When create acount
                .addField("Joined: ", member.joinedAt.toLocaleString()) //When join to server
                .setThumbnail(ava) //avatar of user
                .setFooter("ID User: " + member.user.id); //Set sign
            
            mess_log.send({ embeds: [embed] }); //writting to channel.
            mess.send('<@'+member.user.id + '> Спасибо что подключились к серверу. Прочитайте пожалуйста этот канал с начала.')
            // <@'+member.user.id + '> Thank you for joining the server. Please read this channel from the beginning.
                    
        } catch(err) {console.log('error in registration'); console.error(err)}

    },
};