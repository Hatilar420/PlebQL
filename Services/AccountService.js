const AccountDomain = require('../Domain/AccountDomain')
const UserDomain = require('../Domain/UserDomain')
const axios = require('axios').default
const ifsc = require('ifsc');


class AccountServices {



    getUserAccountAsync = async(id) =>{
        let result = await UserDomain.GetEntityById(parseInt(id))
        if(result.Result){
            let ret_obj = {id : result.Result.id, name : result.Result.username, accounts: []}
            let res_acc = await AccountDomain.GetEntityByPrismQuery({userId : id})
            for(let i of res_acc.Result){
                let obj = await this._getIFSCAndWeatherDetails(i.bankNumber)
                ret_obj.accounts.push(obj)
            }
            return {IsSuccess:result.IsSuccess,Result:ret_obj}
        }
        return {IsSuccess : false}
    }

    createUserAsync = async (data) =>{
        let result = await UserDomain.GetEntityById(data.user_id)
        if(result.IsSuccess && result.Result == null){
            let CreatedUser  = await UserDomain.CreateEntity( {id:parseInt(data.user_id) ,username:data.user_name} )
            if(CreatedUser.IsSuccess){
                let CreatedAccounts = await this._createBankAccountsAsync(data.bank_accounts,CreatedUser.Result.id)
                if(!CreatedAccounts.IsSuccess){
                    return CreatedAccounts
                }
                let retObj = {
                    id : CreatedUser.Result.id,
                    name : CreatedUser.Result.username,
                    accounts : CreatedAccounts.Result
                }
                return {IsSuccess : CreatedAccounts.IsSuccess,Result : retObj}
            }else{
                console.log(CreatedUser.Error)
                return {IsSuccess:false}
            }
        }else if(result.IsSuccess && result.Result){
            let CreatedAccounts = await this._createBankAccountsAsync(data.bank_accounts,result.Result.id)
            if(!CreatedAccounts.IsSuccess){
                return CreatedAccounts
            }
            let retObj = {
                id : result.Result.id,
                name : result.Result.username,
                accounts : CreatedAccounts.Result
            }
            return {IsSuccess : CreatedAccounts.IsSuccess,Result : retObj}
        }else{
            console.log(result.Error)
            return {IsSuccess : false}
        }

    }

    _createBankAccountAsync = async (data,id) =>{
        
        let bankAccount = await AccountDomain.CreateEntity({userId : id, bankNumber : data})

        if(bankAccount.IsSuccess){
            return {IsSuccess : bankAccount.IsSuccess, Result: bankAccount.Result}
        }else{
            console.log(bankAccount.Error)
            return {IsSuccess : false}
        }

    }

    _createBankAccountsAsync = async(arr,id) =>{
        if(arr){
            for(let i of arr){
                let accResult = await  this._createBankAccountAsync(i,id)
                if(accResult.IsSuccess){
                    continue;
                }else{
                    console.log("not unique bank account")
                    return {IsSuccess:false,Error : "Not unique value of bank account"}
                }
            }
            let res = []
            for(let i of arr){
                let accWe = await this._getIFSCAndWeatherDetails(i)
                res.push(accWe)
            }
            return {IsSuccess : true, Result: res}
        }else{
            console.log("Bank number array is undefined")
            return { IsSuccess:false,Error:"Bank Accounts is undefined" }
        }
    }

    _getIFSCAndWeatherDetails = async(data) =>{
        let result  = null
        if(ifsc.validate(data)){
            let details =  await ifsc.fetchDetails(data)
            let weather = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${details.CITY}&appid=${process.env.WEATHER_API_KEY}&units=metric`)
            details.weather = weather.data.main 
            result = details
        }
        return result
    }



}


module.exports = new AccountServices()
