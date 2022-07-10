# PlebQL
A simple graphQl Application on Nodejs using postgres and Apollo

## Steps to install

1. Clone the repo
2. run `npm init`
3. create a `.env` with the fields `DATABASE_URL` and `WEATHER_API_KEY` and add their respective values
4. run `npx prisma migrate dev` if working in dev enviroment else in production or testing enviroments run `npx prisma migrate deploy` to migrate the database schema.
5. Start the server with `npm start`


## Documentation

- Queries

```graphql
  type Query {
    user(id : Int) : User
    users : [User]
  }
```

- Mutations
  ```graphql
  type Mutation {
    addAccountDetails(data : CreateAccount ) : User
  }
  ```

- Input types

```graphql
  input CreateAccount {
    user_id : Int!,
    user_name : String!,
    bank_accounts : [String]!
}
```


 - types for GraphQl

```graphql
  type User {
    id : Int!
    username : String
    accounts : [Accounts]
}
```

```graphql
  type Accounts  {
    ISO3166: String,
    NEFT: Boolean,
    CONTACT: String,
    CITY: String,
    UPI: Boolean,
    IMPS: Boolean,
    STATE: String,
    SWIFT: Boolean,
    ADDRESS: String,
    RTGS: Boolean,
    MICR: String,
    BRANCH: String,
    CENTRE: String,
    DISTRICT: String,
    BANK: String,
    BANKCODE: String,
    IFSC: String,
    weather : Weather
}
```

```graphql
  type Weather {
    temp: Float,
    feels_like: Float,
    temp_min: Float,
    temp_max: Float,
    pressure: Float,
    humidity: Float,
    sea_level: Float,
    grnd_level: Float
}
```







      
