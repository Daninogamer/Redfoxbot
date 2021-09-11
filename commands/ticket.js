const config = require('../config.json');

module.exports = {
    name: 'ticket',
    description: 'Apri un ticket per richiedere supporto',
    async execute(client, message,args) {
        //Creazione canale ticket
        const canaleTicket = await message.guild.channels.create(`Ticket ${message.author.tag}`);

        //Spostamento in categoria
        canaleTicket.setParent(config.categorie.ticket);

        //Permessi canale
        canaleTicket.updateOverwrite(message.guild.id, {
            VIEW_CHANNEL: false,
            SEND_MESSAGE: false
        });

        canaleTicket.updateOverwrite(message.author, {
            VIEW_CHANNEL: true,
            SEND_MESSAGE: true 
        });
        
        //Invio messaggio
        const messaggioTicket = await canaleTicket.send('Benvenuto nell\'assistenza Discord!\nUno staffer arriverà presto ad aiutarti! <@&884376614891323412>');

        //Reazioni
        await messaggioTicket.react('🔒');
        await messaggioTicket.react('🗑️');

        //Gestione reazioni
        const filtro = (reaction, user) => {
            return message.guild.members.cache.get(user.id).hasPermission('MANAGE_NICKNAMES');
        }
        
        const collector = messaggioTicket.createReactionCollector(filtro, { dispose: true });

        collector.on('collect', (reaction, user) => {
            if (reaction.emoji.name === '🔒') {
                canaleTicket.updateOverwrite(message.author, {
                    SEND_MESSAGES: false
                });
                return;
            } else if (reaction.emoji.name === '🗑️') {
                canaleTicket.send('Questo canale verrà cancellato tra 3 secondi');
                setTimeout(() => canaleTicket.delete(), 3000);
                return;
            }
        });

        collector.on('remove', (reaction,user) => {
            if (reaction.emoji.name === '🔒') {
                canaleTicket.updateOverwrite(message.author, {
                    SEND_MESSAGES: true
                });
                return;
            }
         });

         //Invio messaggio
         message.channel.send(`Hai creato un ticket! \nTi aiuteremo nel canale ${canaleTicket}`).then(msg => {
             msg.delete({ timeout: 10000 });
             message.delete({ timeout: 10000 });
         })
    }
}