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
    this.bot = new TelegramBot(token, { polling: true });
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

  /**
   * Starts listening for poll answers.
   * @param command The command to listen for.
   * @param callback The callback function to handle poll answers.
   */
  onText(command: RegExp, callback: (msg: any) => void) {
    this.bot.onText(command, callback);
  }

  /**
   * Sends a photo to the bot.
   * @param photo The photo to send
   * @param caption The caption to send
   */
  async sendPhoto(photo: string | Buffer, caption?: string) {
    try {
      await this.bot.sendPhoto(
        this.chatId,
        photo,
        { caption }
      );
    } catch (error) {
      console.error("Error sending photo to bot: ", error)
    }
  }

  /**
   * Sends a document to the bot.
   * @param document The document to send
   * @param caption The caption to send
   */
  async sendDocument(document: string | Buffer, caption?: string) {
    try {
      await this.bot.sendDocument(
        this.chatId,
        document,
        { caption }
      );
    } catch (error) {
      console.error("Error sending document to bot: ", error)
    }
  }
}