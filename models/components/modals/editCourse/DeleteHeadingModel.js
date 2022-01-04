import myServer from "@/utils/myServer";

export default class DeleteHeadingModel{
    
    /**
    * 
    * @param {object} params
    * @param {import("../../jsdoc/RequestCallback").RequestCallback} cb 
    */
    delete(params, cb){
    
        if(env.MOCKING_SERVER){
            setTimeout(()=>{
                cb(null, {result_code:env.SC.SUCCESS});
            }, 2000, cb);
            return;
        }
    
        myServer.Post(myServer.urls.COURSE_EDIT+env.EP.EDIT_PARAM_COURSE_HEADING_DELETE, params, {}, (err, data)=>{
    
            if(!err){
            
                cb(null, data);
            
            }else{
            
                myServer.ErrorHandler.type1(err);
            }
        });
    }
    
    
}