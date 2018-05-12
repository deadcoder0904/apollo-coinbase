import React from "react";
import gql from "graphql-tag";
import { Mutation } from "react-apollo";

const ADD_TODO = gql`
  mutation addTodo($text: String!) {
    addTodo(text: $text) @client {
      id
      text
    }
  }
`;

const TodoForm = () => (
  <Mutation mutation={ADD_TODO} errorPolicy="all">
    {(addTodo, { data, error }) => {
      if (error)
        return (
          <pre>
            Bad:{JSON.stringify(error, null, 4)}
            {error.graphQLErrors.map(({ message }, i) => (
              <span key={i}>{message}</span>
            ))}
          </pre>
        );
      let input;
      return (
        <form
          onSubmit={e => {
            e.preventDefault();
            if (!input.value.trim()) return;
            console.log(input.value);
            addTodo({ variables: { text: input.value } });
            input.value = "";
          }}
        >
          <input
            type="text"
            ref={node => {
              input = node;
            }}
          />
          <button type="submit">Add Todo</button>
        </form>
      );
    }}
  </Mutation>
);

export { TodoForm };
