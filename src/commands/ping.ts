import Command from "@/Command";
import { Message, MessageEmbed } from "discord.js";

export default new Command({
  name: "ping",
  description: "Pong!!!",
  async execute(interaction) {
    const message = (await interaction.reply({
      embeds: [
        new MessageEmbed({
          description: `**Pong!**`,
        }),
      ],
      fetchReply: true,
    })) as Message;

    const ping = message.createdTimestamp - interaction.createdTimestamp!;

    await message.edit({
      embeds: [
        new MessageEmbed({
          description: `**Pong!** \`${ping}ms\``,
        }),
      ],
    });
  },
});
