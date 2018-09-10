import express from 'express'
import graphqlHTTP from 'express-graphql'
import {buildSchema} from 'graphql'
import config from 'config'
import connect from './connect'

const models = connect(config.get('DB'));

const schema = buildSchema(`
  type User {
    id: Int!
    user: String!
  }
  type Query {
    user(id: Int) : User
    users : [User]!
  }
  input UserData {
    user: String!
  }
  type Mutation {
    createUser(data: UserData!) : User
    updateUser(id: Int!, data: UserData!) : User
    deleteUser(id: Int!) : Int
  }
`);

const rootValue = {
  user: ({id}) => {
    return models.res.findOne({where: {id}});
  },
  users: () => {
    return models.res.findAll();
  },
  createUser: ({data}) => {
    return models.res.create(data);
  },
  updateUser: ({id, data}) => {
    return models
      .res
      .findOne({where: {id}})
      .then(user => {
        if (user) {
          return user.update(data).then(updated => updated);
        }
        return null;
      }
    );
  },
  deleteUser: ({id}) => {
    return models.res.destroy({where: {id}});
  }
};

const app = express();

app.use('/graphql', graphqlHTTP({
  schema,
  rootValue,
  graphiql: true,
  pretty: true
}));

app.use(express.static('public'));

app.listen(3000, () =>
  console.log('Now browse to localhost:3000/graphql')
);
