const {SlashCommandBuilder} = require('discord.js')


module.exports = {
    data: new SlashCommandBuilder().setName('ping').setDescription("Replies"),
    run: ({interaction}) => {
        interaction.reply('Pong!');
    },
}


