import myServer from "@/utils/myServer";

export default class DeleteContentModel{
    
    /**
    * 
    * @param {object} params
    * @param {import("../../jsdoc/RequestCallback").RequestCallback} cb 
    */
    delete(params, content_type, cb){

        let EP = fileType2EP(content_type);
    
        if(env.MOCKING_SERVER){
            setTimeout(()=>{
                cb(null, {result_code:env.SC.SUCCESS});
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
        case env.CT.CONTENT_TYPE_VIDEO:{
            return env.EP.EDIT_PARAM_CONTENT_VIDEO_DELETE;
        }
        case env.CT.CONTENT_TYPE_VOICE:{
            return env.EP.EDIT_PARAM_CONTENT_VOICE_DELETE;
        }
        case env.CT.CONTENT_TYPE_DOCUMENT:{
            return env.EP.EDIT_PARAM_CONTENT_DOCUMENT_DELETE;
        }
    }
}