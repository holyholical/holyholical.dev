import { Question } from './questions-storage';

interface TelegramConfig {
  botToken: string;
  chatId: string;
}

class TelegramBot {
  private config: TelegramConfig;
  private apiUrl: string;

  constructor(config: TelegramConfig) {
    this.config = config;
    this.apiUrl = `https://api.telegram.org/bot${config.botToken}`;
  }

  // Send message to Telegram
  async sendMessage(text: string): Promise<boolean> {
    try {
      const response = await fetch(`${this.apiUrl}/sendMessage`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chat_id: this.config.chatId,
          text: text,
          parse_mode: 'HTML',
        }),
      });

      const data = await response.json();
      return data.ok;
    } catch (error) {
      console.error('Error sending Telegram message:', error);
      return false;
    }
  }

  // Notify about new question
  async notifyNewQuestion(question: Question): Promise<boolean> {
    const message = `🆕 <b>New Question Submitted</b>

📝 <b>Question:</b> ${question.question}
👤 <b>From:</b> ${question.authorName || 'Anonymous'}
📧 <b>Email:</b> ${question.authorEmail || 'Not provided'}
🕐 <b>Time:</b> ${new Date(question.submittedAt).toLocaleString()}

🆔 <b>ID:</b> <code>${question.id}</code>

Reply with: <code>/answer ${question.id} Your answer here</code>`;
    
    return this.sendMessage(message);
  }

  // Notify about answered question
  async notifyQuestionAnswered(question: Question): Promise<boolean> {
    const message = `✅ <b>Question Answered</b>

📝 <b>Question:</b> ${question.question}
💬 <b>Answer:</b> ${question.answer}
🕐 <b>Answered:</b> ${new Date(question.answeredAt!).toLocaleString()}

🆔 <b>ID:</b> <code>${question.id}</code>`;
    
    return this.sendMessage(message);
  }

  // Format pending questions list
  formatPendingQuestions(questions: Question[]): string {
    if (questions.length === 0) {
      return '📋 <b>No pending questions</b>';
    }

    let message = `📋 <b>Pending Questions (${questions.length})</b>\n\n`;
    
    questions.forEach((q, index) => {
      message += `${index + 1}. <b>${q.question}</b>\n`;
      message += `   🆔 ID: <code>${q.id}</code>\n`;
      message += `   👤 From: ${q.authorName || 'Anonymous'}\n`;
      message += `   🕐 ${new Date(q.submittedAt).toLocaleString()}\n\n`;
    });

    message += `Use <code>/question [id]</code> to view details or <code>/answer [id] [answer]</code> to respond.`;
    
    return message;
  }

  // Format question details
  formatQuestionDetails(question: Question): string {
    const status = question.status === 'answered' ? '✅ Answered' : '⏳ Pending';
    
    let message = `📝 <b>Question Details</b>\n\n`;
    message += `🆔 <b>ID:</b> <code>${question.id}</code>\n`;
    message += `📊 <b>Status:</b> ${status}\n`;
    message += `📋 <b>Question:</b> ${question.question}\n`;
    message += `👤 <b>From:</b> ${question.authorName || 'Anonymous'}\n`;
    message += `📧 <b>Email:</b> ${question.authorEmail || 'Not provided'}\n`;
    message += `🕐 <b>Submitted:</b> ${new Date(question.submittedAt).toLocaleString()}\n`;
    
    if (question.answer) {
      message += `💬 <b>Answer:</b> ${question.answer}\n`;
      message += `🕐 <b>Answered:</b> ${new Date(question.answeredAt!).toLocaleString()}\n`;
    }

    return message;
  }

  // Parse answer command
  parseAnswerCommand(text: string): { questionId: string; answer: string } | null {
    const match = text.match(/^\/answer\s+(\w+)\s+(.+)$/i);
    if (!match) return null;
    
    return {
      questionId: match[1],
      answer: match[2].trim()
    };
  }

  // Parse question command
  parseQuestionCommand(text: string): string | null {
    const match = text.match(/^\/question\s+(\w+)$/i);
    return match ? match[1] : null;
  }
}

// Singleton instance
let telegramBot: TelegramBot | null = null;

export function getTelegramBot(): TelegramBot | null {
  if (!telegramBot) {
    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;
    
    if (!botToken || !chatId) {
      console.warn('Telegram bot not configured. Set TELEGRAM_BOT_TOKEN and TELEGRAM_CHAT_ID environment variables.');
      return null;
    }
    
    telegramBot = new TelegramBot({ botToken, chatId });
  }
  
  return telegramBot;
}

export { TelegramBot };
