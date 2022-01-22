import myServer from "@/utils/myServer";

export default class BuyCreditModel{
    
    /**
    * 
    * @param {object} params
    * @param {import("@/models/jsdoc/RequestCallback").RequestCallback} cb 
    */
    getBaseData(params, cb){
    
        if(env.MOCKING_SERVER || 1){
            setTimeout(()=>{
                cb(null, {
                    result_code:env.SC.SUCCESS,
                    data:{
                        credit: 325000,
                        incomes: 640000,
                        daily_expense: 26300,
                        portals:[
                            {
                                id:1,
                                title:"بانک ملت",
                                url:"https://www.bankmellat.ir/default.aspx",
                                icon:"https://www.rade.ir/wp-content/uploads/2019/09/mellat-300-c.png",
                            },
                            {
                                id:2,
                                title:"بانک ملت",
                                url:"https://www.bankmellat.ir/default.aspx",
                                icon:"https://www.rade.ir/wp-content/uploads/2019/09/mellat-300-c.png",
                            },
                            {
                                id:3,
                                title:"بانک ملت",
                                url:"https://www.bankmellat.ir/default.aspx",
                                icon:"https://www.rade.ir/wp-content/uploads/2019/09/mellat-300-c.png",
                            },
                        ]
                    }
                });
            }, 2000, cb);
            return;
        }
    
        myServer.Post(myServer.urls.SOME_URL, params, {}, (err, data)=>{
    
            if(!err){
            
                cb(null, data);
            
            }else{
            
                myServer.ErrorHandler.type1(err);
            }
        });
    }
    
    
}