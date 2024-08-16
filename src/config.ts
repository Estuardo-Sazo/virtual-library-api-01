import { registerAs } from '@nestjs/config';

export default registerAs('config', () => {
  return {
    hostapi: process.env.HOST_API,
  };
});
