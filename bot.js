/***
* A Discord-Bot Using the discord-jokes package.
*/

const Discord = require('discord.js');
const client = new Discord.Client();
const { Client, MessageEmbed } = require('discord.js');
const config = require('./Configs/config.json');
const getMeAJoke = require('discord-jokes');
require('dotenv').config();

// Ready Event
client.once('ready', () => {
    client.user.setActivity(`Jokes in ${client.guilds.cache.size} guilds with ${client.users.cache.size} users`)
    console.log(`Ready! ${client.user.tag}`);
});

// Events
client.on('guildCreate', guild => {
    console.log(`New Guild Joined: ${guild.name} with id: ${guild.id}. This Guild has ${guild.memberCount} members!`)
});
client.on('guildDelete', guild => {
    console.log(`Removed from ${guild.name} (id: ${guild.id})`);
});

// Message Event.
client.on('message', message => {
    if (!message.content.startsWith(config.prefix) || message.author.bot) return;

    const args = message.content.slice(config.prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    if (message.content === `${config.prefix}joke`) {
        getMeAJoke.getRandomDadJoke (function(joke) {
            message.channel.send(joke);
        }); 
    } else if (message.content === `${config.prefix}cnjoke`) {
        getMeAJoke.getRandomCNJoke (function(cnjoke) {
            message.channel.send(cnjoke);
        });
    } else if (message.content === `${config.prefix}jackiechan`) {
        const fn = "Jackie";
        const ln = "Chan";

        getMeAJoke.getCustomJoke (fn, ln, function(jcjoke){
            message.channel.send(jcjoke)
        });
    } else if (message.content === `${config.prefix}ping`) {
        let clientping = new Discord.MessageEmbed()
        .setTitle("PONG 🏓")
        .addField("Latency", `${client.ws.ping}ms`)
        .setTimestamp()
        .setFooter(`Requested by ${message.author.tag}`)
        message.channel.send(clientping);
    } else if (message.content === `${config.prefix}invite`) {
        let botinvite = new Discord.MessageEmbed()
        .addField("Bot Invite Link", '[click here to invite](https://discordapp.com/api/oauth2/authorize?client_id=689553107411009567&permissions=8&scope=bot)')
        .setTimestamp()
        .setFooter(`Requested By ${message.author.tag}`, message.author.displayAvatarURL())
        message.channel.send(botinvite);
    } else if (message.content === `${config.prefix}help`) {
        let help0 = new Discord.MessageEmbed()
        .setTitle("Help!")
        .setDescription("A discord bot that will entertain your server with cool and awesome jokes. The Bot contains two categories A simple jokes and Chuck Norris Jokes. In addition we have added Jackie chan Jokes command.")
        .addField("Need Additional Help?", "[Joing our Help Server](https://discord.gg/Me5wfTw)")
        .setTimestamp()
        .setFooter(`${message.author.tag}`, message.author.displayAvatarURL())
        message.channel.send(help0);
    } else if (message.content === `${config.prefix}commands`) {
        let thumb = client.user.displayAvatarURL();
        let commands1 = new Discord.MessageEmbed()
        .setTitle("Commands List")
        .setThumbnail(thumb)
        .addField("**🤣 Fun 🤣**", "j.joke\nj.cnjoke (Chuck Norris)\nj.Jackie Chan", true)
        .addField("**😊 Basic 😊**", "ping\nhelp\ninvite")
        .setTimestamp()
        .setFooter(`${message.author.tag}`, message.author.displayAvatarURL())
        message.channel.send(commands1);
    }
});

client.login(process.env.BOT_TOKEN);
