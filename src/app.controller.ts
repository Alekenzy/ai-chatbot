import { BadRequestException, Body, Controller, Get, Post } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  getHello(): string {
    return '<h1>Hello World!</h1>' + 'Atak Isteid Na';
  }

  @Post('messages') async messages(
    @Body('username') username: string,
    @Body('message') message: string,
  ): Promise<{
    status: number
    message: string
    data: {
      username: string
      message: string
    }
  }> {

    if (!username || !message) {
      throw new BadRequestException('Not all data passed', {
        cause: new Error(),
        description: 'Username or message is missing',
      });
    }

    return {
      status: 200,
      message: 'success',
      data: { username, message }
    };
  }
}
