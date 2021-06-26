require('dotenv').config()
const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require('fs');

const broadcast = client.voice.createBroadcast();

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', async msg => {
  if (msg.content === 'ping') {
    msg.reply('pong');
    if (msg.member.voice.channel) {
      const connection = await msg.member.voice.channel.join();
      const dispatcher = connection.play('fireflies.mp3');
      dispatcher.on('start', () => {
        console.log('fireflies.mp3 is now playing!');
        msg.reply('fireflies.mp3 is now playing!')
      });

      dispatcher.on('finish', () => {
        console.log('fireflies.mp3 has finished playing!');
        msg.reply('fireflies.mp3 has finished playing!')
      });

      // Always remember to handle errors appropriately!
      dispatcher.on('error', function(error) {
        console.error(error)
        msg.reply(`ERROR: ${error}`)
      });
    }
  }
});

client.login(process.env.DISCORD_TOKEN);