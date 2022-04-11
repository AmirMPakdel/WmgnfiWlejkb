import myServer from "@/utils/myServer";
import axios from "node_modules/axios/index";

export default class EditSitesIconModel{
    
    /**
    * 
    * @param {object} params
    * @param {import("@/models/jsdoc/RequestCallback").RequestCallback} cb 
    */
    checkImage(params, cb){
        
        axios.get(params.url).then(res=>{
            cb(true);
        }).catch(e=>{
            cb(false);
        });
    }

    /**
    * 
    * @param {object} params
    * @param {import("@/models/jsdoc/RequestCallback").RequestCallback} cb 
    */
    uploadIcon(params, cb){

        if(env.MOCKING_SERVER || 1){
            setTimeout(()=>{
                cb(null, {result_code:env.CSC.SUCCESS});
            }, 2000, cb);
            return;
        }
    
        myServer.Post(myServer.urls.SOMEURL, params, {formData:true}, (err, data)=>{
    
            if(!err){
            
                cb(null, data);
            
            }else{
            
                myServer.ErrorHandler.type1(err);
            }
        });
    }
}