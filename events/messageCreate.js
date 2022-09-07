const { prefix } = require('../config.json');
const { zanatie, zanadd, zanread, zanremove, zanrewrite, comms } = require("../functions.js");


module.exports = {
	name: 'messageCreate',
    execute(message) {

        console.log('message');
        //console.log(message);
        console.log(`${message.author.username} in #${message.channel.name} triggered an messageCreate.`);
        
        if (message.author.username != message.client.user.username && message.author.discriminator != message.client.user.discriminator && !message.author.bot) {
            
            try {
              vse_zanatia = zanread('test.json');
              user_a_name = message.author.username;
              //console.log(message.channel);
              vse_zanatia.forEach((item, index, array) => {
                //console.log(item.channel);
                if (item.channel_id == message.channel.id) { // проверка канала (два канала где открыты занятия быть не может)
                  id_zan = index;
                  //console.log(id_zan);
                  switch (vse_zanatia[id_zan].status) {
      
                    case 'open' :
                      if (message.content == '1') {
                        message.react("👍");
                        if ((user_a_name !== "Бот МК9") && (!vse_zanatia[id_zan].spisok.includes(user_a_name))) {
                          vse_zanatia[id_zan].spisok.push(user_a_name);
                          zanrewrite('test.json',id_zan,vse_zanatia[id_zan])
                        }
                      };  
                    break;
      
                    case 'start' :
                      //id_zan = msg.content.split(" ")[2];
                      //console.log(id_zan);
                      if (message.content == '0') {
                        message.react("👌");  
                        if ((user_a_name !== "Бот МК9") && (!vse_zanatia[id_zan].spisok.includes(user_a_name)) && (!vse_zanatia[id_zan].opozd.includes(user_a_name))) {
                          vse_zanatia[id_zan].opozd.push(user_a_name);  
                          zanrewrite('test.json',id_zan,vse_zanatia[id_zan])
                        }
                      }      
                    break;  
      
                    case 'finish' :
                      //id_zan = msg.content.split(" ")[2];
                      //console.log(id_zan);
                      if (message.content == '9') {
                        message.react("👍");
                        if ((user_a_name !== "Бот МК9") && (!vse_zanatia[id_zan].spisok_z.includes(user_a_name))) {
                          vse_zanatia[id_zan].spisok_z.push(user_a_name);
                          zanrewrite('test.json',id_zan,vse_zanatia[id_zan])
                        }
                      }
                    break;  
      
                    case 'close' :
                      //id_zan = msg.content.split(" ")[2];
                      console.log('занятие под номером:' + id_zan + ' завершено');
                      /*comms.zanyatie_[id_zan].spisok = ['нет']; //навсякий случай пустой элемент
                      comms.zanyatie_[id_zan].opozd = ['нет']; //навсякий случай пустой элемент   
                      comms.zanyatie_[id_zan].spisok_z = ['нет']; */
                    break;  
      
                    default :  
                      console.log('обход списков');
                  } 
                } // если канал не найдет
              }); // перебор занятий закончен
            } catch {console.log('занятия не открыты')}


            var comm = message.content.trim() + " ";
            var comm_name = comm.slice(0, comm.indexOf(" ")).toLowerCase();
            var messArr = comm.split(" ");
            console.log(`${comm_name} - ${messArr}`);

            for (comm_count in comms) { // перебор комманд
              var comm2 = prefix + comms[comm_count].name;
              if (comm2 == comm_name) {
                comms[comm_count].out(message, messArr);
              }
            }    

        }
    },
};
