import logger from "@/lib/logger";
import { Client } from "discord.js";
import Event from "../modules/Event";

export default new Event({
    name: "warn",
    async run(client: Client, args: string) {
        logger.warn(args);
    },
});
