import React from "react";
import { useQuery, gql } from "@apollo/client";
import NoteFeed from "../components/NoteFeed";
import Button from "../components/Button";
import { GET_NOTES } from "../gql/query";

const Home = () => {
  const { data, loading, error, fetchMore } = useQuery(GET_NOTES);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error!</p>;
  console.log("error: ", error);
  return (
    <React.Fragment>
      <NoteFeed notes={data.noteFeed.notes} />
      {data.noteFeed.hasNextPage && (
        <Button
          onClick={() =>
          fetchMore({
            variables: {
              cursor: data.noteFeed.cursor
            },
            updateQuery: (previousResult,
              { fetchMoreResult }) => {
                return {
                  noteFeed: {
                    cursor: fetchMoreResult.noteFeed.cursor,
                    hasNextPage: fetchMoreResult.noteFeed.hasNextPage,
                    notes: [
                      ...previousResult.noteFeed.notes,
                      ...fetchMoreResult.noteFeed.notes
                    ],
                    __typename: "noteFeed"
                  }
                }
              }
          })}
        >Load more</Button>
      )}
    </React.Fragment>
  );
};

export default Home;