import myServer from "@/utils/myServer";

export default class HomePageModel{
    
    /**
    * 
    * @param {object} params
    * @param {import("@/models/jsdoc/RequestCallback").RequestCallback} cb 
    */
    getElements(params, cb){
    
        if(env.MOCKING_SERVER || 1){
            setTimeout(()=>{
                cb(null, {
                    result_code:env.SC.SUCCESS,
                    data:getFakeElements(),
                    });
            }, 1000, cb);
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

const getFakeElements = ()=>{
    return {
        hierarchy:[1,3,4,5,6,2],
        elements:[
            {
                id:1, title:"نمایی کلی و مختصر", type:1, visible:1,
            },
            {
                id:2, title:"اطلاعات سایت و لینک ها", type:2, visible:1,
            },
            {
                id:5, title:"جدیدترین دوره ها", type:3, visible:0,
            },
            {
                id:3, title:"پرفروش ترین دروه ها", type:3, visible:1,
            },
            {
                id:4, title:"همکاری با ما", type:4, visible:1,
            },
            {
                id:6, title:"درباره ما", type:4, visible:1,
            },
        ]
    }
}