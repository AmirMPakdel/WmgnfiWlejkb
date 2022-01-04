import myServer from "@/utils/myServer";

export default class EditCourseIntroVideoModel{
    
    /**
    * 
    * @param {object} params
    * @param {import("../../jsdoc/RequestCallback").RequestCallback} cb 
    */
     getUploadKey(params, cb){
    
        if(env.MOCKING_SERVER){
            setTimeout(()=>{
                cb(null, {
                    result_code:env.SC.SUCCESS,
                    data:{
                        upload_key:"1j230j34n5434k5j3o4jjr43ijr"
                    }
                });
            }, 2000, cb);
            return;
        }
    
        myServer.Post(myServer.urls.UPLOAD_GET_UPLOAD_KEY, params, {}, (err, data)=>{
    
            if(!err){
            
                cb(null, data);
            
            }else{
            
                myServer.ErrorHandler.type1(err);
            }
        });
    }
    
    
    /**
    * 
    * @param {object} params
    * @param {import("../../jsdoc/RequestCallback").RequestCallback} cb 
    */
    checkUploadKey(params, cb){
    
        if(env.MOCKING_SERVER){
            setTimeout(()=>{
                cb(null, {
                    result_code:env.CSC.SUCCESS,
                    data:{
                        upload_id: 23,
                        upload_key:"1j230j34n5434k5j3o4jjr43ijr",
                        info:{

                        }
                    }
                });
            }, 2000, cb);
            return;
        }
    
        myServer.Post(myServer.urls.UPLOAD_COVERTOR_CHECK, params, {}, (err, data)=>{
    
            if(!err){
            
                cb(null, data);
            
            }else{
            
                myServer.ErrorHandler.type1(err);
            }
        });
    }

    /**
    * 
    * @param {object} params
    * @param {import("../../jsdoc/RequestCallback").RequestCallback} cb 
    */
    uploadFile(params, cb){
    
        if(env.MOCKING_SERVER){
            setTimeout(()=>{
                cb(null, {
                    result_code:env.CSC.SUCCESS,
                });
            }, 2000, cb);
            return;
        }
    
        myServer.Post(myServer.urls.UPLOAD_FILE_TO_CONVERTOR, params, {formData:true}, (err, data)=>{
    
            if(!err){
            
                cb(null, data);
            
            }else{
            
                myServer.ErrorHandler.type1(err);
            }
        });
    }

    /**
    * 
    * @param {object} params
    * @param {import("../../jsdoc/RequestCallback").RequestCallback} cb 
    */
    save(params, cb){
    
        if(env.MOCKING_SERVER){
            setTimeout(()=>{
                cb(null, {
                    result_code:env.CSC.SUCCESS,
                });
            }, 2000, cb);
            return;
        }
    
        let url = "";

        if(params.file_state == "ufs_new"){
            url = env.EP.EDIT_PARAM_COURSE_INTRO_VIDEO_ADD
        }else{
            url = env.EP.EDIT_PARAM_COURSE_INTRO_VIDEO_UPDATE
        }

        myServer.Post(myServer.urls.COURSE_EDIT+url, params, {}, (err, data)=>{
    
            if(!err){
            
                cb(null, data);
            
            }else{
            
                myServer.ErrorHandler.type1(err);
            }
        });
    }
}