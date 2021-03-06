const Discord = require("discord.js");
const fs = require("fs");
module.exports.run = async (bot, message, args) => {
  let warns = JSON.parse(fs.readFileSync("./warnings.json", "utf8"));
    let memberr = message.mentions.members.first();
    const use = message.mentions.users.first();
    
    if (message.content.match(message.author.id))
        return message.reply("**Aww, come on. Don't do this to yourself**");
        
    if (message.author.bot) return;

    let user = message.mentions.users.first();
    if (!message.member.hasPermission("KICK_MEMBERS")) {
        const argembed = new Discord.RichEmbed()
            .setAuthor(message.author.tag, message.author.avatarURL)
            .setDescription(`Missing \`KICK_MEMBERS\` permission\n\nUser doesn't have permission to kick.`)
            .setColor('ff0000')
        return message.channel.send(argembed)
    }
    let warnUser = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0])
    if (!warnUser) {
        const argembedd = new Discord.RichEmbed()
            .setAuthor(message.author.tag, message.author.avatarURL)
            .setDescription(`Missing \`[user]\` argument\n\nCorrect usage:\n\`unwarn | [user] | [optional reason]\` `)
            .setColor('ff0000')
        return message.channel.send(argembedd)
    }

    if (!message.guild.member(bot.user).hasPermission("KICK_MEMBERS")) {
        const akickembed = new Discord.RichEmbed()
            .setAuthor(message.author.tag, message.author.avatarURL)
            .setColor('ff0000')
            .addField(`Missing \`KICK_MEMBERS\` permission`, `Bot doesn't have permission to kick.`)
        return message.channel.send(akickembed)
    }
    if (user.bot === true)
        return message.channel.send("**Bots can't be unwarned, silly**")
    let reason = args.join(" ").slice(22);

    if (!warns[warnUser.id]) warns[warnUser.id] = {
        warns: 0
    };

    warns[warnUser.id].warns--;

    fs.writeFile("./warnings.json", JSON.stringify(warns), (err) => {
        if (err) console.log(err)
    });

    message.channel.send(`**${user.tag}** has been unwarned.`).catch(console.error)
}
module.exports.help = {
    name: "unwarn"
}
