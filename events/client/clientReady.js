const { Events, ActivityType } = require("discord.js");
const { loadCommands } = require("../../handlers/commandHandler");
const chalk = require("chalk");

module.exports = {
  name: Events.ClientReady,
  once: true,
  execute(client) {
    console.info(chalk.green("\nClient Ready!"));
    console.log(`Logged in as ${client.user.tag}`);
    client.user.setActivity(`mit Shaxx`, {
      type: ActivityType.Playing,
    });
    loadCommands(client);
  },
};
