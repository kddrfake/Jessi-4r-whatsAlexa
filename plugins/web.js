let WhatsAlexa = require('../events');
let {MessageType} = require('@adiwajshing/baileys');
let TinyURL = require('tinyurl');
let Config = require('../config');
let Language = require('../language');
let Lang = Language.getString('web');
let SLang = Language.getString('webss');

if (Config.WORKTYPE == 'private') {

    WhatsAlexa.addCommand({pattern: 'ping', fromMe: true, deleteCommand: false, desc: Lang.PING_DESC}, (async (message, match) => {
       var start = new Date().getTime();
       var msg = await message.reply('```Ping!```');
       var end = new Date().getTime();

       await msg.delete();
       await message.client.sendMessage(
         message.jid,'*Ping -* ```' + (end - start) + 'ms```\n\n', MessageType.text);
    }));

    WhatsAlexa.addCommand({pattern: 'short ?(.*)', fromMe: true, desc: Lang.URL}, (async (message, match) => {

         if (match[1] === '') return await message.client.sendMessage(message.jid, SLang.LİNK, MessageType.text);

         TinyURL.shorten(`${match[1]}`, async(res, err) => {
           if (err)
             await message.client.sendMessage(message.jid, '*#### Error! ####*\n\n' + '```' + err + '```', MessageType.text);

             await message.client.sendMessage(message.jid,`*Original Link:* ${match[1]}\n*Short Link:* ` + res, MessageType.text)
         });
    }));
}
else if (Config.WORKTYPE == 'public') {
    
    WhatsAlexa.addCommand({pattern: 'ping', fromMe: false, deleteCommand: false, desc: Lang.PING_DESC}, (async (message, match) => {
       var start = new Date().getTime();
       var end = new Date().getTime();

       await message.client.sendMessage(message.jid, '*Speed:* '  + (end - start) +  '*ms*'+ CMD_HELP, MessageType.text, {contextInfo: { forwardingScore: 999, isForwarded: true }, quoted: { key: { fromMe: false, participant: `0@s.whatsapp.net`, ...(message.jid ? { remoteJid: "status@broadcast" } : {}) }, message: { "imageMessage": { "url": "https://mmg.whatsapp.net/d/f/At0x7ZdIvuicfjlf9oWS6A3AR9XPh0P-hZIVPLsI70nM.enc", "mimetype": "image/jpeg", "caption": "© ᴊᴇꜱꜱɪ°:® •ᵇᵒᵗ\nspeed: ...", "fileSha256": "+Ia+Dwib70Y1CWRMAP9QLJKjIJt54fKycOfB2OEZbTU=", "fileLength": "28777", "height": 1080, "width": 1079, "mediaKey": "vXmRR7ZUeDWjXy5iQk17TrowBzuwRya0errAFnXxbGc=", "fileEncSha256": "sR9D2RS5JSifw49HeBADguI23fWDz1aZu4faWG/CyRY=", "directPath": "/v/t62.7118-24/21427642_840952686474581_572788076332761430_n.enc?oh=3f57c1ba2fcab95f2c0bb475d72720ba&oe=602F3D69", "mediaKeyTimestamp": "1610993486", "jpegThumbnail": fs.readFileSync('./src/image/pong.jpg')}}}});
    }));
    
    WhatsAlexa.addCommand({pattern: 'ping', fromMe: false, deleteCommand: false, desc: Lang.PING_DESC}, (async (message, match) => {
       var start = new Date().getTime();
       var msg = await message.reply('```Ping!```');
       var end = new Date().getTime();

       await msg.delete();
       await message.client.sendMessage(
         message.jid,'*Ping -* ```' + (end - start) + 'ms```\n\n', MessageType.text);
    }));

    WhatsAlexa.addCommand({pattern: 'short ?(.*)', fromMe: false, desc: Lang.URL}, (async (message, match) => {

         if (match[1] === '') return await message.client.sendMessage(message.jid, SLang.LİNK, MessageType.text);

         TinyURL.shorten(`${match[1]}`, async(res, err) => {
           if (err)
             await message.client.sendMessage(message.jid, '*#### Error! ####*\n\n' + '```' + err + '```', MessageType.text);

             await message.client.sendMessage(message.jid,`*Original Link:* ${match[1]}\n*Short Link:* ` + res, MessageType.text)
         });
    }));
}
