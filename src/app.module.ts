import { ApolloDriverConfig, ApolloDriver } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';

import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core';
import { ArtworksModule } from './artworks/artworks.module';
import { UsersModule } from './users/users.module';
import { SeedModule } from './seed/seed.module';
import { AuthModule } from './auth/auth.module';
import { CollectionsModule } from './collections/collections.module';
import { CommentsModule } from './comments/comments.module';
import { ReportsModule } from './reports/reports.module';
import { PubsubModule } from './pubsub/pubsub.module';
import { NotificationsModule } from './notifications/notifications.module';
import { EventsModule } from './events/events.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      playground: false,
      introspection: true,
      plugins: [ApolloServerPluginLandingPageLocalDefault({ footer: false })],
      subscriptions: {
        'graphql-ws': true,
      },
      context: ({ req, connectionParams }) =>
        connectionParams
          ? { req: connectionParams, isWebSocket: true }
          : { req },
    }),
    ArtworksModule,
    UsersModule,
    SeedModule,
    AuthModule,
    CollectionsModule,
    CommentsModule,
    ReportsModule,
    PubsubModule,
    NotificationsModule,
    EventsModule,
  ],
  controllers: [],
})
export class AppModule {}
