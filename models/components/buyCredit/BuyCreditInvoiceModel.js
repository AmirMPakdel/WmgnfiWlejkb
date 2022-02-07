import myServer from "@/utils/myServer";

export default class BuyCreditInvoiceModel{
    
    /**
    * 
    * @param {object} params
    * @param {import("@/models/jsdoc/RequestCallback").RequestCallback} cb 
    */
     pay(params){

        myServer.Get(myServer.urls.PAY_FOR_PRODUCT, {params}, (err, data)=>{

            if(!err){
            
                console.log(data);
            
            }else{
            
                myServer.ErrorHandler.type1(err);
            }
        });
    }
}