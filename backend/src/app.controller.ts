import { Body, Controller, Post } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import OpenAI from 'openai';

@Controller('api')
export class AppController {
  private client: OpenAI;

  constructor(private config: ConfigService) {
    this.client = new OpenAI({
      baseURL: 'https://openrouter.ai/api/v1',
      apiKey: this.config.get<string>('OPENAI_API_KEY'),
      timeout: 15 * 60 * 1000, // 15 min
    });
  }

  @Post('talk') async talk(@Body('text') text: string): Promise<{
    text: string;
    date: string;
    time: string;
    error: boolean;
  }> {
    try {
      const currentDate = new Date();
      const completion = await this.client.chat.completions.create({
        model: 'qwen/qwen3-30b-a3b:free',
        messages: [
          {
            role: 'user',
            content: text,
          },
        ],
      });

      const isError = !completion.choices[0].message.content;

      return {
        text:
          completion.choices[0].message.content ||
          '** Invalid response occurred, please try again or later. **',
        date: currentDate.toString().slice(4, 10),
        time: currentDate.toString().slice(16, 21),
        error: isError,
      };
    } catch (e) {
      console.log(e);
      throw e;
    }
  }
}
