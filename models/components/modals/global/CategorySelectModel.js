import myServer from "@/utils/myServer";
import Storage from "@/utils/storage";

export default class CategorySelectModel{
    
    /**
    * @param {object} params
    * @param {import("@/models/jsdoc/RequestCallback").RequestCallback} cb 
    */
    getCategories(params, cb){
    
        if(env.MOCKING_SERVER){
            setTimeout(()=>{
                cb(null, {result_code:env.SC.SUCCESS});
            }, 2000, cb);
            return;
        }
    
        let categories = Storage.get("categories");
        if(categories && !categories.shouldUpdate){

            cb(null, {
                result_code: env.SC.SUCCESS,
                data: categories,
            });

            return;
        }
    
        myServer.Get(myServer.urls.GET_COURSE_CATEGORIES, {}, (err, data)=>{
    
            if(!err){
            
                Storage.store("categories", data.data);
                cb(null, data);
            
            }else{
            
                myServer.ErrorHandler.type1(err);
            }
        });
    }
    
    
}