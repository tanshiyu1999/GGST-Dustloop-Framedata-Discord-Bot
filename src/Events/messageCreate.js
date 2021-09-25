const Event = require("../Structures/Event.js");

module.exports = new Event("messageCreate", (client, message) => {
  if (message.author.bot) return;

  if (!message.content.startsWith(client.prefix)) return;

  console.log(client.prefix.length)

  // will get removed on later versions
  const args = message.content.substring(client.prefix.length).split(/ +/);

  const command = client.commands.find(cmd => {
    if(cmd.name == args[0]) {
      return cmd;
    };
  })

  if (!command){
    console.log(command);
    return message.reply(`${args[0]} is not a valid command!`)
  }
  command.run(message, args, client);

})