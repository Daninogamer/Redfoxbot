const Discord = require('discord.js');
const config = require('../config.json');


module.exports = {
    name: 'kick',
    description: 'Espelli un utente',
     execute(message, args) {
 const author = message.member;
 const target = message.mentions.members.first();
 const motivo = args.slice(1).join(' ');

 if(!author.hasPermission('KICK_MEMBERS')) {
    return message.reply('**non hai il permesso di usare questo comando!**').then(msg => msg.delete({ timeout: 10000 }));
}

 if (target === author) {
     return message.reply('**Non puoi Espellere te stesso**').then(msg => msg.delete({ timeout: 10000 }));
 }

 if (!target) {
     return message.reply('**Devi specificare un utente da Espellere**').then(msg => msg.delete({ timeout: 10000 }));
 }

 if (motivo.length === 0) {
     return message.reply('**Devi specificare il motivo dell\' Espulsione**').then(msg => msg.delete({ timeout: 10000 }));
 }

 if (!message.guild.members.cache.get(target.id).kickable) {
     return message.reply('**Non puoi Espellere questo utente**').then(msg => msg.delete({ timeout: 10000 }));
 }
            const kickEmbed = new Discord.MessageEmbed()
            .setAuthor('kick', author.user.displayAvatarURL())
            .setDescription(`**Moderatore:** ${author.user.tag} (${author.id}) \n**Utente:** ${target.user.tag} (${target.id}) \n**Motivo:** ${motivo}`)
            .setFooter('🦊 Im_Red_Fox Twitch')
            .setTimestamp()
            .setColor('RED')


 target.kick(motivo)

 message.channel.send(`L'utente **${target.user.tag}** è stato Espulso da **${author.user.tag}** per **${motivo}**.`)

 message.client.channels.cache.get(config.canali.Kick_log).send({ embed: kickEmbed });

    }
}