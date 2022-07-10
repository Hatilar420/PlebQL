const AccountServices = require('../Services/AccountService')
const {UserInputError } = require('apollo-server');


const resolvers = {
    Query: {
      async user(_,args){
        let res = await AccountServices.getUserAccountAsync(args.id)
        console.log(res)
        if(!res.IsSuccess){
            throw new UserInputError('User not found')
        }
        return {id :res.Result.id, username : res.Result.name, accounts : res.Result.accounts }
      }
    },
    Mutation : {
        async addAccountDetails(_,args){
            let res  = await AccountServices.createUserAsync(args.data)
            return {id :res.Result.id, username : res.Result.name, accounts : res.Result.accounts }
        }
    }
};

module.exports = {resolvers}