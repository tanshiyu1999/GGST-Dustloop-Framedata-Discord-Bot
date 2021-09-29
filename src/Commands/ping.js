// Ping is the latency between client and discord

const Command = require("../Structures/Command.js")


module.exports = new Command({
  name: "ping",
  description: "Shows the ping of the bot!",
  permission: "SEND_MESSAGES",
  async run(message, args, client) {
    const msg = await message.channel.send(`Ping: ${client.ws.ping} ms.`);

    msg.edit(`Ping: ${client.ws.ping} ms.\nMessage Ping ${msg.createdTimestamp - message.createdTimestamp} ms.`)
  }
})