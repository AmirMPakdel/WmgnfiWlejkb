import myServer from "@/utils/myServer";

export default class EditableElementCardModel{
    
    /**
    * 
    * @param {object} params
    * @param {import("@/models/jsdoc/RequestCallback").RequestCallback} cb 
    */
    Delete(params, cb){
    
        if(env.MOCKING_SERVER){
            setTimeout(()=>{
                cb(null, {result_code:env.SC.SUCCESS});
            }, 2000, cb);
            return;
        }

        let el_type = params.element.el_type;

        let ep = "";
        if(el_type === 3){
            ep = env.EP.EDIT_PARAM_COURSE_LIST_DELETE;
            params.list_id = params.element.id;
        }else if(el_type === 4){
            ep = env.EP.EDIT_PARAM_MAIN_INFO_BOX_DELETE;
            params.content_id = params.element.id;
        }

        delete params.element;
    
        myServer.Post(myServer.urls.DASH_EDIT_HOMEPAGE+ep, params, {}, (err, data)=>{
    
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
    toggleVisibility(params, cb){
    
        if(env.MOCKING_SERVER){
            setTimeout(()=>{
                cb(null, {result_code:env.SC.SUCCESS});
            }, 1000, cb);
            return;
        }
    
        let ep;
        if(params.el_type == 3){
            ep = "ep_content_main_course_list_toggle_visibility";
        }else if(params.el_type == 4){
            ep = "ep_content_main_box_info_toggle_visibility";
        }

        myServer.Post(myServer.urls.COURSE_EDIT+ep, params, {}, (err, data)=>{
    
            if(!err){
            
                cb(null, data);
            
            }else{
            
                myServer.ErrorHandler.type1(err);
            }
        });
    }
}