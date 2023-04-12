const {Configuration, OpenAIApi} = require('openai')


module.exports = async (message, client) => {
    const configuration = new Configuration({
        apiKey: process.env.API_KEY,
    })
    
    
    const openai = new OpenAIApi(configuration);
    
    if(message.author.bot) return;
    if(message.channel.id !== process.env.CHANNEL_ID) return;
    //flag for talking in the chat but not with the bot
    if(message.content.startsWith('!')) return;

    let log = [{role: 'system', content: "You are a friendly chatbot."}];
    try{
        await message.channel.sendTyping();

        let prevMessages = await message.channel.messages.fetch({limit: 10});

        prevMessages.reverse();
        prevMessages.forEach((msg) => {
            if(message.content.startsWith('!')) return;
            if(msg.author.id !== client.user.id && message.author.bot) return;
            //manter conversas com o mesmo user
            if(msg.author.id !== message.author.id) return;

            log.push({
                role: 'user',
                content: msg.content,
            });
        });
        const result = await openai.createChatCompletion({
            model: 'gpt-3.5-turbo',
            messages: log,
            //max_tokens: 256, // limit token usage
        })
        .catch((error) => {
            console.log(`OPENAI ERR: ${error}`);
        });
    message.reply(result.data.choices[0].message);
  } catch (error) {
    console.log(`ERR: ${error}`);
  }
}