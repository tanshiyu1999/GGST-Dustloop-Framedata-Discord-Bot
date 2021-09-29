// update.js variables: export {update, tempFrameTransf, saveData, ITEM_URL};
const update = require("../Scripts/updateLocalData.js");
const Discord = require("discord.js");

const Command = require("../Structures/Command.js")

module.exports = new Command({
  name: "updateSmugMay",
  description: "Update the local database",
  permission: "SEND_MESSAGES",
  async run(message, args, client) {

    const loading = new Discord.MessageEmbed();

    loading
      .setTitle("Downloading frame data from dustloop...")
      .setURL("https://dustloop.com/wiki/index.php?title=GGST/Frame_Data")
      .setColor("YELLOW")

    const loadingMsg = await message.channel.send({embeds: [loading]})

    await update.updateLocalData();

    loadingMsg.delete();
  
    const loaded = new Discord.MessageEmbed();
    loaded
      .setTitle("Frame data database has been updated")
      .setURL("https://dustloop.com/wiki/index.php?title=GGST/Frame_Data")
      .setDescription("Data is scraped from [dustloop](https://dustloop.com/wiki/index.php?title=Guilty_Gear_-Strive-).")
      .setColor("GREEN")

    message.channel.send({embeds: [loaded]})
  }
})