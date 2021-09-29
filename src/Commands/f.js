const Command = require("../Structures/Command.js")
const FindFrameData = require("../Scripts/findFrameData.js")
const Discord = require("discord.js")
const Field = require("../Scripts/makeFields.js")
const emoji = ["0️⃣", "1️⃣", "2️⃣", "3️⃣", "4️⃣", "5️⃣", "6️⃣", "7️⃣","8️⃣", "9️⃣", "🔟"];
const OutputDiscord = require("../Scripts/outputDiscord.js")


module.exports = new Command({
  name: "f",
  description: "Shows the frame data of the bot",
  permission: "SEND_MESSAGES",
  async run(message, args, client) {
    let {charName, matchedMoves} = FindFrameData.searchChar(args[1], args[2]); // matchedMoves is an object in an array;

    // name will contain in a object format, charName, charPortrait, charLink
    let name = charName//.replace(".json", "")
    

    if (!matchedMoves) {
      const output = new Discord.MessageEmbed();
      output
        .setTitle(`${name} cannot be found`)
        .setDescription('Please ensure that you have entered the command correctly \n !f (Name) (Move)')
        .setThumbnail('attachment://thinkingMay.png')
        .setColor("RED")
      message.channel.send({
        embeds:[output],
        files: ['./src/Images/thinkingMay.png']
      });
    } else if (matchedMoves.length > 10) {
      const output = new Discord.MessageEmbed();
      output
        .setTitle(`${args[2]} has too many matches`)
        .setDescription('May not smug enough to handle this load')
        .setThumbnail('attachment://thinkingMay.png')
        .setColor("RED")
      message.channel.send({
        embeds:[output],
        files: ['./src/Images/thinkingMay.png']
      });
    } else if (matchedMoves.length > 1) {
      const confirmMove = new Discord.MessageEmbed();
      const inputFieldValues = Field.makeInputFields(matchedMoves);
      confirmMove
        .setTitle(`Multiple results found!`)
        .setDescription("Please select one of the following: ")
        .setColor("BLUE")
        .addFields(...inputFieldValues);
      let confirmedMessage = await message.channel.send({embeds:[confirmMove]})

      let emojiUsed = [];
      for (let i = 0; i < matchedMoves.length; i++) {
        await confirmedMessage.react(emoji[i+1]);
        emojiUsed.push(emoji[i+1]);
      }

      let notDeleted = true;
      const filter = (reaction, user) => {
        return user.id === message.author.id;
      };
      const collector = confirmedMessage.createReactionCollector({filter: filter, time: 10000});
      collector.on('collect', (reaction, user) => {
        switch(reaction.emoji.name) {
          case "1️⃣":
            notDeleted = false;
            OutputDiscord.outputDiscord(matchedMoves[0], message, name)
            confirmedMessage.delete();
            break;
          case "2️⃣":
            notDeleted = false;
            OutputDiscord.outputDiscord(matchedMoves[1], message, name)
            confirmedMessage.delete();
            break; 
          case "3️⃣":
            notDeleted = false;
            OutputDiscord.outputDiscord(matchedMoves[2], message, name)
            confirmedMessage.delete();
            break;
          case "4️⃣":
            notDeleted = false;
            OutputDiscord.outputDiscord(matchedMoves[3], message, name)
            confirmedMessage.delete();
            break;
          case "5️⃣":
            notDeleted = false;
            OutputDiscord.outputDiscord(matchedMoves[4], message, name)
            confirmedMessage.delete();
            break;
          case "6️⃣":
            notDeleted = false;
            OutputDiscord.outputDiscord(matchedMoves[5], message, name)
            confirmedMessage.delete();
            break;
          case "7️⃣":
            notDeleted = false;
            OutputDiscord.outputDiscord(matchedMoves[6], message, name)
            confirmedMessage.delete();
            break;
          case "8️⃣":
            notDeleted = false;
            OutputDiscord.outputDiscord(matchedMoves[7], message, name)
            confirmedMessage.delete();
            break;
          case "9️⃣":
            notDeleted = false;
            OutputDiscord.outputDiscord(matchedMoves[8], message, name)
            confirmedMessage.delete();
            break;
          case "🔟":
            notDeleted = false;
            OutputDiscord.outputDiscord(matchedMoves[9], message, name)
            confirmedMessage.delete();
            break;
        }
      });
      collector.on('end', (reaction, user) => {
        if (notDeleted) {
          confirmedMessage.delete();
        }
      }) 
    } else if (matchedMoves.length == 1) {
      OutputDiscord.outputDiscord(matchedMoves, message, name)
    } else if (matchedMoves.length == 0) {
      const output = new Discord.MessageEmbed();
      output
        .setTitle(`${args[2]} cannot be found.`)
        .setDescription('Please ensure that you have entered the command correctly \n !f (Name) (Move)')
        .setThumbnail('attachment://thinkingMay.png')
        .setColor("RED")
      message.channel.send({
        embeds:[output],
        files: ['./src/Images/thinkingMay.png']
      });
    } 
  }
})





// // This outputs the embeded message
// const output = new Discord.MessageEmbed();
// const fieldValues = Field.makeFields(...matchedMoves);
// output
//   .setTitle(`Frame data for ${((matchedMoves.name) ? matchedMoves.name : matchedMoves.input)}`)
//   .setURL("https://avatars.githubusercontent.com/u/42184874?v=4")
//   .setThumbnail("https://avatars.githubusercontent.com/u/42184874?v=4")
//   .setColor("BLURPLE")
//   .addFields(...fieldValues)
//   .setFooter("Data provided by dustloop", "https://dustloop.com/wiki/images/thumb/3/30/Dustloop_Wiki.png/175px-Dustloop_Wiki.png")
// message.channel.send({embeds:[output]});
