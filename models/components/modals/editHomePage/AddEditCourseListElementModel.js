import myServer from "@/utils/myServer";

export default class AddEditCourseListElementModel{
    
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

        let ep = env.EP.EDIT_PARAM_COURSE_LIST_ADD;
        if(params.mode==="edit"){
            ep = env.EP.EDIT_PARAM_COURSE_LIST_UPDATE;
        }

        delete params.mode;
    
        myServer.Post(myServer.urls.DASH_EDIT_HOMEPAGE+ep, params, {}, (err, data)=>{
    
            if(!err){
            
                cb(null, data);
            
            }else{
            
                myServer.ErrorHandler.type1(err);
            }
        });
    }
    
    
}