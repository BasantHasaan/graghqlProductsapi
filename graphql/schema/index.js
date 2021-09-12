const { gql } = require('apollo-server');

const typeDefs = gql`
  type User {
    id: Int!
    name: String!
    email: String!
    products: [Product!]!
  }

  type Product {
    id: Int!
    name: String!
    price: Float!
    seller: String!
    user: User!
  }

    type AuthData {
    id: ID!
    token: String!
    tokenExpiration : Int!
   
  }

  type Query {
    user(id: Int!): User
    allProducts(orderBy: LinkOrderByInput): [Product!]!
    product(id: Int!): Product
    login(email:  String!, password:  String!): AuthData!
  }

  type Mutation {
    createUser(name: String!, email: String!, password: String!): User!
    createProduct(
      userId: Int!
      name: String!
      price: Float!
      seller: String!
    ): Product!
  }

  input LinkOrderByInput {
    price: Sort
  }

  enum Sort {
    asc
    desc
  }
`;

module.exports = typeDefs;
