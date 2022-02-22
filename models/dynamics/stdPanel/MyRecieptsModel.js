import myServer from "@/utils/myServer";

export default class MyRecieptsModel{
    
    /**
    * 
    * @param {object} params
    * @param {import("@/models/jsdoc/RequestCallback").RequestCallback} cb 
    */
    getMyReciepts(params, cb){
    
        if(env.MOCKING_SERVER){
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

        let url_params = params.chunk_count+"/"+params.page_count;
        params.chunk_count = undefined;
        params.page_count = undefined;
    
        myServer.Post(myServer.urls.STD_RECIEPTS+url_params, params, {}, (err, data)=>{

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