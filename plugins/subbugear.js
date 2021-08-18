/* Copyright (C) 2020 subbusubhashini.
*/

const Asena = require('../events');
const config = require('../config');
const Heroku = require('heroku-client');
const heroku = new Heroku({
    token: config.HEROKU.API_KEY
});
let baseURI = '/apps/' + config.HEROKU.APP_NAME;

 var plk_desc = ''
 var BGM_ONE = ''
 var BGM_TWO = ''
 
  if (config.LANG == 'EN') {
    
    plk_desc = 'change reply message BGM mode'
    BGM_ONE = '𝙱𝙶𝙼 𝚜𝚑𝚒𝚏𝚝𝚎𝚍 𝚝𝚘 1𝚜𝚝 𝚖𝚘𝚍𝚎'
    BGM_TWO = '𝙱𝙶𝙼 𝚜𝚑𝚒𝚏𝚝𝚎𝚍 𝚝𝚘 2𝚗𝚍 𝚖𝚘𝚍𝚎'
    }

    if (config.LANG == 'ML') {
      
      plk_desc = 'മറുപടി bgm മോഡ് മാറ്റാൻ'
      BGM_ONE = '𝐁𝐆𝐌 തരം ഒന്നാം മോഡിലേക്ക് മാറ്റി'
      BGM_TWO = '𝐁𝐆𝐌 തരം രണ്ടാം മോഡിലേക്ക് മാറ്റി'
    }

 Asena.addCommand({pattern: 'bgm ?(.*)', fromMe: true, desc: plk_desc, usage: '.bgm one / two' }, (async (message, match) => {
        if (match[1] == 'two') {
                await heroku.patch(baseURI + '/config-vars', { 
                    body: { 
                        ['CHANGE_BGM_TO']: 'two'
                    } 
                });
                await message.sendMessage(BGM_TWO)
        } else if (match[1] == 'one') {
                await heroku.patch(baseURI + '/config-vars', { 
                    body: { 
                        ['CHANGE_BGM_TO']: 'one'
                    } 
                });
                await message.sendMessage(BGM_ONE)
        }
    }));
