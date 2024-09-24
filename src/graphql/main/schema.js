const typeDefs = `#graphql
  scalar Date

  type Success {
    success: Boolean!
    message: String!
  }

  type DummyData {
    id: ID
    createdAt: String
    email: String
    fullName: String
    status: String
  }

  type Query {
    hello: Success!
    getDummyData: [DummyData!]!
  }

  input UpdateInput {
    id: ID
    createdAt: String
    email: String
    fullName: String
    status: String
  }

  type Mutation {
    updateDummyData(input: UpdateInput): DummyData!
  }
`;

export default typeDefs;
