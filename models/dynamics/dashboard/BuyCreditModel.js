import myServer from "@/utils/myServer";

export default class BuyCreditModel{
    
    /**
    * 
    * @param {object} params
    * @param {import("@/models/jsdoc/RequestCallback").RequestCallback} cb 
    */
    getPortals(params, cb){
    
        if(env.MOCKING_SERVER){
            setTimeout(()=>{
                cb(null, {
                    result_code:env.SC.SUCCESS,
                    data:[
                        {
                            id:1,
                            title:"درگاه زرین پال",
                            name:"zarinpal",
                            logo:"https://www.rade.ir/wp-content/uploads/2019/09/mellat-300-c.png",
                        },
                    ]
                });
            }, 2000, cb);
            return;
        }
    
        myServer.Get(myServer.urls.PORTALS_LIST, {}, (err, data)=>{
    
            if(!err){
            
                cb(null, data);
            
            }else{
            
                myServer.ErrorHandler.type1(err);
            }
        });
    }
}