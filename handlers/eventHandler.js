const { loadFiles } = require("../functions/fileLoader");
const chalk = require("chalk");

async function loadEvents(client) {
  console.info(chalk.blue("\nStarting loading events..."));
  console.time("Time elapsed loading events");

  client.events = new Map();
  const table = new Array();

  const files = await loadFiles("events");

  for (const file of files) {
    try {
      const event = require(file);
      const execute = (...args) => event.execute(...args, client);
      const target = event.rest ? client.rest : client;

      target[event.once ? "once" : "on"](event.name, execute);
      client.events.set(event.name, execute);

      table.push({ Event: event.name, Status: "✓" });
    } catch (error) {
      table.push({ Event: file.split("/").pop().slice(0, -3), Status: "✗" });
      console.warn(
        chalk.yellow(
          `Could not register the ${file
            .split("/")
            .pop()
            .slice(0, -3)} event: ${error}`
        )
      );
    }
  }
  console.table(table, ["Event", "Status"]);
  console.info(chalk.green("Loaded Events!"));
  console.timeEnd("Time elapsed loading events");
}

module.exports = { loadEvents };
