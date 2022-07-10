const {gql} = require('apollo-server');

const typeDefs = gql`
type User {
    id : Int!
    username : String
    accounts : [Accounts]
}

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

type Query {
    user(id : Int) : User
}

input CreateAccount {
    user_id : Int!,
    user_name : String!,
    bank_accounts : [String]!
}

type Mutation {
    addAccountDetails(data : CreateAccount ) : User
}
`

module.exports = {typeDefs}