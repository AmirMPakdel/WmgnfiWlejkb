import myServer from "@/utils/myServer";

export default class FinancialReportsModel{
    
    /**
    * @param {object} params
    * @param {import("@/models/jsdoc/RequestCallback").RequestCallback} cb 
    */
    getSellReport(params, cb){
    
        if(env.MOCKING_SERVER || 1){
            setTimeout(()=>{
                cb(null, {result_code:env.SC.SUCCESS, data:FakeSellReportData(20)});
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
    
    /**
    * @param {object} params
    * @param {import("@/models/jsdoc/RequestCallback").RequestCallback} cb 
    */
    getCreditBought(params, cb){
    
        if(env.MOCKING_SERVER || 1){
            setTimeout(()=>{
                cb(null, {result_code:env.SC.SUCCESS, data:FakeCreditBoughtData(20)});
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

    /**
    * @param {object} params
    * @param {import("@/models/jsdoc/RequestCallback").RequestCallback} cb 
    */
    getCreditUsed(params, cb){
    
        if(env.MOCKING_SERVER || 1){
            setTimeout(()=>{
                cb(null, {result_code:env.SC.SUCCESS, data:FakeCreditUsageData(20)});
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

const FakeSellReportData = (num)=>{

    let list = [];
    for(let i=num; i>0; i--){
        list.push({
            id: i,
            title:"فروش دوره ریاضی و هندسه 2 کنکور",
            date: "01/04/28",
            amount: 640000
        })
    }
    return {
        list,
        total: 100,
    }
}

const FakeCreditBoughtData = (num)=>{

    let list = [];
    for(let i=num; i>0; i--){
        list.push({
            id: i,
            title:"خرید اینترنتی",
            date: "01/04/28",
            amount: 420000
        })
    }
    return {
        list,
        total: 100,
    }
}

const FakeCreditUsageData = (num)=>{

    let list = [];
    for(let i=num; i>0; i--){
        list.push({
            id: i,
            title:"هزینه روزانه",
            date: "01/04/28",
            amount: 420000
        })
    }
    return {
        list,
        total: 100,
    }
}