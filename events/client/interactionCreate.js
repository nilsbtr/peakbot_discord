const { Client, Events, ChatInputCommandInteraction } = require("discord.js");
require("dotenv").config();

module.exports = {
	name: Events.InteractionCreate,
	/**
	 * @param {ChatInputCommandInteraction} interaction
	 * @param {Client} client
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

		const subCommand = interaction.options.getSubcommand(false);
		if (subCommand) {
			const subCommandFile = client.subCommands.get(
				`${interaction.commandName}.${subCommand}`
			);
			if (!subCommandFile)
				return interaction.reply({
					content: "This subcommand is outdated.",
					ephemeral: true,
				});
			subCommandFile.execute(interaction, client);
		} else command.execute(interaction, client);
	},
};
