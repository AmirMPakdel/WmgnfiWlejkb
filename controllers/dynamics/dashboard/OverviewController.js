import OverviewModel from "@/models/dynamics/dashboard/OverviewModel";
import Overview from "@/views/dynamics/dashboard/Overview";

export default class OverviewController{
    
    /**@param {Overview} view*/
    constructor(view){
        this.view = view;
        this.model = new OverviewModel();
    }
    
    loadBaseData(cb){

        let v = this.view;
        v.setState({loading:true});

        this.model.getBaseOverviewData({}, (err, data)=>{

            if(data.result_code === env.SC.SUCCESS){

                let d = data.data;
                v.setState({
                    loading:false,
                    total_income:d.total_income,
                    total_sell_count:d.total_sell_count,
                    total_courses_count:d.total_courses_count,
                    daily_cost:d.daily_cost,
                    remaining_days:d.remaining_days,
                }, cb);
            }
        });

        this.setupPageTitle();
    }

    setupPageTitle(){
        
        document.title = "وضعیت و آمار سایت "+" | داشبورد کاربر"+" | مینفو";
    }

    loadChartData(){

        let v = this.view;
        v.setState({chart_data: null});

        let params = {
            filter: "icf_month" //enum(icf_all|icf_year|icf_month|icf_week)
        }

        this.model.getOverviewChartData(params, (err, data)=>{

            if(data.result_code === env.SC.SUCCESS){

                console.log(data.data);

                v.setState({chart_data: data.data});
            }
        })
    }
    
}