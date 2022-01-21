import myServer from "@/utils/myServer";

export default class EditCourseContentsModel{
    
    /**
    * 
    * @param {object} params
    * @param {import("@/models/jsdoc/RequestCallback").RequestCallback} cb 
    */
    save(params, cb){
    
        params.hierarchy = myContnetnHierarchy2api(params.hierarchy);

        if(env.MOCKING_SERVER){
            setTimeout(()=>{
                cb(null, {result_code:env.SC.SUCCESS});
            }, 2000, cb);
            return;
        }
    
        myServer.Post(myServer.urls.COURSE_EDIT+env.EP.EDIT_PARAM_CONTENT_HIERARCHY, params, {}, (err, data)=>{
    
            if(!err){

                cb(null, data);
            
            }else{
            
                myServer.ErrorHandler.type1(err);
            }
        });
    }
}

function myContnetnHierarchy2api(mych){

    let ch = [];

    mych.children.forEach((v1, i1)=>{

        ch.push({
            h_id: v1.id,
            content_ids: v1.children.map((v2, i2)=>{
                return v2.id
            })
        })

    })

    return ch;
}