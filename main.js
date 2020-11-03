const Discord = require('discord.js');

const client = new Discord.Client();

const prefix = '!';

const fs = require('fs');

client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));

for(const file of commandFiles){
    const command = require(`./commands/${file}`)

    client.commands.set(command.name, command);
}

client.once('ready',()=>{
    console.log('raven is online');
})

client.on('message', message =>{
   if(!message.content.startsWith(prefix) || message.author.bot) return;



   const args = message.content.slice(prefix.length).split(/ +/);
   const command = args.shift().toLowerCase();

   if (command === 'ping'){
       client.commands.get('ping').execute(message,args);
   }
   if(command === 'op'){
       client.commands.get('op').execute(message,client.channels.cache.find(channel => channel.name === 'operations'));

   }
});
client.on('messageReactionAdd',(message,user) =>{
    if (!message.me ||user.bot||user.username === message.message.embeds[0].author.name) return;

    const newusers = message.message.embeds[0].fields[2].value + '\n' +user.username;
    let newembed = new Discord.MessageEmbed()
        .setTitle(message.message.embeds[0].title)
        .setAuthor(message.message.embeds[0].author.name,message.message.embeds[0].author.iconURL)
        .addFields(
            { name: 'Date and time', value: message.message.embeds[0].fields[0].value, inline: true }
        )
        .setDescription(message.message.embeds[0].description)
        .addFields(
            { name: 'Assets', value: message.message.embeds[0].fields[1].value },
            { name: 'RSVP', value: newusers }
        )
        .setImage(message.message.embeds[0].image.url)
        .setFooter('Powered by TeamKill');
    message.message.edit(newembed);


});
client.on('messageReactionRemove',(message,user) =>{
    if (!message.me ||user.bot||user.username === message.message.embeds[0].author.name) return;

    const newusers = message.message.embeds[0].fields[2].value.replace(/user.username+'\n'/g,'');
    let newembed = new Discord.MessageEmbed()
        .setTitle(message.message.embeds[0].title)
        .setAuthor(message.message.embeds[0].author.name,message.message.embeds[0].author.iconURL)
        .addFields(
            { name: 'Date and time', value: message.message.embeds[0].fields[0].value, inline: true }
        )
        .setDescription(message.message.embeds[0].description)
        .addFields(
            { name: 'Assets', value: message.message.embeds[0].fields[1].value },
            { name: 'RSVP', value: newusers }
        )
        .setImage(message.message.embeds[0].image.url)
        .setFooter('Powered by TeamKill');
    message.message.edit(newembed);


})




client.login('NzcyNzk3NzE0Mzg3MDQyMzE0.X5_59A.Q8EptPOHFDn9l-622uXg8BVI284');

