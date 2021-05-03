// Global
import "dotenv/config";
import "module-alias/register";

// Events
import * as events from "./events";

// Command related
import Command from "./utils/Command";

// Other
import consola from "consola";
import DisTube from "distube";
import { Client, Collection } from "discord.js";
import { Snipe } from "./typings";

// Environment variables
const { TOKEN } = process.env;

// Register new discord client
const client = new Client({ partials: ["MESSAGE", "CHANNEL", "REACTION"] });

// Client properties for easy acces
client.commands = new Collection<string, Command>();
client.aliases = new Collection<string, string>();
client.snipes = new Collection<string, Snipe>();
client.features = new Collection<string, any>();
client.events = new Collection<string, any>();
client.music = new DisTube(client, { searchSongs: false, emitNewSongOnly: true });
client.logger = consola;

// Ready!
client.on("ready", async () => {
  try {
    events.ready(client);
  } catch (error) {
    client.logger.error(error);
  }
});

// On every message
client.on("message", async (message) => {
  await events.message(client, message);
});

// When a message is deleted
client.on("messageDelete", async (message) => {
  await events.messageDelete(client, message);
});

client.on("messageReactionAdd", async (reaction, user) => {
  await events.messageReactionAdd(client, reaction, user);
});

client.on("messageReactionRemove", async (reaction, user) => {
  await events.messageReactionRemove(client, reaction, user);
});

// Login
client.login(TOKEN);
