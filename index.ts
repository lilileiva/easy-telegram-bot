import { Bot } from "./src/bot";
import { BotMiddleware } from "./src/middleware";
import { initBot, getBot } from "./src/instance";
import { BotMessage, BotMode, BotOnText, BotPhoto, BotDocument } from "./src/decorators";

export {
    Bot,
    BotMiddleware,
    getBot,
    initBot,
    BotMessage,
    BotMode,
    BotOnText,
    BotPhoto,
    BotDocument
};