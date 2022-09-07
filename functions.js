const fs = require('fs');



const diffdata = (beg, endd) => {
    //let diff = endd - beg;
    //console.log(beg);console.log(endd);
    let years = endd.getFullYear() - beg.getFullYear();
    let mounths = endd.getMonth() - beg.getMonth();
    let days = endd.getDate() - beg.getDate();
    let hours = endd.getHours() - beg.getHours();
    let minutes = endd.getMinutes() - beg.getMinutes();
    let seconds = endd.getSeconds() - beg.getSeconds();
    let milliseconds = endd.getMilliseconds() - beg.getMilliseconds();
    let seconds_t = '';
    let minutes_t = '';
    let hours_t = '';
    let days_t = '';
    let mounths_t = '';
    let years_t = '';
    //console.log(years + mounths + days + hours + minutes + seconds + milliseconds);
    if (milliseconds < 0) {seconds--; milliseconds = 1000 + milliseconds} 
    if (seconds < 0) {minutes--; seconds = 60 + seconds}
    if (minutes < 0) {hours--; minutes = 60 + minutes}
    if (hours < 0) {days--; hours = 24 + hours}
    if (days < 0) {
        mounths--; 
        //console.log(beg.getMonth()); // получение месяца от 0 до 11
        switch (beg.getMonth()+1) {
            case 1 :
            case 3 :   
            case 5 :
            case 7 :
            case 8 :
            case 10 :
            case 12 :  
                days = 31 + days; // проверка на месяц (31)
            break;
  
            case 4 :
            case 6 :
            case 9 : 
            case 11 :   
                days = 30 + days; // проверка на месяц (30)
            break;
  
            default :
                days = 28 + days; // требуется проверка на високосный год (28 или 29)
        }
    }
    if (mounths < 0) {years--; mounths = 12 + mounths} //получение месяца от 0 до 11
  
    /* варианты обображения:
    "5 лет и 1 месяц назад"
    "2 (3,4) года назад" (месяцы = 0)
    "1 год и 10 месяцев назад"
    "2 (3,4) месяца назад" (дни = 0)
    "5 месяцев и 1 день назад"
    "2 (3,4) дня назад"
    "5 дней назад"
    "1 час и 1 минуту назад "
    "2 (3,4) часа и 2 (3,4) минуты назад"
    "5 часов и 5 минут назад"
    */
  
    switch (seconds) { // текст для минут
        case 0 :
            seconds_t = '';
        break;
        
        case 1 :
        case 21 :
        case 31 :
        case 41 :
        case 51 :
            seconds_t = seconds + ' секунду';
        break;
  
        case 2:
        case 22:
        case 23:
        case 24: 
        case 3:
        case 32:
        case 33:
        case 34: 
        case 4:
        case 42:
        case 43:
        case 44:
        case 52:
        case 53:
        case 54:  
            seconds_t = seconds + ' секунды';
        break;
  
        default :
            seconds_t = seconds + ' секунд';
    }
  
    switch (minutes) { // текст для минут
        case 0 :
            minutes_t = '';
        break;
        
        case 1 :
        case 21 :
        case 31 :
        case 41 :
        case 51 :
            minutes_t = minutes + ' минуту';
        break;
  
        case 2:
        case 22:
        case 23:
        case 24: 
        case 3:
        case 32:
        case 33:
        case 34: 
        case 4:
        case 42:
        case 43:
        case 44:
        case 52:
        case 53:
        case 54:                         
            minutes_t = minutes + ' минуты';
        break;
  
        default :
            minutes_t = minutes + ' минут';
    }
  
    switch (hours) { // текст для часов
        case 0 :
            hours_t = '';
        break;
        
        case 1 :
        case 21 :
            hours_t = hours + ' час';
        break;
  
        case 2:
        case 22:
        case 23:
        case 3:
        case 4:
            hours_t = hours + ' часа';
        break;
  
        default :
            hours_t = hours + ' часов';
    }
  
    switch (days) { // текст для дней
        case 0 :
            days_t = '';
        break;
        
        case 1 :
        case 21 :
        case 31 :
            days_t = days + ' день';
        break;
  
        case 2:
        case 22:
        case 23:
        case 24:            
        case 3:
        case 4:
            days_t = days + ' дня';
        break;
  
        default :
            days_t = days + ' дней';
    }
  
    switch (mounths) { // текст для месяцев
        case 0 :
            mounths_t = '';
        break;
        
        case 1 :
            mounths_t = mounths + ' месяц';
        break;
  
        case 2:
        case 3:
        case 4:
            mounths_t = mounths + ' месяца';
        break;
  
        default :
            mounths_t = mounths + ' месяцев';
    }
  
    switch (years) { // текст для лет
        case 0 :
            years_t = '';
        break;
        
        case 1 :
            years_t = years + ' год';
        break;
  
        case 2:
        case 3:
        case 4:
            years_t = years + ' года';
        break;
  
        default :
            years_t = years + ' лет';
    }
  
    //console.log(years_t + mounths_t + days_t + hours_t + minutes_t);
  
    if (years_t != '') { // года
        if (mounths_t != '') {// есть месяцы
            text = years_t + ' и ' + mounths_t;
            return text + ' назад';
        } else { // нет месяцев
            text = years_t;
            return text + ' назад';
        }
    } else { // нет года
        if (mounths_t != '') {// есть месяцы
            if (days_t != '') { // есть дни
                text = mounths_t + ' и ' + days_t;
                return text + ' назад';
            } else { // нет дней
                text = mounths_t;
                return text + ' назад';
            }
        } else { // нет месяцев
            if (days_t != '') { // есть дни
                if (hours_t != '') { // есть часы
                    text = days_t + ' и ' + hours_t;
                    return text + ' назад';                   
                } else { // нет часов
                    text = days_t;
                    return text + ' назад';    
                }               
            } else { // нет дней
                if (hours_t != '') { // есть часы
                    if (minutes_t != '') { // есть минуты
                        text = hours_t + ' и ' + minutes_t;
                        return text + ' назад'; 
                    } else { // нет минут
                        text = hours_t;
                        return text + ' назад';                         
                    }                    
                } else { // нет часов
                    if (minutes_t != '') { // есть минуты
                        text = minutes_t;
                        return text + ' назад'; 
                    } else { // нет минут
                        text = seconds_t;
                        return text + ' назад'; 
                    }
                }
            }
        }
    }
    //return text + ' назад';
};
module.exports.diffdata = diffdata;

  //s =new Date('2021-11-24T05:06:22.210Z');
  //n = new Date();

  //d = diffdata(s,n);
  //console.log(d);

const timedata = (td) => {

    let tn = new Date()
    let years = tn.getFullYear() - td.getFullYear();
    let mounths = tn.getMonth()- td.getMonth();
    let days = tn.getDate()- td.getDate();
    let hours = td.getHours();
    let minutes = td.getMinutes();

    let days_t = '';
    let mounths_t = '';
    let years_t = '';
    let minutes_t = '';
    let hours_t = '';

    //console.log(years, mounths, days, hours, minutes)

    if (days < 0) {
        mounths--; 
        //console.log(beg.getMonth()); // получение месяца от 0 до 11
        switch (td.getMonth()+1) {
            case 1 :
            case 3 :   
            case 5 :
            case 7 :
            case 8 :
            case 10 :
            case 12 :  
                days = 31 + days; // проверка на месяц (31)
            break;
  
            case 4 :
            case 6 :
            case 9 : 
            case 11 :   
                days = 30 + days; // проверка на месяц (30)
            break;
  
            default :
                days = 28 + days; // требуется проверка на високосный год (28 или 29)
        }
    }
    if (mounths < 0) {years--; mounths = 12 + mounths} //получение месяца от 0 до 11

    switch (minutes) { // текст для минут
        case 0 :
            minutes_t = '';
        break;
        
        case 1 :
        case 2 :
        case 3 :
        case 4 :
        case 5 :
        case 6 :
        case 7:
        case 8 :
        case 9 :
            minutes_t = '0' + minutes;
        break;
         
        default :
            minutes_t = minutes;
    }
  
    switch (hours) { // текст для часов
        case 0 :
            hours_t = '';
        break;
        
        case 1 :
        case 2 :
        case 3 :
        case 4 :
        case 5 :
        case 6 :
        case 7 :
        case 8 :
        case 9 :
            hours_t = '0' + hours;
        break;
  
        default :
            hours_t = hours;
    }
  
    switch (days) { // текст для дней
        case 0 :
            days_t = '';
        break;
        
        case 1 :
        case 21 :
        case 31 :
            days_t = days + ' день';
        break;
  
        case 2:
        case 22:
        case 23:
        case 24:            
        case 3:
        case 4:
            days_t = days + ' дня';
        break;
  
        default :
            days_t = days + ' дней';
    }
  
    switch (mounths) { // текст для месяцев
        case 0 :
            mounths_t = '';
        break;
        
        case 1 :
            mounths_t = mounths + ' месяц';
        break;
  
        case 2:
        case 3:
        case 4:
            mounths_t = mounths + ' месяца';
        break;
  
        default :
            mounths_t = mounths + ' месяцев';
    }
  
    switch (years) { // текст для лет
        case 0 :
            years_t = '';
        break;
        
        case 1 :
            years_t = years + ' год';
        break;
  
        case 2:
        case 3:
        case 4:
            years_t = years + ' года';
        break;
  
        default :
            years_t = years + ' лет';
    }

    var text = '';
    //console.log(text);

    if (years_t != '') { // года
        if (mounths_t != '') {// есть месяцы
            text = years_t + ' и ' + mounths_t;

            return text + ' назад' + ' в ' + hours_t + ':' + minutes_t;
        } else { // нет месяцев
            text = years_t;

            return text + ' назад' + ' в ' + hours_t + ':' + minutes_t;
        }
    } else { // нет года
        if (mounths_t != '') {// есть месяцы
            if (days_t != '') { // есть дни
                text = mounths_t + ' и ' + days_t;
                
                return text + ' назад' + ' в ' + hours_t + ':' + minutes_t;
            } else { // нет дней
                text = mounths_t;
                
                return text + ' назад' + ' в ' + hours_t + ':' + minutes_t;
            }
        } else { // нет месяцев
            if (days_t != '') { // есть дни
                if (days > 2) { // дней больше 2
                    text = days_t;
                    
                    return text + ' назад' + ' в ' + hours_t + ':' + minutes_t;                   
                } else { // дней меньше 2
                    if (days == 2) { // если позавчера
                        text = 'Позавчера';
                        
                        return text + ' в ' + hours_t + ':' + minutes_t;  
                    }  else { // если вчера
                        if (days == 1) { // если вчера
                            text = 'Вчера';
                            
                            return text + ' в ' + hours_t + ':' + minutes_t; 
                        } else { // если сегодня
                            text = 'Сегодня';
                            //console.log(text);
                            return text + ' в ' + hours_t + ':' + minutes_t;
                        }
                    }
                }
            } else { // если нет дней
                text = 'Сегодня';
                //console.log(text);
                return text + ' в ' + hours_t + ':' + minutes_t;
            }
        }
    }
    //return text + `в ${hours}:${minutes}`;
    //console.log(text);
};
module.exports.timedata = timedata;
  
  //s1 =new Date('2020-11-04T15:26:22.210Z');
  //t = timedata(s1);
  //console.log(t);

const zanadd = (path, zanatie) => {
  data = fs.readFileSync(path);
  dat = JSON.parse(data); // строка в объект |.slice(1) - вырезает объект из массива;
  //console.log(dat);
  len = dat.length;
  //console.log(len);
  date = JSON.stringify(dat).slice(0,-1);
  //console.log(date);
  zan = JSON.stringify(zanatie); // объект в строку
  //console.log(zan);
  //zan.slice(1, -1);
  dat = `${date}${len !== 0 ? ",\n" : ""}${zan}]`;
  //console.log(dat);
  fs.writeFileSync(path, dat.replaceAll(",", ",\n"));
  //fs.appendFileSync('test.json', dat);
  //console.log(fr);
}
module.exports.zanadd = zanadd;

const zanread = (path) => {
    data1 = fs.readFileSync(path);
    dat1 = JSON.parse(data1); // строка в объект
    //console.log(dat1);
    return dat1;
}
module.exports.zanread = zanread;

const zanremove = (path, ID) =>{
    data1 = fs.readFileSync(path);
    dat1 = JSON.parse(data1);
    if (dat1.length < ID) return;
    delete dat1[ID];
    console.log(dat1);
    zan = JSON.stringify(dat1);
    fs.writeFileSync(path, zan.replaceAll(",", ",\n"));
}
module.exports.zanremove = zanremove;

const zanrewrite = (path, ID, zanat) =>{
    data1 = fs.readFileSync(path);
    dat1 = JSON.parse(data1);
    if (dat1.length < ID) return;
    dat1[ID] = zanat;
    //console.log(dat1);
    zan = JSON.stringify(dat1);
    fs.writeFileSync(path, zan.replaceAll(",", ",\n"));
}
module.exports.zanrewrite = zanrewrite;

const zanatie = (id, status, avtor, channel_id, tema, spisok, opozd, spisok_z, time_start, time_end) => {
    return {
      id,  // номер команды
      status, // статус занятия
      avtor, //автор команды
      channel_id, // в каком канале
      tema, // тема занятия
      spisok, // список полного посещения
      opozd, // список опоздавших и не полного посещения
      spisok_z, // список закрытия посещения
      time_start, // время открытия занятия
      time_end // время закрытия занятия
    }
}
module.exports.zanatie = zanatie;
  
    const { zanyatie } = require('./variables.json');

  let id = 12;
  let status = 'close';
  let avtor = '';
  let channel = null;
  let tema = '';
  let spisok =[];
  let opozd = [];
  let spisok_z = [];

  //console.log(zanatie(id, status, avtor, channel, tema, spisok, opozd, spisok_z));
  
 // zanwrite('test.json', zanatie);

  //vse_zan = zanread('test.json');

  //console.log(vse_zan);

  //zanremove('test.json', 10);

  //zanrewrite('test.json',3,zanyatie)

  function role(mess,args) { // присвоение роли

    console.log(args);
    var role = mess.guild.roles.cache.find(role => role.name === args[1]);
    console.log(role);
    var user = mess.member;
    user.roles.add(role);
  
  };

  function kons(mees,args) { // консультация
    //console.log(mees.member._roles);
    var rarr = mees.member._roles;
    var role_teacher = mees.guild.roles.cache.find(role => role.name === 'Преподаватель');
    if (rarr.includes(role_teacher.id)) { // Преподаватель
      var role = mees.guild.roles.cache.find(role => role.name === "Консультация"); // опроеделение роли для консультации
      var chan_k = mees.guild.channels.cache.find(chan_k => chan_k.name === "консультация"); // определение канала консультации
      var user_k = mees.mentions.members.first(); // определение консультируещегося
      var user_p = mees.member; // определение консультанта    
      if (user_p.nickname == null) {user_p_name=user_p.user.username} else {user_p_name=user_p.nickname};
      if (user_k.nickname == null) {user_k_name=user_k.user.username} else {user_k_name=user_k.nickname};
      switch (args[args.length-2]) {
        case 'вкл' :
          user_k.roles.add(role);
          mees.delete().catch();
          mees.channel.send('<@' + user_k +'> Вас приглашает на консультацию **' + user_p_name + '** в канал <#' + chan_k + '>');
          chan_k.send('Начало консультации для <@' + user_k + '>');
          name_chan = mees.channel.name; // присвоение имени канала приглашения
          chan = mees.guild.channels.cache.find(chan => chan.name === name_chan); // определение канала приглашения
          break;
        case 'выкл' :
          user_k.roles.remove(role);
          mees.delete().catch();
          mees.channel.send('Консультация окончена для **' + user_k_name + '**');
          chan.send('<@' + user_k +'> Ваша консультация окончена. Спасибо.');
          break;
        default :
          mees.channel.send('Вы ввели не правильно команду')
      }
    } else {
      mees.delete().catch();
      mees.channel.send('Вы не являетесь преподавателем чтобы использовать эту команду')
      //mees.delete().catch();
    }
  };


  var comms_list = [{
    name: "роль",
    out: role,
    about: "Для назначения роли"
  },
  {
    name: "консультация",
    out: kons,
    about: "Назначение роли на консульрацию"
  }
]

module.exports.comms = comms_list;