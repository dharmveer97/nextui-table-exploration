import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { ApolloServer } from '@apollo/server';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { ApolloServerPluginCacheControl } from '@apollo/server/plugin/cacheControl';
import { typeDefs, resolvers } from '../../../graphql/utils/graphql';

// apollo server 4 integration in this
// no need to use external repo for api
const schema = makeExecutableSchema({ typeDefs, resolvers });

const server = new ApolloServer({
  csrfPrevention: true,
  cache: 'bounded',
  introspection: true,
  playground: true,
  schema,
  plugins: [
    ApolloServerPluginCacheControl({ defaultMaxAge: 5 }), // 5 seconds
  ],
});

const handler = startServerAndCreateNextHandler(server, {
  context: async (req, res) => ({ req, res }),
});

// export const runtime = 'edge';

export { handler as GET, handler as POST };
