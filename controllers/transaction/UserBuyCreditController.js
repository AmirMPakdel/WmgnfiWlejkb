import UserBuyCreditModel from "@/models/dynamics/transaction/UserBuyCreditModel";
import { getParamByName } from "@/utils/helpers";
import UserBuyCredit from "@/views/dynamics/transaction/UserBuyCredit";

export default class UserBuyCreditController{
    
    /**@param {UserBuyCredit} view*/
    constructor(view){
        this.view = view;
        this.model = new UserBuyCreditModel();
    }
    
    load(){

        let params = {
            transaction_id: getParamByName("transaction_id")
        }

        this.model.getTransaction(params, (err, data)=>{

            if(data.result_code === env.SC.SUCCESS){

                this.view.setState({
                    loading: false,
                    details: data.data,
                });
            }
        });
    }
    
}