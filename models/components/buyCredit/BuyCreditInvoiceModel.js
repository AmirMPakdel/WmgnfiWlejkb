import myServer from "@/utils/myServer";

export default class BuyCreditInvoiceModel{
    
    /**
    * 
    * @param {object} params
    * @param {import("@/models/jsdoc/RequestCallback").RequestCallback} cb 
    */
     pay(params, cb){

        myServer.Post(myServer.urls.CREATE_TRANSACTION, params, {}, (err, data)=>{

            if(!err){
                
                cb(null, data);
            
            }else{
            
                myServer.ErrorHandler.type1(err);
            }
        });
    }
}