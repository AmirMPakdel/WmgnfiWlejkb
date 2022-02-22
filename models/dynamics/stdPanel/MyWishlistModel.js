import myServer from "@/utils/myServer";

export default class MyWishlistModel{
    
    /**
    * 
    * @param {object} params
    * @param {import("@/models/jsdoc/RequestCallback").RequestCallback} cb 
    */
    getMyWishlist(params, cb){
    
        if(env.MOCKING_SERVER){
            setTimeout(()=>{
                cb(null, {
                    result_code:env.SC.SUCCESS,
                    data: getFakeMyCourseData(42),
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

const getFakeMyCourseData=(number, page, per_page)=>{
    let list = [];
    for(let i=0; i<10; i++){
        list.push({
            id: number - i,
            logo: "620bf70c653919.06551221",
            title: "دروه آموزش ساخت بازی ویدیویی با unreal engine",
        });
    }
    return {
        list,
        total:number
    };
}