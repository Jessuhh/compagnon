import { Client, Message } from "discord.js";
import { CHANNELS } from "../utils/constants";

const { PREFIX } = process.env;

export default async (client: Client, message: Message) => {
  if (message.channel.id == CHANNELS.POLLS) {
    if (!message.content.startsWith(`${PREFIX}poll`) && !message.author.bot) {
      await message.delete();
    }
    //  const messages = await message.channel.messages.fetch({ limit: 1 });
    //  const lastPoll = messages.array()[0];
    //  let title: string;
    //  if (lastPoll.embeds.length > 1) {
    //    title = lastPoll.embeds[1].title!;
    //  }
    //  title = lastPoll.embeds[0].title!;
    //  if (title) {
    //    const id = title.toUpperCase()?.substr(0, 1) + Math.floor(Math.random() * 10);
    //    console.log(id);
    //  }
  }
};