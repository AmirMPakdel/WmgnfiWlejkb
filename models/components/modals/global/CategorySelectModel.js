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
        let update_categories = Storage.get("update_categories");
        
        if(categories && !update_categories){

            cb(null, {
                result_code:env.SC.SUCCESS,
                data: categories,
            });

            return;
        }
    
        myServer.Get(myServer.urls.GET_COURSE_CATEGORIES, {}, (err, data)=>{
    
            if(!err){
            
                Storage.store("update_categories", false);
                Storage.store("categories", data.data);
                cb(null, data);
            
            }else{
            
                myServer.ErrorHandler.type1(err);
            }
        });
    }
    
    
}