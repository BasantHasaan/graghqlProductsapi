const { ApolloServer } = require('apollo-server');
const typeDefs = require('./graphql/schema');
const resolvers = require('./graphql/resolvers/user');
const models = require('./models');

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: (req) => ({
    models,
    req,
  }),
});

server
  .listen()
  .then(() => console.log('Server is running on localhost:4000'));
