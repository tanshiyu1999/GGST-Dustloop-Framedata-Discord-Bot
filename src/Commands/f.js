const Command = require("../Structures/Command.js")
const FindFrameData = require("../Scripts/findFrameData.js")
const Discord = require("discord.js")
const Field = require("../Scripts/makeFields.js")
const emoji = ["1️⃣", "2️⃣", "3️⃣", "4️⃣", "5️⃣", "6️⃣", "7️⃣","8️⃣", "9️⃣", "🔟"];
const testEmoji = ['👍', '👎']

module.exports = new Command({
  name: "f",
  description: "Shows the frame data of the bot",
  permission: "SEND_MESSAGES",
  async run(message, args, client) {
    let {name, matchedMoves} = FindFrameData.searchChar(args[1], args[2]); // matchedMoves is an object in an array
    // console.log(matchedMoves)

    if (matchedMoves.length > 1) {
      const confirmMove = new Discord.MessageEmbed();
      const inputFieldValues = Field.makeInputFields(matchedMoves);
      confirmMove
        .setTitle(`Multiple results found!`)
        .setDescription("Please select one of the following: ")
        .addFields(...inputFieldValues);
      let confirmedMessage = await message.channel.send({embeds:[confirmMove]})

      let emojiUsed = [];
      for (let i = 0; i < matchedMoves.length; i++) {
        await confirmedMessage.react(emoji[i]);
        emojiUsed.push(emoji[i]);
      }


      const filter = (reaction, user) => {
        return user.id === message.author.id;
      };

      const collector = confirmedMessage.createReactionCollector({filter: filter, time: 50000});
      collector.on('collect', (reaction, user) => {
        switch(reaction.emoji.name) {
          case "1️⃣":
            matchedMoves = matchedMoves[0];
            confirmedMessage.delete();
            break;
          case "2️⃣":
            matchedMoves = matchedMoves[1];
            confirmedMessage.delete();
            break;
        }
      });

    }

    const output = new Discord.MessageEmbed();
    const fieldValues = Field.makeFields(...matchedMoves);
    output
      .setTitle(`Frame data for ${((matchedMoves.name) ? matchedMoves.name : matchedMoves.input)}`)
      .setURL("https://avatars.githubusercontent.com/u/42184874?v=4")
      .setThumbnail("https://avatars.githubusercontent.com/u/42184874?v=4")
      .setColor("BLURPLE")
      .addFields(...fieldValues)
      .setFooter("Data provided by dustloop", "https://dustloop.com/wiki/images/thumb/3/30/Dustloop_Wiki.png/175px-Dustloop_Wiki.png")
    message.channel.send({embeds:[output]});
  }
})