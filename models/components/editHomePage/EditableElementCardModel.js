import myServer from "@/utils/myServer";

export default class EditableElementCardModel{
    
    /**
    * 
    * @param {object} params
    * @param {import("@/models/jsdoc/RequestCallback").RequestCallback} cb 
    */
    Delete(params, cb){
    
        if(env.MOCKING_SERVER || 1){
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
    show(params, cb){
    
        if(env.MOCKING_SERVER || 1){
            setTimeout(()=>{
                cb(null, {result_code:env.SC.SUCCESS});
            }, 1000, cb);
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
    hide(params, cb){
    
        if(env.MOCKING_SERVER || 1){
            setTimeout(()=>{
                cb(null, {result_code:env.SC.SUCCESS});
            }, 1000, cb);
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
    
}