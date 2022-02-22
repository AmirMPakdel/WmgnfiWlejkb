import myServer from "@/utils/myServer";

export default class MyWishlistModel{
    
    /**
    * 
    * @param {object} params
    * @param {import("@/models/jsdoc/RequestCallback").RequestCallback} cb 
    */
    getMyWishlist(params, cb){
    
        if(env.MOCKING_SERVER || 1){
            setTimeout(()=>{
                cb(null, {
                    result_code:env.SC.SUCCESS,
                    data: fakeMyCourseData,
                });
            }, 2000, cb);
            return;
        }

        let url_params = params.chunk_count+"/"+params.page_count;
        params.chunk_count = undefined;
        params.page_count = undefined;
    
        myServer.Post(myServer.urls.STD_WISHLIST+url_params, params, {}, (err, data)=>{
    
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
            title:"دوره کامل آموزش طراحی با فیگما و ادوبی اکس دی سیر تا پیاز",
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