const Discord = require('discord.js')
const config = require('../config.json');

module.exports = {
    name: 'unban',
    description: 'sbanna un utente',
 execute(client, message, args, Discord) {
 const author = message.member;
 const target = args[0]
 const motivo = args.slice(1).join(' ');

 if(!author.hasPermission('BAN_MEMBERS')) {
    return message.reply('**non hai il permesso di usare questo comando!**').then(msg => msg.delete({ timeout: 10000 }));
}

 if (!target) {
     return message.reply('**devi specificare un utente da Sbannare!**').then(msg => msg.delete({ timeout: 10000 }));
 }

 if (motivo.length === 0) {
     return message.reply('**devi specificare il motivo dello Sban!**').then(msg => msg.delete({ timeout: 10000 }));
 }
 const unbanEmbed = new Discord.MessageEmbed()
 .setAuthor('Unban', author.user.displayAvatarURL())
 .setDescription(`**Moderatore:** ${author.user.tag} (${author.id}) \n**Utente:** ${target}) \n**Motivo:** ${motivo}`)
 .setFooter('🦊 Im_Red_Fox Twitch')
 .setTimestamp()
 .setColor('GREEN')

    message.guild.members.unban(target).then(() => {
 

        message.channel.send(`L'utente **${target}** è stato **Sbannato** da **${author.user.tag}** per **${motivo}**.`)

        message.client.channels.cache.get(config.canali.Ban_log).send({ embed: unbanEmbed });

    }).catch(() => {
       return message.reply('Questo utente non è **Bannato!**');
    })


    }
}