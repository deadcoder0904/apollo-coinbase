import React from "react";
import gql from "graphql-tag";
import { Mutation } from "react-apollo";

const ADD_TODO = gql`
  mutation addTodo($text: String!) {
    addTodo(text: $text) @client {
      id
    }
  }
`;

const TodoForm = () => (
  <Mutation mutation={ADD_TODO}>
    {addTodo => {
      let input;
      return (
        <form
          onSubmit={e => {
            e.preventDefault();
            if (!input.value.trim()) return;
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
