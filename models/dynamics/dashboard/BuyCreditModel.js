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
                        banks:[
                            {
                                id:1,
                                title:"بانک ملت",
                                url:"https://www.bankmellat.ir/default.aspx",
                                icon:"https://www.bankmellat.ir/Public/11/portaj.ico",
                            },
                            {
                                id:2,
                                title:"بانک ملت",
                                url:"https://www.bankmellat.ir/default.aspx",
                                icon:"https://www.bankmellat.ir/Public/11/portaj.ico",
                            },
                            {
                                id:3,
                                title:"بانک ملت",
                                url:"https://www.bankmellat.ir/default.aspx",
                                icon:"https://www.bankmellat.ir/Public/11/portaj.ico",
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