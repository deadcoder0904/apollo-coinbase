import { gql } from "graphql-tag";

export const defaults = {
  todos: [],
  visibilityFilter: "SHOW_ALL"
};

let nextTodo = 0;

export const resolvers = {
  Mutation: {
    addTodo: (_, { text }, { cache }) => {
      const query = gql`
        query GetTodos {
          todos @client {
            id
            text
            completed
          }
        }
      `;

      const previous = cache.readQuery({ query });
      console.log({ previous });

      const newTodo = {
        id: nextTodo++,
        text,
        completed: false,
        __typename: "TodoItem"
      };

      cache.writeData({ data: previous.todos.concat([newTodo]) });
      return newTodo;
    },
    toggleTodo: (_, variables, { cache }) => {
      const id = `TodoItem:${variables.id}`;
      const fragment = gql`
        fragment completedTodo on TodoItem {
          completed
        }
      `;

      const todo = cache.readFragment({ fragment, id });
      console.log(todo);

      const data = { ...todo, completed: !todo.completed };
      cache.writeData({ id, data });
      return null;
    }
  }
};
