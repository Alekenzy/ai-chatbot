import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: (origin, callback) => {
      if (!origin) {
        // Разрешить запросы без origin (например, Postman)
        return callback(null, true);
      }

      const allowedPattern = /^https:\/\/ai-chatbot-.*\.vercel\.app$/;
      const allowedLocalhost = 'http://localhost:3000';

      if (allowedPattern.test(origin) || origin === allowedLocalhost) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
  });

  await app.listen(8000);
}
bootstrap();
