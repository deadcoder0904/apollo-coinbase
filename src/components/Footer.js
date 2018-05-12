import React from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import { Link } from "./Link";

const GET_VISIBILITY_FILTER = gql`
  {
    visibilityFilter @client
  }
`;

const FilterLink = ({ filter, children }) => (
  <Query query={GET_VISIBILITY_FILTER}>
    {({ data, client }) => {
      return (
        <Link
          onClick={() =>
            client.writeData({ data: { visibilityFilter: filter } })
          }
          active={data.visibilityFilter === filter}
        >
          {children}
        </Link>
      );
    }}
  </Query>
);

const Footer = () => (
  <p>
    Show:
    <FilterLink filter="SHOW_ALL">All</FilterLink>
    {", "}
    <FilterLink filter="SHOW_ACTIVE">Active</FilterLink>
    {", "}
    <FilterLink filter="SHOW_COMPLETED">Completed</FilterLink>
  </p>
);

export { Footer };
