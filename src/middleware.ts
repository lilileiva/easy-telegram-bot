import { Bot } from "./bot";

let botInstance: Bot | null = null;

/**
 * Middleware to initialize the Telegram Bot.
 * Can be used as Express middleware or called directly.
 * @param token Telegram Bot Token
 * @param chatId Telegram Chat ID
 */
export function BotMiddleware(token: string, chatId: string) {
    if (!botInstance) {
        botInstance = new Bot(token, chatId);
    }

    return (req: any, res: any, next: () => void) => {
        if (req) {
            req.bot = botInstance;
        }
        if (next) {
            next();
        }
    };
}

/**
 * Initializes the Telegram Bot.
 * @param token Telegram Bot Token
 * @param chatId Telegram Chat ID
 */
export function initBot(token: string, chatId: string) {
    if (!botInstance) {
        botInstance = new Bot(token, chatId);
    }
}

/**
 * Retrieves the global bot instance.
 * @throws Error if the bot has not been initialized.
 */
export function getBot(): Bot {
    if (!botInstance) {
        throw new Error("Telegram Bot has not been initialized.");
    }
    return botInstance;
}
