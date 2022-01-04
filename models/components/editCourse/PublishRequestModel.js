import myServer from "@/utils/myServer";

export default class PublishRequestModel{
    
    /**
    * 
    * @param {object} params
    * @param {import("../../jsdoc/RequestCallback").RequestCallback} cb 
    */
    sendRequest(params, cb){
    
        if(env.MOCKING_SERVER){
            setTimeout(()=>{
                cb(null, {result_code:env.SC.SUCCESS});
            }, 2000, cb);
            return;
        }
    
        myServer.Post(myServer.urls.COURSE_PUBLISH_REQUEST, params, {}, (err, data)=>{
    
            if(!err){
            
                cb(null, data);
            
            }else{
            
                myServer.ErrorHandler.type1(err);
            }
        });
    }
    
    
}