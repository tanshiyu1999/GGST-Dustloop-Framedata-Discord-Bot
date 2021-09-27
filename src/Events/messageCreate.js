const Event = require("../Structures/Event.js");
const inputParser = require("../Scripts/inputParser.js")

module.exports = new Event("messageCreate", (client, message) => {
  if (message.author.bot) return;

  if (!message.content.startsWith(client.prefix)) return;

  // return 3 arguments, command name, charactername and move name,
  const noPrefixMessage = message.content.substring(client.prefix.length)
  const args = inputParser.inputParser(noPrefixMessage);


  // return the command if it is equal to the first argument
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