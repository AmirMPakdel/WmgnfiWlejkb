import myServer from "@/utils/myServer";
import Storage from "@/utils/storage";

export default class EditProfileModel{
    
    /**
    * @param {object} params
    * @param {import("@/models/jsdoc/RequestCallback").RequestCallback} cb 
    */
    getProfile(params, cb){
    
        if(env.MOCKING_SERVER){
            setTimeout(()=>{
                cb(null, {result_code:env.SC.SUCCESS});
            }, 2000, cb);
            return;
        }

        let student = Storage.get("student");
    
        cb(null, {
            result_code:env.SC.SUCCESS,
            data: student,
        });
    }

    /**
    * 
    * @param {object} params
    * @param {import("@/models/jsdoc/RequestCallback").RequestCallback} cb 
    */
    updateProfile(params, cb){
    
        if(env.MOCKING_SERVER){
            setTimeout(()=>{
                cb(null, {result_code:env.SC.SUCCESS});
            }, 2000, cb);
            return;
        }
    
        myServer.Post(myServer.urls.STD_UPDATE_PROFILE, params, {}, (err, data)=>{
    
            if(!err){
            
                cb(null, data);
            
            }else{
            
                myServer.ErrorHandler.type1(err);
            }
        });
    }
}