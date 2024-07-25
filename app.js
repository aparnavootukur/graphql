

const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const typeDefs = require('./src/schemas/schema');
const resolvers = require('./src/resolvers/index');

const authenticate = require('./src/middleware/auth');
const { sequelize } = require('./src/models');
const cors =require('cors')
const path = require('path');

const app = express();

// Apply authentication middleware
app.use(authenticate);



app.use(cors())
app.use(express.json());



const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    return { user: req.user };
  }
});

async function startServer() {
  await server.start();
  server.applyMiddleware({ app });

  const PORT = process.env.PORT || 4000;

  app.listen(PORT, async () => {
    console.log(`Server is running on http://localhost:${PORT}${server.graphqlPath}`);
        await sequelize.sync({force:false}).then(()=>{
          console.log('Connection has been established successfully.');
        })
        .catch ((error)=> {
          console.error('Unable to connect to the database:', error);
        })

  });
}

startServer();