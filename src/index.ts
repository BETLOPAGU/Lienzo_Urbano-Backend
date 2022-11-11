// @ts-ignore
import graphqlUploadExpress = require('graphql-upload/graphqlUploadExpress.js');
import "reflect-metadata"
import { buildSchema } from "type-graphql"
import express from "express"
import compression from 'compression';
import cors from 'cors';
import expressPlayGround from 'graphql-playground-middleware-express';
import { ApolloServer } from 'apollo-server-express';

import JWT, { TokenData } from "./lib/jwt"
import { NODE_ENV, PORT } from "../config/constants"

export interface Context {
    token: string
    tokenData: TokenData
    // pubsub: PubSub
}

const context: any = async({req,connection}: any): Promise<Context> => {
    let token = req ? req.headers.authorization : connection.context.authorization;
    token = token && token.startsWith('Bearer ') ? token.replace('Bearer ','') : null;
    const tokenData = JWT.data(token)
    return { token, tokenData };
};

async function startServer() {
    const schema = await buildSchema({
        resolvers: [__dirname + "/**/*.resolvers.{ts,js}"],
        emitSchemaFile: true,
    });

    const server = new ApolloServer({
        schema,
        context,
        introspection: true,
        csrfPrevention: true,
        cache: 'bounded',
    });
    await server.start();
  
    const app = express();
    app.use(cors())
    app.use(compression());
    app.use(graphqlUploadExpress())
    app.get('/', expressPlayGround({
        endpoint: '/graphql'
    }));
  
    server.applyMiddleware({
        app,
        bodyParserConfig: {
            limit:"50mb"
        }
    });
  
    await new Promise<void>(r => app.listen({ port: PORT }, r));
  
    console.log(`🚀 Lienzo Urbano GraphQL ready on http://localhost:${PORT}${server.graphqlPath} - ${NODE_ENV}`);
}

startServer();