const Discord = require('discord.js');
module.exports = {
    name:'op',
    description: "Create Op command",
    execute(message,args){
        if(message.member.roles.cache.has('739605473455505448') || message.member.roles.cache.has('772813419299995708')){
            const opchannel = message.channel;
            const author = message.author;
            let title;
            let description;
            let assets;
            let time;
            let image;

            message.delete();


            author.send('what would you like to be the title of the OP?')
                .then(function () {
                    author.dmChannel.messages.channel.awaitMessages(m => m.author.id == author.id , {
                        max: 1,
                        time: 300000000,
                        errors: ['time'],
                    }).then((collection) => title = collection.first().content)
                        .then(function () {
                            author.send('please provide a description');
                            author.dmChannel.messages.channel.awaitMessages(m => m.author.id == author.id, {
                                max: 1,
                                time: 300000000,
                                errors: ['time'],
                            }).then((collection) => description = collection.first().content)
                                .then(function () {
                                    author.send('any additional assets?');
                                    author.dmChannel.messages.channel.awaitMessages(m => m.author.id == author.id, {
                                        max: 1,
                                        time: 300000000,
                                        errors: ['time'],
                                    }).then((collection) => assets = collection.first().content)
                                        .then(function () {
                                            author.send('at what time will the OP be?');
                                            author.dmChannel.messages.channel.awaitMessages(m => m.author.id == author.id , {
                                                max: 1,
                                                time: 300000000,
                                                errors: ['time'],
                                            }).then((collection) => time = collection.first().content)
                                                .then(function () {
                                                    author.send('would you like to add an image? (you can respond no)');
                                                    author.dmChannel.messages.channel.awaitMessages(m => m.author.id == author.id , {
                                                        max: 1,
                                                        time: 300000000,
                                                        errors: ['time'],
                                                    }).then((collection) => image = collection.first().content)
                                                        .then(function () {
                                                            if (image === 'no'){
                                                                image = 'https://cdn.discordapp.com/attachments/747694086407848018/766629361595711488/Team_Kill_4.png';
                                                            }
                                                            const post = new Discord.MessageEmbed()
                                                                .setTitle(title)
                                                                .setAuthor(author.username,author.displayAvatarURL({dynamic:true}))
                                                                .addFields(
                                                                    { name: 'Date and time', value: time, inline: true }
                                                                )
                                                                .setDescription(description)
                                                                .addFields(
                                                                    { name: 'Assets', value: assets },
                                                                          { name: 'RSVP', value: author.username }
                                                                )
                                                                .setImage(image)
                                                                .setFooter('Powered by TeamKill');
                                                            opchannel.send(post).then(function (post) {
                                                                post.react("👍");
                                                            })
                                                        })
                                            })








                                    })
                            })

                        })

                })



        }else{
            message.channel.send('This command is only available to OP creators, please message teamstaff to be able to do this :)');
        }
    }
}
