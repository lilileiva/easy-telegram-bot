import { Bot } from "./bot";

let botInstance: Bot | null = null;

interface PendingListener {
    regex: RegExp;
    callback: (msg: any) => void;
}

const pendingListeners: PendingListener[] = [];

/**
 * Initializes the Telegram Bot.
 * @param token Telegram Bot Token
 * @param chatId Telegram Chat ID
 */
export function initBot(token: string, chatId: string): Bot {
    if (!botInstance) {
        botInstance = new Bot(token, chatId);

        pendingListeners.forEach(listener => {
            botInstance?.onText(listener.regex, listener.callback);
        });

        pendingListeners.length = 0;
    }
    return botInstance;
}

/**
 * Registers an onText listener.
 * If the bot is already initialized, it registers immediately.
 * Otherwise, it stores it in a pending list.
 */
export function registerOnText(regex: RegExp, callback: (msg: any) => void) {
    if (botInstance) {
        botInstance.onText(regex, callback);
    } else {
        pendingListeners.push({ regex, callback });
    }
}

/**
 * Retrieves the global bot instance.
 * @throws Error if the bot has not been initialized.
 */
export function getBot(): Bot {
    if (!botInstance) {
        throw new Error("Telegram Bot has not been initialized. Call initBot() or BotMiddleware() first.");
    }
    return botInstance;
}
