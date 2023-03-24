const { Events, ActivityType } = require("discord.js");
const { loadCommands } = require("../handlers/commandHandler");

module.exports = {
  name: Events.ClientReady,
  once: true,
  execute(client) {
    console.info("\n\x1b[36m%s\x1b[0m", "Client Ready!");
    console.log(`Logged in as ${client.user.tag}`);
    client.user.setActivity(`mit Shaxx`, {
      type: ActivityType.Playing,
    });
    loadCommands(client);
  },
};
