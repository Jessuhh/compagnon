import Command from "../../utils/Command";
import { embed } from "../../utils/helpers";

export default new Command({
  name: "pause",
  description: "Pauses the current track",
  execute(client, message, args) {
    if (!message.member?.voice.channel) throw new Error("NotInVoice");
    client.music.pause(message);
    return message.channel.send(embed({ title: "Music paused/resumed" }, message));
  },
});