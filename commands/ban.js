const Discord = require('discord.js');
const config = require('../config.json');

module.exports = {
    name: 'ban',
    description: 'Banna un utente dal server',
    execute(message, args) {
    const author = message.member;
    const target = message.mentions.members.first();
    const motivo = args.slice(1).join(' ');

    if(!author.hasPermission('BAN_MEMBERS')) {
        return message.reply('**non hai il permesso di usare questo comando!**').then(msg => msg.delete({ timeout: 10000 }));
    }
        if (target === author) {
            return message.reply('**non puoi bannare te stesso!**').then(msg => msg.delete({ timeout: 10000}));
        }

        if (!target) {
            return message.reply('**devi specificare un utente da bannare!**').then(msg => msg.delete({ timeout: 10000}));
        }

        if (motivo.lenght === 0) {
            return message.reply('**devi specificare un motivo per bannare!**').then(msg => msg.delete({ timeout: 10000}));
        }

        if (!message.guild.members.cache.get(target.id).bannable) {
            return message.reply('**non puoi bannare questo utente!**')
        }

        const banEmbed = new Discord.MessageEmbed()
            .setAuthor('Ban', author.user.displayAvatarURL())
            .setDescription(`**Moderatore:** ${author.user.tag} (${author.id}) \n**Utente:** ${target.user.tag} (${target.id}) \n**Motivo:** ${motivo}`)
            .setFooter('🦊 Im_Red_Fox Twitch')
            .setTimestamp()
            .setColor('RED')

        target.ban({ reason: motivo })

        message.channel.send(`L\'utente **${target.user.tag}** è stato bannato da **${author.user.tag}** per **${motivo}**`)

        message.client.channels.cache.get(config.canali.Ban_log).send({ embed: banEmbed });
    }
}