// prettier-ignore
const { Client, GatewayIntentBits, Partials, Collection } = require("discord.js");
const { Guilds, GuildMembers, GuildMessages } = GatewayIntentBits;
const { User, Message, GuildMember, ThreadMember } = Partials;
require("dotenv").config();
const chalk = require("chalk");

const client = new Client({
  intents: [Guilds, GuildMembers, GuildMessages],
  partials: [User, Message, GuildMember, ThreadMember],
});

const { loadEvents } = require("./handlers/eventHandler");

client.events = new Collection();
client.commands = new Collection();
client.subCommands = new Collection();

const { connect } = require("mongoose");
connect(process.env.DB_URL, {}).then(() =>
  console.info(chalk.green("\nThe client is now connected to the database."))
);

loadEvents(client);

client.login(process.env.TOKEN);
