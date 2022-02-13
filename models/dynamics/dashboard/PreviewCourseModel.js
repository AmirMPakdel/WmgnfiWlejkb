import myServer from "@/utils/myServer";

export default class PreviewCourseModel{
    
    /**
    * 
    * @param {object} params
    * @param {import("@/models/jsdoc/RequestCallback").RequestCallback} cb 
    */
     getCourse(params, cb){
    
        if(env.MOCKING_SERVER){
            setTimeout(()=>{
                cb(null, {result_code:env.SC.SUCCESS});
            }, 2000, cb);
            return;
        }
    
        myServer.Post(myServer.urls.COURSE_FETCH, params, {}, (err, data)=>{
    
            if(!err){

                if(!data.data.intro_video){
                    data.data.intro_video = {};
                }
            
                cb(null, data);
            
            }else{
            
                myServer.ErrorHandler.type1(err);
            }
        });
    }
    
    
}