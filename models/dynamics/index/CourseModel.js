import myServer from "@/utils/myServer";

export default class CourseModel{
    
    /**
    * 
    * @param {object} params
    * @param {import("@/models/jsdoc/RequestCallback").RequestCallback} cb 
    */
    getCourse(params, cb){
    
        if(env.MOCKING_SERVER){
            setTimeout(()=>{
                cb(null, {result_code:env.SC.SUCCESS});
            }, 2000, cb);
            return;
        }

    
        myServer.Post(myServer.urls.STD_VIEW_COURSE, params, {}, (err, data)=>{
    
            if(!err){

                if(data.data){

                    if(!data.data.intro_video){
                        data.data.intro_video = {};
                    }
    
                    let contents = contentHeadingSort(data.data);
                
                    data.data.sorted_content = contents;

                }
                
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
    addToWishlist(params, cb){
    
        if(env.MOCKING_SERVER){
            setTimeout(()=>{
                cb(null, {result_code:env.SC.SUCCESS});
            }, 2000, cb);
            return;
        }

        myServer.Post(myServer.urls.STD_ADD_WISHLIST, params, {}, (err, data)=>{
    
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
    removeFromWishlist(params, cb){
    
        if(env.MOCKING_SERVER){
            setTimeout(()=>{
                cb(null, {result_code:env.SC.SUCCESS});
            }, 2000, cb);
            return;
        }
    
        myServer.Post(myServer.urls.STD_REMOVE_WISHLIST, params, {}, (err, data)=>{
    
            if(!err){
            
                cb(null, data);
            
            }else{
            
                myServer.ErrorHandler.type1(err);
            }
        });
    }
}

function contentHeadingSort(course){

    let h = course.headings || [];
    let c = course.contents || [];
    let ch = course.content_hierarchy || "[]";

    let newContent = [];

    ch = JSON.parse(ch);
    ch.forEach(ch_obj=>{

        let h_id = ch_obj.h_id;
        let content_ids = ch_obj.content_ids;

        let newHeading = {};
        let heading_obj = findFromList(h, h_id);

        if(heading_obj){

            newHeading = heading_obj;

            newHeading.contents=[];
            
            content_ids.forEach(c_id=>{

                let content_obj = findFromList(c, c_id);

                if(content_obj){

                    newHeading.contents.push(content_obj);
                }
            });
        }

        newContent.push(newHeading);
    });

    return newContent;
}

function findFromList(list, id) {
    
    let item = null;
    list.forEach((l)=>{

        if(l.id == id){
            item = l;
        }
    });
    return item;
}