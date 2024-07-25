const { gql } = require('apollo-server-express');
const { GraphQLDate } = require('graphql-scalars');

const typeDefs = gql`

 scalar Date 

  type User{
   id:ID!
   email:String!,
   mobile:String!,
   password:String!
   name:String!
  }
  
  type Inventory {
    id: ID!
    itemName: String!
    sku: String!
    quantity: Int!
    warehouseLocation: String!
  }

  type Shipment {
    id: ID!
    origin: String!
    destination: String!
    status: String!
    estimatedDeliveryDate: Date!
  }

  type Supplier {
    id: ID!
    supplierName: String!
    contactPerson: String!
    phoneNumber: String!
    emailAddress: String!
  }

  type AuthPayload {
  token: String!
  email:String!
}

  type Query {
    inventories(offset: Int, limit: Int): [Inventory!]
    inventory(id: ID!): Inventory
    shipments: [Shipment!]
    shipment(id: ID!): Shipment
    suppliers: [Supplier!]
    supplier(id: ID!): Supplier
    userById(id:ID!):User
    listUsers:[User!]
  }

  type Mutation {
    addInventory(itemName: String!, sku: String!, quantity: Int!, warehouseLocation: String!): Inventory
    updateInventory(id: ID!, itemName: String, sku: String, quantity: Int, warehouseLocation: String): Inventory
    deleteInventory(id: ID!): Boolean

    updateShipmentStatus(id: ID!, status: String!): Shipment
    addShipment(origin:String!,destination:String!,status:String!,estimatedDeliveryDate:Date!):Shipment
    deleteShipment(id:ID!):Boolean


    addSupplier(supplierName: String!, contactPerson: String!, phoneNumber: String!, emailAddress: String!): Supplier
    updateSupplier(id: ID!, supplierName: String, contactPerson: String, phoneNumber: String, emailAddress: String): Supplier
    deleteSupplier(id: ID!): Boolean

    login(email:String!,password:String!):AuthPayload!
    signUp(email:String!,mobile:String!,password:String!,name:String!):AuthPayload!
  }
`;

module.exports = typeDefs;
