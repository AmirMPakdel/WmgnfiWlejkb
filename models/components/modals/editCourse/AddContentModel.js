import myServer from "@/utils/myServer";

export default class AddContentModel{
    
    /**
    * 
    * @param {object} params
    * @param {import("@/models/jsdoc/RequestCallback").RequestCallback} cb 
    */
    create(params, cb){
    
        if(env.MOCKING_SERVER){
            setTimeout(()=>{
                cb(null, {result_code:env.SC.SUCCESS});
            }, 2000, cb);
            return;
        }
    
        myServer.Post(myServer.urls.SOME_URL, params, {}, (err, data)=>{
    
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
    * @param {import("@/models/jsdoc/RequestCallback").RequestCallback} cb 
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
    * @param {import("@/models/jsdoc/RequestCallback").RequestCallback} cb 
    */
     checkUploadKey(params, cb){
    
        if(env.MOCKING_SERVER){
            setTimeout(()=>{
                cb(null, {
                    result_code:env.CSC.SUCCESS,
                    data:{
                        upload_id: 23,
                        upload_key:"1j230j34n5434k5j3o4jjr43ijr",
                        info:{}
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
    * @param {import("@/models/jsdoc/RequestCallback").RequestCallback} cb 
    */
    uploadFile(params, onUploadProgress, cb){
    
        if(env.MOCKING_SERVER){
            setTimeout(()=>{
                cb(null, {
                    result_code:env.CSC.SUCCESS,
                });
            }, 2000, cb);
            return;
        }
    
        myServer.Post(myServer.urls.UPLOAD_FILE_TO_CONVERTOR, params, {formData:true, onUploadProgress}, (err, data)=>{
    
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
    * @param {import("@/models/jsdoc/RequestCallback").RequestCallback} cb 
    */
    save(params, cb){
    
        let EP = fileType2EP(params.type);

        params.type = undefined;

        if(env.MOCKING_SERVER){
            setTimeout(()=>{
                cb(null, {
                    result_code:env.CSC.SUCCESS,
                });
            }, 2000, cb);
            return;
        }
    
        myServer.Post(myServer.urls.COURSE_EDIT+EP, params, {}, (err, data)=>{
    
            if(!err){
            
                cb(null, data);
            
            }else{
            
                myServer.ErrorHandler.type1(err);
            }
        });
    }
}

function fileType2EP(type){

    switch(type){
        case "video":{
            return env.EP.EDIT_PARAM_CONTENT_VIDEO_ADD;
        }
        case "audio":{
            return env.EP.EDIT_PARAM_CONTENT_VOICE_ADD;
        }
        case "text":{
            return env.EP.EDIT_PARAM_CONTENT_DOCUMENT_ADD;
        }
    }
}