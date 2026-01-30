import { getBot } from "./middleware";

export enum BotMessageMode {
    ON_EXECUTE = "ON_EXECUTE",
    ON_FAILURE = "ON_FAILURE",
}


export interface BotMessageOptions {
    message: string;
    mode?: BotMessageMode;
    details?: boolean;
}

/**
 * Decorator to send a Telegram message when a method is executed or fails.
 * @param options Configuration options for the decorator.
 */
export function BotMessage(options: BotMessageOptions) {
    const { message, mode = BotMessageMode.ON_FAILURE, details = true } = options;
    return function (
        target: any,
        propertyKey: string,
        descriptor: PropertyDescriptor
    ) {
        const originalMethod = descriptor.value;

        descriptor.value = async function (...args: any[]) {
            const bot = getBot();

            let messageToSend = message;

            if (details) {
                messageToSend = `${messageToSend}\nDetails: ${JSON.stringify(args)}\nMethod: ${propertyKey}`;
            }

            if (mode === BotMessageMode.ON_EXECUTE) {
                await bot.sendMessage(messageToSend);
            }

            try {
                const result = await originalMethod.apply(this, args);
                return result;
            } catch (error) {
                if (mode === BotMessageMode.ON_FAILURE) {
                    const errorMessage = `${messageToSend}\nError: ${error instanceof Error ? error.message : String(error)}`;
                    await bot.sendMessage(errorMessage);
                }
                throw error;
            }
        };

        return descriptor;
    };
}

