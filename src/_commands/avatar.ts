import SlashCommand, { OptionType } from "@structures/SlashCommand";

export default new SlashCommand({
    name: "avatar",
    description: "Get the avatar URL of the selected user, or your own avatar.",
    options: [{ name: "target", description: "The user's avatar to show", type: OptionType.USER }],
    execute(interaction) {
        const user = interaction.options.getUser("target");
        if (user)
            return interaction.reply(
                `${user.username}'s avatar: ${user.displayAvatarURL({ dynamic: true })}`
            );
        return interaction.reply(
            `Your avatar: ${interaction.user.displayAvatarURL({ dynamic: true })}`
        );
    },
});
