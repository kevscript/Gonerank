import { ApolloClient, InMemoryCache } from "@apollo/client";

const apolloClient = new ApolloClient({
  uri: `${
    process.env.NODE_ENV === "production"
      ? "https://gonerank.vercel.app/api/graphql"
      : "http://localhost:3000/api/graphql"
  }`,
  cache: new InMemoryCache(),
  connectToDevTools: true,
});

export default apolloClient;
