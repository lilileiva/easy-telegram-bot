import { Bot } from "./bot";
import { initBot, getBot } from "./instance";

/**
 * Middleware to initialize the Telegram Bot.
 * Can be used as Express middleware or called directly.
 * @param token Telegram Bot Token
 * @param chatId Telegram Chat ID
 */
export function BotMiddleware(token: string, chatId: string) {
    initBot(token, chatId);

    return (req: any, res: any, next: () => void) => {
        if (req) {
            req.bot = getBot();
        }
        if (next) {
            next();
        }
    };
}

