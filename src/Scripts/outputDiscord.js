const Command = require("../Structures/Command.js")
const FindFrameData = require("./findFrameData.js")
const Discord = require("discord.js")
const Field = require("./makeFields.js")

const outputDiscord = (matchedMoves, message, name) => {
  const output = new Discord.MessageEmbed();

  let singleMatch;

  if (Array.isArray(matchedMoves)) {
    singleMatch = matchedMoves[0];
  } else {
    singleMatch = matchedMoves;
  }
  const fieldValues = Field.makeFields(singleMatch);
  output
    .setAuthor(
      name,
      message.author.avatarURL({dynamic: true}),
      "https://ferotiq.dev/"
    )
    .setTitle(`Frame data for ${((singleMatch.name) ? singleMatch.name : singleMatch.input)}`)
    .setURL("https://avatars.githubusercontent.com/u/42184874?v=4")
    .setThumbnail("https://avatars.githubusercontent.com/u/42184874?v=4")
    .setColor("BLURPLE")
    .addFields(...fieldValues)
    .setFooter("Data provided by dustloop", "https://dustloop.com/wiki/images/thumb/3/30/Dustloop_Wiki.png/175px-Dustloop_Wiki.png")
  message.reply({embeds:[output]});
}

module.exports = {outputDiscord};