const Discord = require('discord.js');
const config = require('./config.json')
const client = new Discord.Client()


client.login(process.env.token);


client.on("message", (message) => {

})

const prefix = config.prefix;

client.commands = new Discord.Collection();

const fs = require('fs');
const command = require('nodemon/lib/config/command');

client.once('ready', () => {
    console.log("im_Red_Fox Official è online!");
})


const status = [
    `| =help |`,
    `il server`,
    `| =ticket |`,
];
    
    let index = 0;
    setInterval(() => {
        if(index === status.length) index = 0;
        const status2 = status[index];
        
        client.user.setActivity(status2, { type: "WATCHING" }).catch(console.error)
        index++;
    }, 7500)

    const snipes = new Discord.Collection()
    // Member Count
    client.on("guildMemberAdd", member => {
        var canale = client.channels.cache.get("885286791886819388")
        canale.setName("👥Tutti insieme: " + member.guild.memberCount) //Impostare il nome del canale
    });
    client.on("guildMemberRemove", member => {
        var canale = client.channels.cache.get("885286791886819388")
        canale.setName("👥Tutti insieme: " + member.guild.memberCount) //Impostare il nome del canale
    });


    //Messaggio eliminato
    client.on('messageDelete', message => {
        snipes.set(message.channel.id, message)

        const LogChannel = client.channels.cache.get('884726534928203796')
        const DeletedLog = new Discord.MessageEmbed()
        .setTitle("**Messaggio cancellato**")
        .addField('**Eliminato da**',  `${message.author} - (${message.author.id})`)
        .addField("**In**", message.channel)
        .addField('**Contenuto del messaggio**', message.content)
        .setColor('PURPLE')
        .setThumbnail(message.author.displayAvatarURL({dynamic: true}))
        LogChannel.send(DeletedLog)
    })
    //messaggio modificato
    client.on('messageUpdate', async(oldMessage, newMessage) => {
        const LogChannel = client.channels.cache.get('884726534928203796')
        const EditedLog = new Discord.MessageEmbed()
        .setTitle("**Messaggio modificato**")
        .addField('**Modificato da**',  `${oldMessage.author} - (${oldMessage.author.id})`)
        .addField("**In**", oldMessage.channel)
        .addField('**Vecchio messaggio**', oldMessage.content)
        .addField('**Nuovo messaggio**', newMessage.content)
        .setColor('PURPLE')
        .setThumbnail(oldMessage.author.displayAvatarURL({dynamic: true}))
        await LogChannel.send(EditedLog)
    })


    
        //clear
        client.on("message", message => {
    if (message.content.startsWith("=clear")) {

        if (!message.member.hasPermission("MANAGE_MESSAGES")) {
            message.channel.send('non hai il permesso di eseguire questo comando!');
            return;
        }
        if (!message.guild.me.hasPermission("MANAGE_MESSAGES")) {
            message.channel.send('non ho il permesso di eseguire questo comando');
            return;
        }

        var count = message.content.slice(7);
        count = parseInt(count);

        if (!count) {
            message.channel.send("inserisci un numero valido!")
            return
        }

        message.channel.bulkDelete(count, true)
        message.channel.send("**Ho eliminato " + count + " messaggi**").then(msg => {
            msg.delete({ timeout: 5000 })
        })

    }
})



client.on('message', message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    if (!client.commands.has(commandName)) return;

    const command = client.commands.get(commandName);
    
})

    client.on('guildMemberAdd', member => {
        //Autoruolo
    const ruolo = member.guild.roles.cache.find(r => r.name === '🦊 Iscritto');
    member.roles.add(ruolo);

    const ruolo1 = member.guild.roles.cache.find(r => r.name === '▬▬▬▬▬▬ Ruoli ▬▬▬▬▬▬');
    member.roles.add(ruolo1);

    const ruolo2 = member.guild.roles.cache.find(r => r.name === '▬▬▬▬ Onorificenze ▬▬▬▬');
    member.roles.add(ruolo2);
})

const commandFiles = fs.readdirSync('./commands/').filter(File => File.endsWith('.js'));
for(const file of commandFiles){
    const command = require(`./commands/${file}`);

    client.commands.set(command.name, command);
}

client.on('message', message => {
    if(!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    if(command === 'online'){
       client.commands.get('online').execute(message, args);
    } else if(command == 'staff'){
        client.commands.get('staff').execute(message, args);
    } else if(command == 'ban'){
        client.commands.get('ban').execute(message, args);
    } else if(command == 'unban'){
        client.commands.get('unban').execute(client, message, args, Discord);
    } else if(command == 'kick'){
        client.commands.get('kick').execute(message, args);
    } else if(command == 'help'){
        client.commands.get('help').execute(message, args, Discord)
    }
    else if(command == 'serverinfo'){
        client.commands.get('serverinfo').execute(message, args);
    }
    else if(command == 'userinfo'){
        client.commands.get('userinfo').execute(message, args);
    }
    else if(command == 'botinfo'){
        client.commands.get('botinfo').execute(client, message, args);
    }
    else if(command == 'ticket'){
        client.commands.get('ticket').execute(client, message, args);
    }
    else if(command == 'twitch'){
        client.commands.get('twitch').execute(client, message, args);
    }
    else if(command == 'telegram'){
        client.commands.get('telegram').execute(client, message, args);
    }
    else if(command == 'instagram'){
        client.commands.get('instagram').execute(client, message, args);
    }
});    
