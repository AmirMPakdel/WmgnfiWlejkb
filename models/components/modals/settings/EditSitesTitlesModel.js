import myServer from "@/utils/myServer";
import Storage from "@/utils/storage";

export default class EditSitesTitlesModel{
    
    /**
    * @param {object} params
    * @param {import("@/models/jsdoc/RequestCallback").RequestCallback} cb 
    */
    getData(params, cb){
    
        if(env.MOCKING_SERVER){
            setTimeout(()=>{
                cb(null, {result_code:env.SC.SUCCESS});
            }, 2000, cb);
            return;
        }

        let site_info = Storage.get("site_info");

        if(site_info){

            cb(null, site_info);

            return;
        }
    
        myServer.Post(myServer.urls.STD_LOAD_HOMEPAGE, params, {}, (err, data)=>{
    
            if(!err){

                let d = data;
                if(!d.page_title){d.page_title=""};
                if(!d.motto){d.motto=""};
                site_info = {
                    page_title: d.page_title,
                    motto: d.motto,
                }

                Storage.store("site_info", site_info);
            
                cb(null, data);
            
            }else{
            
                myServer.ErrorHandler.type1(err);
            }
        });
    }
    
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
    
        myServer.Post(myServer.urls.DASH_EDIT_HOMEPAGE+env.EP.EDIT_PARAM_TITLE, params, {}, (err, data)=>{
    
            if(!err){
            
                cb(null, data);
            
            }else{
            
                myServer.ErrorHandler.type1(err);
            }
        });
    }
}