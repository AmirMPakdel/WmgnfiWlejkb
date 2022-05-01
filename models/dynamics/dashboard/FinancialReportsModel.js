import myServer from "@/utils/myServer";

export default class FinancialReportsModel{
    
    /**
    * @param {object} params
    * @param {import("@/models/jsdoc/RequestCallback").RequestCallback} cb 
    */
    getFinancialReport(params, cb){
    
        if(env.MOCKING_SERVER || 1){
            setTimeout(()=>{
                cb(null, {result_code:env.SC.SUCCESS, data:FakeReportData(params.filter, 20)});
            }, 2000, cb);
            //return;
        }
    
        myServer.Post(myServer.urls.FINANCIAL_LIST, params, {}, (err, data)=>{
    
            if(!err){
            
                //cb(null, data);
            
            }else{
            
                myServer.ErrorHandler.type1(err);
            }
        });
    }
}

const FakeReportData = (filter, num)=>{

    switch(filter){
        case "rf_sells":
            return FakeSellReportData(num);
        case "rf_increase_m_balacne":
            return FakeCreditBoughtData(num);
        case "rf_decrease_m_balacne":
            return FakeCreditUsageData(num);
    }
}

const FakeSellReportData = (num)=>{

    let list = [];
    for(let i=num; i>0; i--){
        list.push({
            id: i,
            title:"فروش دوره ریاضی و هندسه 2 کنکور",
            created_at: "01/04/28",
            price: 640000
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
            created_at: "01/04/28",
            price: 420000
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
            created_at: "01/04/28",
            price: 420000
        })
    }
    return {
        list,
        total: 100,
    }
}