import myServer from "@/utils/myServer";

export default class CourseInvoiceModel{
    
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
                        portals:[
                            {
                                id:1,
                                title:"بانک ملت",
                                url:"https://www.bankmellat.ir/default.aspx",
                                icon:"https://www.rade.ir/wp-content/uploads/2019/09/mellat-300-c.png",
                            },
                            {
                                id:2,
                                title:"بانک ملی",
                                url:"https://www.bankmellat.ir/default.aspx",
                                icon:"https://upload.wikimedia.org/wikipedia/commons/b/b9/Bank_Melli_Iran_New_Logo.png",
                            },
                            {
                                id:3,
                                title:"بانک سپه",
                                url:"https://www.bankmellat.ir/default.aspx",
                                icon:"https://upload.wikimedia.org/wikipedia/commons/1/16/BankSepah_Logo.png",
                            }
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