const { TeamMember } = require("discord.js");

var ID = ('860765799413186571');

module.exports = {
    name: 'staff',
    description: 'this command ping the whole staff! be careful!',
    execute(message, args){
        
        if(!message.member.roles.cache.has("860765799413186571")) return message.channel.send("Non usare questo comando se non hai i permessi! (Staff)");

        message.channel.send("<@&" + ID + '>, siete richiesti da un membro dello staff! venite in vocale, grazie!');

    }
}
