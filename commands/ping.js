module.exports = {
    name:'ping',
    description: "ping command",
    execute(message,args){
        if(message.member.roles.cache.has('739605473455505448') || message.member.roles.cache.has('772813419299995708'))
        message.channel.send('pong');
    }
}