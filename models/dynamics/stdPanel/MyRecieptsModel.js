import myServer from "@/utils/myServer";

export default class MyRecieptsModel{
    
    /**
    * 
    * @param {object} params
    * @param {import("@/models/jsdoc/RequestCallback").RequestCallback} cb 
    */
    getMyReciepts(params, cb){
    
        if(env.MOCKING_SERVER || 1){
            setTimeout(()=>{
                cb(null, {
                    result_code:env.SC.SUCCESS,
                    data:{
                        total:83,
                        list: getFakeRecieptsList(20),
                    }
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

const getFakeRecieptsList=(number)=>{
    let list = [];
    for(let i=0; i<number; i++){
        list.push({
            id: number - i,
            order_id: 1242 - i,
            date: "1400/02/15-13:20",
            price: 460000,
            success: true,
        })
    }
    return list;
}