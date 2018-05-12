import React from "react";
import { TodoForm } from "./TodoForm";
import { TodoList } from "./TodoList";
import { Footer } from "./Footer";

const TodoApp = () => (
  <React.Fragment>
    <TodoForm />
    <TodoList />
    <Footer />
  </React.Fragment>
);

export { TodoApp };
