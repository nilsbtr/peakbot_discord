const { loadFiles } = require("../functions/fileLoader");
const chalk = require("chalk");

async function loadCommands(client) {
  console.info(chalk.blue("\nStating loading commands..."));
  console.time("Time elapsed loading commands");

  await client.commands.clear();
  await client.subCommands.clear();

  let commandsArray = [];
  const table = new Array();

  const Files = await loadFiles("commands");

  Files.forEach((file) => {
    const command = require(file);

    if (command.subCommand) {
      return client.subCommands.set(command.subCommand, command);
    }

    client.commands.set(command.data.name, command);

    commandsArray.push(command.data.toJSON());

    table.push({ Command: command.data.name, Status: "✓" });
  });

  console.debug(chalk.grey("Resetting client commands..."));
  await client.application.commands.set([]);
  console.debug(chalk.grey("Pushing updated client commands..."));
  await client.application.commands.set(commandsArray);

  console.table(table, ["Command", "Status"]);
  console.info(chalk.green("Loaded Commands!"));
  console.timeEnd("Time elapsed loading commands");
}

module.exports = { loadCommands };
