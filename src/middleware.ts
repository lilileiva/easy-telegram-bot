import { Bot } from "./bot";

let botInstance: Bot | null = null;

/**
 * Initializes the global bot instance.
 * @param token Telegram Bot Token
 * @param chatId Telegram Chat ID
 */
export function initBotMiddleware(token: string, chatId: string): void {
    botInstance = new Bot(token, chatId);
}

/**
 * Retrieves the global bot instance.
 * @throws Error if the bot has not been initialized.
 */
export function getBot(): Bot {
    if (!botInstance) {
        throw new Error("Telegram Bot has not been initialized. Call initBot() first.");
    }
    return botInstance;
}
