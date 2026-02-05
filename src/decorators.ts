import "reflect-metadata";
import { getBot, registerOnText } from "./instance";

export enum BotMode {
    ON_EXECUTE = "ON_EXECUTE",
    ON_FAILURE = "ON_FAILURE",
}

export interface MessageOptions {
    message: string;
    mode?: BotMode;
    details?: boolean;
}

export interface PhotoOptions {
    photo: string;
    caption?: string;
    mode?: BotMode;
    details?: boolean;
}

export interface DocumentOptions {
    document: string;
    caption?: string;
    mode?: BotMode;
    details?: boolean;
}

// Metadata key for storing BotOnText decorators on the class prototype
const BOT_ON_TEXT_METADATA_KEY = Symbol.for('botOnTextMethods');

interface BotOnTextMetadata {
    propertyKey: string;
    regex: RegExp;
}

/**
 * Decorator to register a method as an onText listener.
 * Call `bindBotOnTextListeners(instance)` after creating your class instance is required.
 * @param regex The regex to listen for.
 */
export function BotOnText(regex: RegExp) {
    return function (
        target: any,
        propertyKey: string,
        descriptor: PropertyDescriptor
    ) {
        // Store metadata on the class prototype itself using reflect-metadata
        const existingMethods: BotOnTextMetadata[] = Reflect.getMetadata(BOT_ON_TEXT_METADATA_KEY, target) || [];
        existingMethods.push({ propertyKey, regex });
        Reflect.defineMetadata(BOT_ON_TEXT_METADATA_KEY, existingMethods, target);

        console.log(`[BotOnText] Registered ${propertyKey} with regex ${regex}`);
        return descriptor;
    };
}

/**
 * Binds all @BotOnText decorated methods to the bot for a specific instance.
 * Call this after creating your class instance.
 * @param instance The class instance containing decorated methods.
 */
export function bindBotOnTextListeners(instance: any) {
    const prototype = Object.getPrototypeOf(instance);
    const methods: BotOnTextMetadata[] = Reflect.getMetadata(BOT_ON_TEXT_METADATA_KEY, prototype) || [];

    console.log(`[bindBotOnTextListeners] Found ${methods.length} methods for ${instance.constructor.name}`);

    methods.forEach(({ propertyKey, regex }) => {
        const method = instance[propertyKey];
        if (typeof method === 'function') {
            console.log(`[bindBotOnTextListeners] Binding ${propertyKey} with regex ${regex}`);
            registerOnText(regex, async (msg) => {
                try {
                    await method.call(instance, msg);
                } catch (error) {
                    console.error(`Error in @BotOnText handler '${propertyKey}':`, error);
                }
            });
        }
    });
}

/**
 * Decorator to send a Telegram message when a method is executed or fails.
 * @param options Configuration options for the decorator.
 */
export function BotMessage(options: MessageOptions) {
    const { message, mode = BotMode.ON_EXECUTE, details = true } = options;
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

            if (mode === BotMode.ON_EXECUTE) {
                await bot.sendMessage(messageToSend);
            }

            try {
                const result = await originalMethod.apply(this, args);
                return result;
            } catch (error) {
                if (mode === BotMode.ON_FAILURE) {
                    const errorMessage = `${messageToSend}\nError: ${error instanceof Error ? error.message : String(error)}`;
                    await bot.sendMessage(errorMessage);
                }
                throw error;
            }
        };

        return descriptor;
    };
}

/**
 * Decorator to send a photo when a method is executed or fails.
 * @param options Configuration options for the decorator.
 */
export function BotPhoto(options: PhotoOptions) {
    const { photo, caption, mode = BotMode.ON_EXECUTE, details = true } = options;
    return function (
        target: any,
        propertyKey: string,
        descriptor: PropertyDescriptor
    ) {
        const originalMethod = descriptor.value;

        descriptor.value = async function (...args: any[]) {
            const bot = getBot();

            let captionToSend = caption || "";

            if (details) {
                captionToSend = `${captionToSend}\nMethod: ${propertyKey}`;
            }

            if (mode === BotMode.ON_EXECUTE) {
                await bot.sendPhoto(photo, captionToSend);
            }

            try {
                const result = await originalMethod.apply(this, args);
                return result;
            } catch (error) {
                if (mode === BotMode.ON_FAILURE) {
                    const errorCaption = `${captionToSend}\nError: ${error instanceof Error ? error.message : String(error)}`;
                    await bot.sendPhoto(photo, errorCaption);
                }
                throw error;
            }
        };

        return descriptor;
    };
}

/**
 * Decorator to send a document when a method is executed or fails.
 * @param options Configuration options for the decorator.
 */
export function BotDocument(options: DocumentOptions) {
    const { document, caption, mode = BotMode.ON_EXECUTE, details = true } = options;
    return function (
        target: any,
        propertyKey: string,
        descriptor: PropertyDescriptor
    ) {
        const originalMethod = descriptor.value;

        descriptor.value = async function (...args: any[]) {
            const bot = getBot();

            let captionToSend = caption || "";

            if (details) {
                captionToSend = `${captionToSend}\nMethod: ${propertyKey}`;
            }

            if (mode === BotMode.ON_EXECUTE) {
                await bot.sendDocument(document, captionToSend);
            }

            try {
                const result = await originalMethod.apply(this, args);
                return result;
            } catch (error) {
                if (mode === BotMode.ON_FAILURE) {
                    const errorCaption = `${captionToSend}\nError: ${error instanceof Error ? error.message : String(error)}`;
                    await bot.sendDocument(document, errorCaption);
                }
                throw error;
            }
        };

        return descriptor;
    };
}

