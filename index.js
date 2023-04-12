require('dotenv/config')

//get some stuff from discord.js
const {CLient, IntentsBitField, Client} = require('discord.js');
const {CommandHandler} = require('djs-commander');
const path = require('path');

//create the bot
const bot = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
    ]
});


new CommandHandler({
    client: bot,
    commandsPath: path.join(__dirname, 'commands'),
    eventsPath: path.join(__dirname, 'events'),
});


bot.login(process.env.TOKEN);