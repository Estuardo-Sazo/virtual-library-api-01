import { IsString } from 'class-validator';

export class AppConfig {
  @IsString()
  DATABASE_URI: string;

  @IsString()
  JWT_SECRET: string;
}
