import 'event-target-polyfill';
import { createServer, createPubSub } from '@graphql-yoga/node';
import { makeExecutableSchema } from '@graphql-tools/schema';
import resolvers from './resolvers';
import typeDefs from './schema/schema.graphql';
import getModels from './models';
import prisma from './db/client';

const models = getModels(prisma);

const schema = makeExecutableSchema({ resolvers, typeDefs });

const context = {
  pubsub: createPubSub(),
  db: prisma,
  models,
};

const server = createServer({ schema, context });

module.exports = server;
