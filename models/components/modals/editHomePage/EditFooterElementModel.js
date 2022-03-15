import myServer from "@/utils/myServer";

export default class EditFooterElementModel{
    
    /**
    * @param {object} params
    * @param {import("@/models/jsdoc/RequestCallback").RequestCallback} cb 
    */
    save(params, cb){
    
        if(env.MOCKING_SERVER){
            setTimeout(()=>{
                cb(null, {result_code:env.SC.SUCCESS});
            }, 2000, cb);
            return;
        }
    
        myServer.Post(myServer.urls.DASH_EDIT_HOMEPAGE+env.EP.EDIT_PARAM_FOOTER_LINKS, params, {}, (err, data)=>{
    
            if(!err){
            
                cb(null, data);
            
            }else{
            
                myServer.ErrorHandler.type1(err);
            }
        });
    }
    
    
}