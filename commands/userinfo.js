const Discord = require('discord.js');
const moment = require('moment');

module.exports = {
    name: 'userinfo',
    description: 'Informazioni su un utente.',
    execute(message, args) {
        const flags = {
            DISCORD_EMPLOYEE: 'Dipendente Discord',
            DISCORD_PARTNER: 'Partner Discord',
            BUGHUNTER_LEVEL_1: 'Bug Hunter (lvl 1)',
            BUGHUNTER_LEVEL_2: 'Bug Hunter (lvl 2)',
            HYPERSQUAD_EVENTS: 'Eventi Hypersquad',
            HOUSE_BRAVERY: 'Hypesquad of Bravery',
            HOUSE_BRILLIANCE: 'Hypesquad of Brillance',
            HOUSE_BALANCE: 'Hypesquad of Balance',
            EARLY_SUPPORTER: 'Primo Sostenitore',
            TEAM_USER: 'Utente del Team',
            SYSTEM: 'Sistema',
            VERIFIED_BOT: 'Bot Verificato',
            VERIFIED_DEVELOPER: 'Sviluppatore Verificato'
        };

        const member = message.mentions.members.last() || message.member;

        const ruoli = Array.from(member.roles.cache.map(r => r.toString()));
        
        const badge = Array.from(member.user.flags).map(f => flags[f]);

        const embed = new Discord.MessageEmbed()
            .setTitle(`informazioni sull'utente: ${member.user.username}`)
            .setDescription(`Stato: ${member.user.presence.status} (${member.user.presence.game || 'Non Sta giocando'})`, true)  
            .setColor('RANDOM')
            .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
            .addField('Informazioni', `Nome: ${member.user.username} \nTag: ${member.user.discriminator}`)
            .addField('Date', `Account creato: ${moment(member.user.createdTimestamp).format('DD/MM/YYYY')} \nIngresso Server: ${moment(member.joinedAt).format('DD/MM/YYYY')}`, true)
            .addField('Ruoli', `${ruoli.length ? ruoli.join(', ') : 'Nessun ruolo'}`, true)
            .addField('badge',`${badge.length ? badge.join(', ') : 'Nessun badge'}`, true)
            .setFooter(`ID: ${member.id}`)

        message.channel.send({ embed: embed });
        }
    }