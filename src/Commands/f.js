const Command = require("../Structures/Command.js")
const FindFrameData = require("../Scripts/findFrameData.js")
const Discord = require("discord.js")
const Field = require("../Scripts/makeFields.js")


module.exports = new Command({
  name: "f",
  description: "Shows the frame data of the bot",
  permission: "SEND_MESSAGES",
  async run(message, args, client) {
    console.log("The arguments: " + args);
    let {name, matchedMoves} = FindFrameData.searchChar(args[1], args[2]);
    const output = new Discord.MessageEmbed();

    const fieldValues = Field.makeFields(matchedMoves);

    const test = [{ name: 'input', value: '5P', inline: true },   
    { name: 'damage', value: '28', inline: true },  
    { name: 'guard', value: 'All', inline: true },  
    { name: 'startup', value: '4', inline: true },  
    { name: 'active', value: '5', inline: true },   
    { name: 'recovery', value: '9', inline: true }, 
    { name: 'onBlock', value: '-2', inline: true }, 
    { name: 'onHit', value: '+1', inline: true },   
    { name: 'riscGain', value: '10', inline: true },
    { name: 'level', value: '1', inline: true },    
    { name: 'counter', value: 'Small', inline: true },
    { name: 'invuln', value: 'nil', inline: true },
    { name: 'prorate', value: '80%', inline: true }]
    
    output
      .setTitle(`Frame data for ${((matchedMoves.name) ? matchedMoves.name : matchedMoves.input)}`)
      .setURL("https://avatars.githubusercontent.com/u/42184874?v=4")
      .setThumbnail("https://avatars.githubusercontent.com/u/42184874?v=4")
      .setColor("BLURPLE")
      // Generate the addfields input in a separate function. 
      // Empty strings "" should be converted to " ".
      .addFields(...fieldValues)
      .setFooter("Data provided by dustloop", "https://dustloop.com/wiki/images/thumb/3/30/Dustloop_Wiki.png/175px-Dustloop_Wiki.png")

    
    message.channel.send({embeds:[output]});
  }
})