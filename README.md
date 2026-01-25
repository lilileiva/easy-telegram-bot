# Telegram Bot

This is a simple Telegram bot that can be used to send messages to a Telegram chat.

## Features

- Send messages to a Telegram chat
- Decorator to send messages to a Telegram chat

## Telegram token

You can get your Telegram token by creating a bot on Telegram. Please follow the instructions on the [Telegram Bot documentation](https://core.telegram.org/bots/tutorial#obtain-your-bot-token):

In this context, a token is a string that authenticates your bot (not your account) on the bot API. Each bot has a unique token which can also be revoked at any time via @BotFather.

Obtaining a token is as simple as contacting @BotFather, issuing the `/newbot` command and following the steps until you're given a new token. You can find a step-by-step guide [here](https://core.telegram.org/bots/features#creating-a-new-bot).

Your token will look something like this:

```
4839574812:AAFD39kkdpWt3ywyRZergyOLMaJhac60qc
```

**Make sure to save your token in a secure place, treat it like a password and don't share it with anyone.**

## Chat ID

Please check the [How to get Telegram Bot Chat ID](https://gist.github.com/nafiesl/4ad622f344cd1dc3bb1ecbe468ff9f8a#how-to-get-telegram-bot-chat-id) for more information.

## Installation

```bash
npm install telegram-bot
```

## Usage

You can use the bot in two ways:

### Call bot method

```typescript
import { Bot } from "telegram-bot";

const bot = new Bot("YOUR_BOT_TOKEN", "YOUR_CHAT_ID");

bot.sendMessage("Hello, world!");
```

### Decorator

```typescript
import { BotMessage, BotMessageMode } from "telegram-bot";

class TestService {
    @BotMessage("Successful execution!", BotMessageMode.ON_EXECUTE)
    async performTask() {
        console.log("Performing task...");
        return "Task Done";
    }

    @BotMessage("Failure detected!", BotMessageMode.ON_FAILURE)
    async failTask() {
        console.log("Failing task...");
        throw new Error("Something went wrong");
    }
}
```
