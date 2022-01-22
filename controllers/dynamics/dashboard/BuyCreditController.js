import BuyCreditModel from "@/models/dynamics/dashboard/BuyCreditModel";
import BuyCredit from "@/views/dynamics/dashboard/BuyCredit";

export default class BuyCreditController{
    
    /**@param {BuyCredit} view*/
    constructor(view){
        this.view = view;
        this.model = new BuyCreditModel();
    }
    
    initialize=()=>{
        this.model.getBaseData({}, (err, data)=>{

            if(data.result_code===env.SC.SUCCESS){

                let d = data.data;
                this.view.setState({
                    loading: false,
                    credit: d.credit,
                    incomes: d.incomes,
                    daily_expense: d.daily_expense,
                    portals: d.portals,
                });
            }
        });
    }
    
}