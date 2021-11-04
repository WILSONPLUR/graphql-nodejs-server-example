// @ts-nocheck
const express = require("express");
const app = express();
const { buildSchema } = require("graphql");
const { graphqlHTTP } = require("express-graphql");

const schema = buildSchema(`
    type Query {
        name: String,
        id: Int
        arr: [String]
    }

    type Mutation {
        setName(name: String): String
        setArr(name: String): [String]
    }

`);

let defName = "John";
let defArr = ["John", "Max", "Jimmy", "Donald", "Gerald"];

const root = {
  name: () => defName,
  id: () => 1,
  arr: () => defArr,
  setName: ({ name }) => {
    defName = name;
    return defName;
  },
  setArr: ({ name }) => {
    defArr.push(name);
    return defArr;
  },
};

app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
  })
);

app.listen(4500, () => console.log("Listening on 4500"));
