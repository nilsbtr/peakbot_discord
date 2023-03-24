const { Events, ChatInputCommandInteraction } = require("discord.js");
require("dotenv").config();

module.exports = {
  name: Events.InteractionCreate,
  /**
   * @param {ChatInputCommandInteraction} interaction
   */
  execute(interaction, client) {
    if (!interaction.isChatInputCommand()) return;

    const command = client.commands.get(interaction.commandName);

    if (!command) {
      return interaction.reply({
        content: "This command is outdated.",
        ephemeral: true,
      });
    }

    if (command.developer && interaction.user.id !== process.env.DEV_USER_ID) {
      return interaction.reply({
        content: "This command is dev only.",
        ephemeral: true,
      });
    }

    command.execute(interaction, client);
  },
};
