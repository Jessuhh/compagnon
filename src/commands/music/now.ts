import { MessageEmbed } from "discord.js";
import Command from "../../utils/Command";
import { embed, status } from "../../utils/helpers";

export default new Command({
  name: "now",
  description: "Shows the current playing song",
  aliases: ["np", "nowplaying"],
  execute(client, message) {
    if (!message.member?.voice.channel) throw new Error("NotInVoice");
    const queue = client.music.getQueue(message);
    const song = queue.songs[0];
    if (song && queue)
      return message.channel.send(
        new MessageEmbed({
          title: "Music",
          color: "#ffc600",
          fields: [
            {
              name: "Playing",
              value: `\`${song.name}\` - \`${song.formattedDuration}\``,
            },
            {
              name: "Requested by",
              value: song.user,
            },
            {
              name: "Status",
              value: status(queue),
            },
          ],
        })
      );
  },
});
