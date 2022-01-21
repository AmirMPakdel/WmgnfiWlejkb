import myServer from "@/utils/myServer";

export default class MyCoursesModel{
    
    /**
    * 
    * @param {object} params
    * @param {import("@/models/jsdoc/RequestCallback").RequestCallback} cb 
    */
    getCourses(params, cb){
    
        if(env.MOCKING_SERVER){
            setTimeout(()=>{
                cb(null, {result_code:env.SC.SUCCESS});
            }, 2000, cb);
            return;
        }

        let url_params = params.chunk_count+"/"+params.page_count;
        params.chunk_count = undefined;
        params.page_count = undefined;
    
        myServer.Post(myServer.urls.MY_COURSES_FETCH+url_params, params, {}, (err, data)=>{
    
            if(!err){
            
                cb(null, data);
            
            }else{
            
                myServer.ErrorHandler.type1(err);
            }
        });
    }
    
    
}