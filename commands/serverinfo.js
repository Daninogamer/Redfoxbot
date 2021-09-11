const Discord = require('discord.js');

module.exports = {
    name: 'serverinfo',
    description: 'Informazioni sul server.',
    execute(message, args) {

        const membri = message.guild.members.cache;
        const canali = message.guild.channels.cache;
        const ruoli = message.guild.roles.cache;

        const features = message.guild.features.lenght ? message.guild.features.join(', \n') : 'Nessuna features';

        const serverinfo = new Discord.MessageEmbed()
            .setTitle(`Informazioni sul server: ${message.guild.name}`)
            .setDescription(`Proprietario: **${message.guild.owner.user.tag}**`)
            .setColor('RED')
            .setThumbnail(message.guild.iconURL({ dynamic: true }))
            .addField('info', `Regione: ${message.guild.region} \nBoost: ${message.guild.premiumTier}`, true)
            .addField('Sicurezza', `Verifica: ${message.guild.verificationLevel} \nFiltro: ${message.guild.explicitContentFilter}`, true)
            .addField('Features', features, true)
            .addField('Membri', `Totale: ${message.guild.memberCount} \nUmani: ${membri.filter(m => !m.user.bot).size} \nBot:  ${membri.filter(m => m.user.bot).size}`, true)
            .addField('Canali', `Testuali: ${canali.filter(c => c.type === 'text').size} \nVocali: ${canali.filter(c => c.type === 'voice').size}`, true)
            .addField('Ruoli', `Numero: ${ruoli.size}`, true)  
            .setFooter(`ID: ${message.guild.id} - Data creazione`)
            .setTimestamp(new Date(message.guild.createdTimestamp))

            message.channel.send({ embed: serverinfo });
    }
}