module.exports = {
    name: 'help',
    description: 'sends all commands',
    execute(message, args, Discord){
        const Embed = new Discord.MessageEmbed()
        .setTitle('Comandi:')
        .setColor('ORANGE')
        .setDescription("Qui sono elencati i comandi per il Red Fox Bot")
        .addFields(
            {name: '=help', value: 'Manda questo elenco'},
            {name: '=ticket', value: 'Apri un ticket se hai bisogno di aiuto'},
            {name: '=ban', value: 'Banna un utente'},
            {name: '=unban', value: 'Sbanna un utente'},
            {name: '=kick', value: 'Espelli un utente'},
            {name: '=serverinfo', value: 'Visualizza le informazioni del server'},
            {name: '=userinfo', value: 'Visualizza le informazione dell utente'},
            {name: '=botinfo', value: 'Visualizza le informazione del bot'},
            {name: '=clear', value: 'Elimina un numero di messaggi'},
            {name: '=twitch', value: 'Link del canale Twich di im_red_fox'},
            {name: '=telegram', value: 'Link del gruppo telegram di im_red_fox'},
            {name: '=instagram', value: 'Link del profilo instagram di im_red_fox'},
            
        )
        .setImage('https://cdn.discordapp.com/attachments/787356318100619275/884118075987853422/Immagine_2021-09-04_144035.png')
        .setFooter('Red Fox Bot by 𝕯𝖆𝖓𝖎#7604 copyright©2021');

        message.channel.send(Embed);
    }
}