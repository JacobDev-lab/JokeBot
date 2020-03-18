/***
* A Discord-Bot Using the discord-jokes package.
*/

const Discord = require('discord.js');
const client = new Discord.Client();
const { Client, MessageEmbed } = require('discord.js');
const config = require('./configs/config.json');
const getMeAJoke = require('discord-jokes');

client.once('ready', () => {
    client.user.setActivity(`Jokes in ${client.guilds.cache.size} guilds with ${client.users.cache.size} users`)
    console.log(`Ready! ${client.user.tag}`);
});

client.on('message', message => {
    if (!message.content.startsWith(config.prefix) || message.author.bot) return;

    const args = message.content.slice(config.prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    if (message.content === `${config.prefix}dadjoke`) {
        getMeAJoke.getRandomDadJoke (function(joke) {
            message.channel.send(joke);
        }); 
    } else if (message.content === `${config.prefix}ping`) {
        let clientping = new Discord.MessageEmbed()
        .setTitle("Client Ping")
        .addField("Client ping", `${client.ws.ping}ms`)
        .setTimestamp()
        .setFooter(`Requested by ${message.author.tag}`)
        message.channel.send(clientping);
    }
});

client.login(config.token);