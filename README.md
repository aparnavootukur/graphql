# Application

This is a backend service for a supply chain management application using Node.js, GraphQL, and PostgreSQL. The service manages inventory, tracks shipments, and handles supplier information.

## Prerequisites

Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (for local development)

## Getting Started

### 1. Clone the repository

```bash

git clone https://github.com/aparnavootukur/graphql.git
cd graphql

## Install node-modules

## Install necessary dependencies in package.json file

## To start server use npm start
and click on http://localhost:4000/graphql


After opening the server
Goto
Route/mutation/signUp
This is for firstime user.
1.After that token will be displayed in response
2.Using the token add in the below fields of header against 'Authorization' header

Route/mutation/login
User can use the generated token for remaining CRUD operations performed on shipment,inventory and supplier tables

FOR TESTING:
using 'npx jest'

