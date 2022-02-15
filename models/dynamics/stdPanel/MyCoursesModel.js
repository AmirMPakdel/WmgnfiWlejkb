import myServer from "@/utils/myServer";

export default class MyCoursesModel{
    
    /**
    * 
    * @param {object} params
    * @param {import("@/models/jsdoc/RequestCallback").RequestCallback} cb 
    */
    getMyCourses(params, cb){
    
        if(env.MOCKING_SERVER || 1){
            setTimeout(()=>{
                cb(null, {
                    result_code:env.SC.SUCCESS,
                    data: fakeMyCourseData,
                });
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