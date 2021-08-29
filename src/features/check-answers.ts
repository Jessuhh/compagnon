import { Brain } from "../entity/Brain";
import { CHANNELS, EVENTS, GUILD_ID, SCOREBOARD_MESSAGE_ID } from "@/lib/contants";
import { Client, MessageReaction, PartialUser, TextChannel, User } from "discord.js";
import { scoreboard } from "../lib/helpers";

export default async (client: Client, reaction: MessageReaction, user: User | PartialUser, event: EVENTS) => {
    if (reaction.message.partial) await reaction.message.fetch();
    if (reaction.partial) await reaction.fetch();
    if (user.bot || reaction.message.channel.type != "DM") return;

    const member = client.guilds.cache.get(GUILD_ID)!.members.cache.get(user.id);

    const score = await Brain.findOne({ where: { user: member?.toString() } });

    if (reaction.emoji.name == "✅") {
        if (event == EVENTS.REACTION_ADD) {
            if (!score) {
                const newIQ = new Brain({ user: member?.toString() });
                await newIQ.save();
            } else {
                const newScore = new Brain({ score: score.score + 1 });
                await Brain.update({ user: member?.toString() }, newScore);
            }
        } else {
            const newScore = new Brain({ score: score!.score - 1 });
            await Brain.update({ user: member?.toString() }, newScore);
        }

        // Update the scoreboard
        const channel = (await client.guilds.cache
            .get(GUILD_ID)
            ?.channels.cache.get(CHANNELS.REGELS_EN_LEADERBOARD)
            ?.fetch()) as TextChannel;

        const messages = await channel.messages.fetch({
            around: SCOREBOARD_MESSAGE_ID,
            limit: 1,
        });
        const message = messages.first();
        await message?.edit({ content: await scoreboard() });
    }
};
