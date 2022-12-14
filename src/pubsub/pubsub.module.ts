import { Module } from '@nestjs/common';
import { RedisPubSub } from 'graphql-redis-subscriptions';
import { ConfigService, ConfigModule } from '@nestjs/config';

export const PUB_SUB = 'PUB_SUB';

@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: PUB_SUB,
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const pubsub = new RedisPubSub({
          connection: {
            host: 'localhost',
            port: 6379,
          },
        });
        return pubsub;
      },
    },
  ],
  exports: [PUB_SUB],
})
export class PubsubModule {}
