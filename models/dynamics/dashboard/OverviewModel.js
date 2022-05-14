import myServer from "@/utils/myServer";

export default class OverviewModel{
    
    /**
    * @param {object} params
    * @param {import("@/models/jsdoc/RequestCallback").RequestCallback} cb 
    */
    getBaseOverviewData(params, cb){
    
        if(env.MOCKING_SERVER){
            setTimeout(()=>{
                cb(null, {result_code:env.SC.SUCCESS, data:fakeBaseData});
            }, 2000, cb);
            return;
        }
    
        myServer.Post(myServer.urls.DASH_OVERVIEW_BASE, params, {}, (err, data)=>{
    
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
    getOverviewChartData(params, cb){
    
        if(env.MOCKING_SERVER || 1){
            setTimeout(()=>{
                cb(null, {result_code:env.SC.SUCCESS, data:convertChartData(fakeChartData)});
            }, 2000, cb);
            return;
        }
    
        myServer.Post(myServer.urls.DASH_OVERVIEW_CHART, params, {}, (err, data)=>{
    
            if(!err){
            
                cb(null, data);
            
            }else{
            
                myServer.ErrorHandler.type1(err);
            }
        });
    }
}

function convertChartData(raw) {
    
    let data = [];
    let key_arr = Object.keys(raw);
    key_arr.forEach(k=>{

        data.push({
            name: k,
            درآمد: raw[k].price,
        });
    });

    return data;
}

const fakeBaseData={
    total_income: 6590000,
    total_sell_count: 1256,
    total_courses_count: 12,
    daily_cost: 86000,
    remaining_days: 64,
}

const fakeChartData={
    "01/01": {
        price:220000,
        created_at:"01/01",
    },
    "01/02": {
        price:180000,
        created_at:"01/02",
    },
    "01/03": {
        price:332000,
        created_at:"01/03",
    },
    "01/04": {
        price:60000,
        created_at:"01/04",
    },
    "01/05": {
        price:486000,
        created_at:"01/05",
    },
    "01/06": {
        price:72000,
        created_at:"01/06",
    },
    "01/07": {
        price:540000,
        created_at:"01/07",
    },
    "01/08": {
        price:495000,
        created_at:"01/08",
    },
    "01/09": {
        price:1124000,
        created_at:"01/09",
    },
}