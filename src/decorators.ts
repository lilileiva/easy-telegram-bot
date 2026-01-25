import { getBot } from "./middleware";

export enum BotMessageMode {
    ON_EXECUTE = "ON_EXECUTE",
    ON_FAILURE = "ON_FAILURE",
}

/**
 * Decorator to send a Telegram message when a method is executed or fails.
 * @param message The message to send.
 * @param mode The mode of the decorator (ON_EXECUTE or ON_FAILURE).
 */
export function BotMessage(message: string, mode: BotMessageMode = BotMessageMode.ON_FAILURE) {
    return function (
        target: any,
        propertyKey: string,
        descriptor: PropertyDescriptor
    ) {
        const originalMethod = descriptor.value;

        descriptor.value = async function (...args: any[]) {
            const bot = getBot();

            if (mode === BotMessageMode.ON_EXECUTE) {
                await bot.sendMessage(message);
            }

            try {
                const result = await originalMethod.apply(this, args);
                return result;
            } catch (error) {
                if (mode === BotMessageMode.ON_FAILURE) {
                    const errorMessage = `${message}\nError: ${error instanceof Error ? error.message : String(error)}`;
                    await bot.sendMessage(errorMessage);
                }
                throw error;
            }
        };

        return descriptor;
    };
}
