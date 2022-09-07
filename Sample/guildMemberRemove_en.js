const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'guildMemberRemove',
    async execute(member) {
        console.log('guildMemberRemove');
        console.log(`${member.user.tag} triggered an guildMemberRemove.`);
        console.log('User @' + member.user.tag + ' left server!');

        const fetchedLogs = await member.guild.fetchAuditLogs({ //log variable
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
          
          if (member.user.avatar == null) { //Avatar check
            ava = 'https://cdn.discordapp.com/embed/avatars/0.png'
          } 
          else {
            ava = member.user.displayAvatarURL()
          };
  
          if (member.deleted) {console.log('Was forcibly removed')}; // forced deletion check
          
          if (target.id === member.id) { // forced deletion
            console.log(`${member.user.tag} left the guild; kicked by ${executor.tag}?`); //who removed

            try {
              mess = member.guild.channels.cache.find(channel => channel.name == "log"); //the channel is log   
              
              const embed = new MessageEmbed() //Create new Embed
                .setAuthor(member.user.tag, ava) //Set Autor
                .setColor(`RED`) //Set color Embed
                .setThumbnail(ava) //avatar of user
                .setDescription('📤User <@' + member.user.id + '> left server!') //Set description
                .addField('The user was forcibly deleted: ', `${executor.tag} (ID:${executor.id}) \n Because of: ${kickLog.reason}`) //
                .setFooter("ID User: " + member.user.id) //Set sign

              mess.send({ embeds: [embed] }); //Send.
              } catch(err) {console.log('error when leaving the server - forced'); console.error(err)}

          } else {
            console.log(`${member.user.tag} left the guild, audit log fetch was inconclusive.`);

              try {
              mess = member.guild.channels.cache.find(channel => channel.name == "log"); //the channel is log   
              
              const embed = new MessageEmbed() //Create new Embed
              .setAuthor(member.user.tag, ava) //Set Autor
              .setColor(`RED`) //Set color Embed
              .setThumbnail(ava) //avatar of user
              .setDescription('📤User <@' + member.user.id + '> left server!') //Set description
              .setFooter("ID User: " + member.user.id) //Set sign

              mess.send({ embeds: [embed] }); //Send.
              } catch(err) {console.log('error when leaving the server'); console.error(err)}

            }
    },
};