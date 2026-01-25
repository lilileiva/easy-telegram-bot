import TelegramBot from "node-telegram-bot-api";

export class Bot {
  private bot: TelegramBot;
  private chatId: string;
  
  /**
   * Initializes the bot with a token and chat ID.
   * @param token The Telegram Bot Token
   * @param chatId The Telegram Chat ID
   */
  constructor(token: string, chatId: string) {

    this.chatId = chatId;
    this.bot = new TelegramBot(token, { polling: false });
  }

  /**
   * Sends a message to the bot.
   * @param message The message to send
   */
  async sendMessage(message: string) {
    try {
      await this.bot.sendMessage(
        this.chatId,
        message
    );
    } catch (error) {
      console.error("Error sending message to bot: ", error)
    }
  }
}