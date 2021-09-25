const Event = require("../Structures/Event.js");

module.exports = new Event("messageCreate", (client, message) => {
  if (message.author.bot) return;

  if (!message.content.startsWith(client.prefix)) return;

  // will get removed on later versions
  const args = message.content.substring(client.prefix.length).split(/ +/);

  // return the command if it is equal to the good stuff
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