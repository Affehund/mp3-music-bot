const Discord = require('discord.js');
const client = new Discord.Client();
const config = require('./config.json');

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}`);
    console.log('Ready!');
});

client.on('message', async message => {
    if (!message.guild) return;

    if (message.content.substring(0, 1) === config.prefix) {
        let args = message.content.substring(1).split(' ');
        const cmd = args[0];

        args = args.splice(1);
        if (cmd == 'info') {
            let embed = new Discord.MessageEmbed()
                .setColor("0x006400")
                .setTitle("info")
                .addField("prefix", `\`${config.prefix}\``)
                .addField("info", `get this menu`)
                .addField("play", `play ***VICTORY LOSING***`)
                .addField("pause", `pause music`)
                .addField("resume", `resume music`)
                .addField("leave", `leave channel`)
                .addField("quit", `stop music`)
                .setTimestamp();
            message.channel.send(embed);
        } else if (cmd == 'play') {
            if (message.member.voice.channel) {
                message.member.voice.channel.join().then(r => {
                    r.play('./file.mp3');
                }).catch(e => {
                    console.log(e)
                })
                message.channel.send("now playing ***VICTORY LOSING***!");
            }
            else {
                message.reply('join a voice channel!');
            }
        } else if (cmd == "pause") {
            if (message.member.voice.channel && message.guild.voice.connection && message.member.voice.channel === message.guild.voice.connection.channel) {
                if (message.guild.voice.connection.dispatcher) {
                    message.guild.voice.connection.dispatcher.pause();
                    message.channel.send("paused.");
                }
            } else {
                message.reply('join a voice channel!');
            }
        } else if (cmd == "stop" || cmd == "quit") {
            if (message.member.voice.channel && message.guild.voice.connection && message.member.voice.channel === message.guild.voice.connection.channel) {
                if (message.guild.voice.connection.dispatcher) {
                    message.guild.voice.connection.dispatcher.end();
                    message.member.voice.channel.leave();
                    message.channel.send("stopped.");
                }
            } else {
                message.reply('join a voice channel!');
            }
        } else if (cmd == "resume") {
            if (message.member.voice.channel && message.guild.voice.connection && message.member.voice.channel === message.guild.voice.connection.channel) {
                if (message.guild.voice.connection.dispatcher) {
                    message.guild.voice.connection.dispatcher.resume();
                    message.channel.send("resuming.");
                }
            } else {
                message.reply('join a voice channel!');
            }
        } else if (cmd == "leave") {
            if (message.member.voice.channel && message.guild.voice.connection && message.member.voice.channel === message.guild.voice.connection.channel) {
                message.guild.voice.channel.leave();
                message.channel.send("leaving.");
            } else {
                message.reply('join a voice channel!');
            }
        }
    }
});

client.login(config.token)
