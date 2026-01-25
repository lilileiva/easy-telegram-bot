import TelegramBot from "node-telegram-bot-api";

export class Bot {
  private bot: TelegramBot;
  private chatId: string;
  
  constructor(token: string, chatId: string) {

    this.chatId = chatId;
    this.bot = new TelegramBot(token, { polling: false });
  }

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