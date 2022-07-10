const { ApolloServer} = require('apollo-server');

const {typeDefs} = require('./GraphTypeDefs/typeDefs')

const {resolvers} = require('./GraphTypeDefs/resolvers')

const server = new ApolloServer({
    typeDefs,
    resolvers,
    csrfPrevention: true,
    cache: 'bounded',
  });

server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
});
