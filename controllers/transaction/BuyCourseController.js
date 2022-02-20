import BuyCourseModel from "@/models/dynamics/transaction/BuyCourseModel";
import { getParamByName } from "@/utils/helpers";
import BuyCourse from "@/views/dynamics/transaction/BuyCourse";

export default class BuyCourseController{
    
    /**@param {BuyCourse} view*/
    constructor(view){
        this.view = view;
        this.model = new BuyCourseModel();
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