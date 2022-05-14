import SoldCourseModel from "@/models/dynamics/transaction/SoldCourseModel";
import { getParamByName } from "@/utils/helpers";
import SoldCourse from "@/views/dynamics/transaction/SoldCourse";

export default class SoldCourseController{
    
    /**@param {SoldCourse} view*/
    constructor(view){
        this.view = view;
        this.model = new SoldCourseModel();
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