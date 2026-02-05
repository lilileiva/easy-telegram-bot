import { Bot } from "./src/bot";
import { BotMiddleware } from "./src/middleware";
import { initBot, getBot } from "./src/instance";
import { BotMessage, BotMode, BotOnText, BotPhoto, BotDocument, bindBotOnTextListeners } from "./src/decorators";
import TelegramBot from "node-telegram-bot-api";

export {
    Bot,
    BotMiddleware,
    getBot,
    initBot,
    BotMessage,
    BotMode,
    BotOnText,
    BotPhoto,
    BotDocument,
    bindBotOnTextListeners,
    TelegramBot
};