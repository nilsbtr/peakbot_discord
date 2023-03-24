// prettier-ignore
const { Client, GatewayIntentBits, Partials, Collection } = require("discord.js");
const { Guilds, GuildMembers, GuildMessages } = GatewayIntentBits;
const { User, Message, GuildMember, ThreadMember } = Partials;
require("dotenv").config();

const client = new Client({
  intents: [Guilds, GuildMembers, GuildMessages],
  partials: [User, Message, GuildMember, ThreadMember],
});

const { loadEvents } = require("./handlers/eventHandler");

client.events = new Collection();
client.commands = new Collection();

const { connect } = require("mongoose");
connect(process.env.DB_URL, {}).then(() =>
  console.log("The client is now connected to the database.")
);

loadEvents(client);

client.login(process.env.TOKEN);
