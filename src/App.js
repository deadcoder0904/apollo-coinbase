import React from "react";
import { HttpLink } from "apollo-link-http";
import { ApolloProvider } from "react-apollo";
import { ApolloLink } from "apollo-link";
import { ApolloClient } from "apollo-client";
import { withClientState } from "apollo-link-state";
import { InMemoryCache } from "apollo-cache-inmemory";
import { onError } from "apollo-link-error";

import { defaults, resolvers } from "./resolvers/todos";

import { Header } from "./components/Header";
import { ExchangeRates } from "./components/ExchangeRates";
import { TodoApp } from "./components/TodoApp";

const cache = new InMemoryCache();

const typeDefs = `
  type Todo {
    id: Int!,
    text: String!,
    completed: Boolean!,
  }

  type Mutation {
    addTodo($text: String!): Todo,
    toggleTodo($id: Int!): Todo
  }

  type Query {
    visibilityFilter: String,
    todos: [Todo]
  }
`;

const stateLink = withClientState({ resolvers, defaults, cache, typeDefs });

const errorLink = onError(({ networkError, graphQLErrors }) => {
  if (graphQLErrors) {
    graphQLErrors.map(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      )
    );
  }
  if (networkError)
    console.log(`[Network error]: ${JSON.stringify(networkError)}`);
});

const httpLink = new HttpLink({
  uri: "https://w5xlvm3vzz.lp.gql.zone/graphql"
});

const link = ApolloLink.from([errorLink, stateLink, httpLink]);

const client = new ApolloClient({
  link,
  cache
});

const App = () => (
  <ApolloProvider client={client}>
    <React.Fragment>
      <Header />
      <ExchangeRates />
      <TodoApp />
    </React.Fragment>
  </ApolloProvider>
);

export default App;
