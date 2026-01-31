# Easy Telegram Bot (Node.js)

A lightweight Node.js library for sending messages to a Telegram chat, with optional decorators for automatic notifications on method execution or failure.

## Features

- Send messages to a Telegram chat
- Decorator-based notifications for method execution or errors
- Works standalone or as Express middleware
- Support for sending photos and documents
- Event listener for specific text commands

## Prerequisites

Before using this package, you’ll need:

- A **Telegram Bot Token**
- A **Chat ID** where messages will be sent

### Getting a Telegram Bot Token

Create a bot using **@BotFather** on Telegram.

1. Open Telegram and search for `@BotFather`
2. Run the `/newbot` command
3. Follow the instructions until you receive your bot token

Official guides:

- https://core.telegram.org/bots/tutorial#obtain-your-bot-token
- https://core.telegram.org/bots/features#creating-a-new-bot

**Important:**  
Keep your bot token secure. Treat it like a password and never commit or share it publicly.

### Getting Your Chat ID

To find the chat ID where messages should be sent, follow this guide:

- https://gist.github.com/nafiesl/4ad622f344cd1dc3bb1ecbe468ff9f8a#how-to-get-telegram-bot-chat-id

## Installation

```bash
npm install easy-telegram-bot
```

## Basic Usage

### Initialize the Bot

You can use `initBot` to initialize the bot.

```typescript
import { initBot } from "easy-telegram-bot";

// Initialize the bot
const bot = initBot("YOUR_BOT_TOKEN", "YOUR_CHAT_ID");
```

### Available Methods

#### `sendMessage(message: string)`
Sends a simple text message to the chat.

```typescript
bot.sendMessage("Hello, world!");
```

#### `sendPhoto(photo: string | Buffer, caption?: string)`
Sends a photo to the chat. You can pass a file path or a buffer.

```typescript
// Send by path
bot.sendPhoto("./path/to/image.jpg", "Look at this!");
```

#### `sendDocument(document: string | Buffer, caption?: string)`
Sends a document (file) to the chat.

```typescript
// Send by path
bot.sendDocument("./path/to/file.pdf", "Here is the report");
```

#### `onText(command: RegExp, callback: (msg: any) => void)`
Listens for messages that match a regular expression.

```typescript
// Listen for /hello command
bot.onText(/\/hello/, (msg) => {
  console.log("Received /hello command:", msg);
  bot.sendMessage("Hello back!");
});
```

---

## Decorator Usage

The library provides decorators for automatically run the bot when a method runs or fails.

### Bot Modes

`ON_EXECUTE`
Sends a message when the method executes successfully.

`ON_FAILURE` (default)
Sends a message only when the method throws an error.

### Decorator Options

| Option | Type | Default | Description |
| --- | --- | --- | --- |
| message | string | - | Message sent to Telegram |
| mode | BotMode | ON_FAILURE | When to send the message |
| details | boolean | true | Include method details |

### Initializing the Bot (Required for Decorators)

Decorators require the bot to be initialized using `BotMiddleware` or `initBot`.

#### Without Express

If you are not using Express, initialize the bot manually:

```typescript
import { initBot } from "easy-telegram-bot";

initBot("YOUR_BOT_TOKEN", "YOUR_CHAT_ID");
```

#### Using the Decorators

```typescript
import { BotMessage, BotPhoto, BotDocument, BotOnText, BotMode } from "easy-telegram-bot";

class TestService {
    // Send message on execute
    @BotMessage({
        message: "Successful execution!",
        mode: BotMode.ON_EXECUTE,
        details: false
    })
    async performTask() {
        console.log("Performing task...");
        return "Task Done";
    }

    // Send message on failure
    @BotMessage({
        message: "Failure detected!",
        mode: BotMode.ON_FAILURE
    })
    async failTask() {
        console.log("Failing task...");
        throw new Error("Something went wrong");
    }

    // Listen for /start command
    @BotOnText(/\/start/)
    startCommand(msg: any) {
        console.log("Start command received", msg);
        // Logic here
    }

    // Send photo on execute
    @BotPhoto({
        photo: "./path/to/success.jpg",
        caption: "Task Completed",
        mode: BotMode.ON_EXECUTE
    })
    async photoTask() {
        // ...
    }

    // Send document on execute
    @BotDocument({
        document: "./path/to/success.jpg",
        caption: "Task Completed",
        mode: BotMode.ON_EXECUTE
    })
    async documentTask() {
        // ...
    }
}
```

#### Using as Express Middleware

When used with Express, the middleware initializes the bot and attaches it to the request object.

```typescript
import express from "express";
import { BotMiddleware } from "easy-telegram-bot";

const app = express();

// Initialize the bot and attach it to req.bot
app.use(BotMiddleware("YOUR_BOT_TOKEN", "YOUR_CHAT_ID"));

app.get("/", (req, res) => {
    req.bot.sendMessage("Route hit!");
    res.send("Hello World");
});
```

### Notes

- Store your bot token and chat ID in environment variables for production use.
- Decorators require TypeScript with `experimentalDecorators` enabled.

Example `tsconfig.json`:

```json
{
  "compilerOptions": {
    "experimentalDecorators": true
  }
}
```
