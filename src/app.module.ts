import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppConfig } from './configs/app.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [
        () => ({
          DATABASE_URI: process.env.DATABASE_URI,
          JWT_SECRET: process.env.JWT_SECRET,
        }),
      ],
      validate: (config) => {
        const validatedConfig = new AppConfig();
        validatedConfig.DATABASE_URI = config.DATABASE_URI;
        validatedConfig.JWT_SECRET = config.JWT_SECRET;
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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
