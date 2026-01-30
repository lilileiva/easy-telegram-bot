# Telegram Bot

This is a simple Telegram bot for Node.js that can be used to send messages to a Telegram chat.

## Features

- Send messages to a Telegram chat
- Decorator to send messages to a Telegram chat

## Telegram token

You can get your Telegram token by creating a bot on Telegram. Please follow the instructions on the [Telegram Bot documentation](https://core.telegram.org/bots/tutorial#obtain-your-bot-token):

Obtaining a token is as simple as contacting @BotFather, issuing the `/newbot` command and following the steps until you're given a new token. You can find a step-by-step guide [here](https://core.telegram.org/bots/features#creating-a-new-bot).

**Make sure to save your token in a secure place, treat it like a password and don't share it with anyone.**

## Chat ID

Please check the [How to get Telegram Bot Chat ID](https://gist.github.com/nafiesl/4ad622f344cd1dc3bb1ecbe468ff9f8a#how-to-get-telegram-bot-chat-id) for more information.

## Installation

```bash
npm install easy-telegram-bot
```

## Usage

You can use the bot in two ways:

### Call bot method

```typescript
import { Bot } from "easy-telegram-bot";

const bot = new Bot("YOUR_BOT_TOKEN", "YOUR_CHAT_ID");

bot.sendMessage("Hello, world!");
```

### Decorator

You can use the decorator to send messages to a Telegram chat.

The decorator can be used in two ways:

- `BotMessageMode.ON_EXECUTE`: Send a message when the method is executed.
- `BotMessageMode.ON_FAILURE`: Send a message when the method fails.

By default, it is `BotMessageMode.ON_FAILURE`.

You can also pass a boolean to the decorator to enable or disable the details of the method. By default, it is `true`.

To use the decorators, you must apply te middleware `initBotMiddleware`.

```typescript
import { initBotMiddleware } from "easy-telegram-bot";

initBotMiddleware("YOUR_BOT_TOKEN", "YOUR_CHAT_ID");
```

And then you can use the decorator

```typescript
import { BotMessage, BotMessageMode } from "easy-telegram-bot";

class TestService {
    @BotMessage({
        message: "Successful execution!",
        mode: BotMessageMode.ON_EXECUTE,
        details: false
    })
    async performTask() {
        console.log("Performing task...");
        return "Task Done";
    }

    @BotMessage({
        message: "Failure detected!",
        mode: BotMessageMode.ON_FAILURE
    })
    async failTask() {
        console.log("Failing task...");
        throw new Error("Something went wrong");
    }
}
```
