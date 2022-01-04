export default class UserModel{

    async getUser(){

        await new Promise(resolve => setTimeout(resolve, 2000));

        return {
            first_name : "امیرمحمد",
            last_name : "پاکدل",
            phone_number : "09118015081",
            accessLevel : {
                "1":true,
                "2":true,
                "3":false,
                "4":false,
            }
        }
    }
}