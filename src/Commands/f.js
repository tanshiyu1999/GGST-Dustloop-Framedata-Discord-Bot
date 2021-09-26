const Command = require("../Structures/Command.js")
const findFrameData = require("../Scripts/findFrameData.js")
const Discord = require("discord.js")


module.exports = new Command({
  name: "f",
  description: "Shows the frame data of the bot",
  permission: "SEND_MESSAGES",
  async run(message, args, client) {

    let {name, matchedMoves} = findFrameData.searchChar(args[1], args[2]);
    const output = new Discord.MessageEmbed();

    output
      .setTitle("It works kekw")
      .setURL("https://avatars.githubusercontent.com/u/42184874?v=4")
      .setThumbnail("https://avatars.githubusercontent.com/u/42184874?v=4")
      .setColor("BLURPLE")
      .addFields({
        name: "Move name",
        value: "Frame data",
        inline: true
      }, {
        name: "Move name",
        value: "frame data",
        inline: true
      }, {
        name: "Move name",
        value: "frame data",
        inline: true
      }, {
        name: "Move name",
        value: "frame data",
        inline: true
      }, {
        name: "Move name",
        value: "frame data",
        inline: true
      }, {
        name: "Move name",
        value: "frame data",
        inline: true
      }, {
        name: "Move name",
        value: "frame data",
        inline: true
      }, {
        name: "Move name",
        value: "frame data",
        inline: true
      })
      .setFooter("Data provided by dustloop", "https://dustloop.com/wiki/images/thumb/3/30/Dustloop_Wiki.png/175px-Dustloop_Wiki.png")

    
    message.channel.send({embeds:[output]});
  }
})