import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppConfig } from './configs/app.config';
import { AuthModule } from './auth/auth.module';
import { BookModule } from './book/book.module';
import { UploadModule } from './upload/upload.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [
        () => ({
          DATABASE_URI: process.env.DATABASE_URI,
          JWT_SECRET: process.env.JWT_SECRET,
          HOST_API: process.env.HOST_API,
        }),
      ],
      validate: (config) => {
        const validatedConfig = new AppConfig();
        validatedConfig.DATABASE_URI = config.DATABASE_URI;
        validatedConfig.JWT_SECRET = config.JWT_SECRET;
        validatedConfig.HOST_API = config.HOST_API;
        return validatedConfig;
      },
    }),
    //Conexion DB #2
    MongooseModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('DATABASE_URI'),
      }),
      inject: [ConfigService],
    }),
    AuthModule,
    BookModule,
    UploadModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
