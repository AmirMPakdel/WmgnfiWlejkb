import myServer from "@/utils/myServer";

export default class MyCoursesModel{
    
    /**
    * 
    * @param {object} params
    * @param {import("@/models/jsdoc/RequestCallback").RequestCallback} cb 
    */
    getMyCourses(params, cb){
    
        
        if(env.MOCKING_SERVER){
            setTimeout(()=>{
                cb(null, {result_code:env.SC.SUCCESS});
            }, 2000, cb);
            return;
        }

        let url_params = params.chunk_count+"/"+params.page_count;
        params.chunk_count = undefined;
        params.page_count = undefined;
    
        myServer.Post(myServer.urls.STD_COURSES_LIST+url_params, params, {}, (err, data)=>{
    
            if(!err){
            
                cb(null, data);
            
            }else{
            
                myServer.ErrorHandler.type1(err);
            }
        });
    }   
}

const fakeMyCourseData = {
    total:3,
    list:[
        {
            id:1,
            title:"دوره کامل آموزش طراحی با فیگما",
            image: "620bf70c653919.06551221",
        },
        {
            id:2,
            title:"دوره کامل آموزش طراحی با فیگما",
            image: "620bf70c653919.06551221",
        },
        {
            id:3,
            title:"دوره کامل آموزش طراحی با فیگما",
            image: "620bf70c653919.06551221",
        }
    ]
}