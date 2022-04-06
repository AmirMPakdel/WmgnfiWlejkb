import SalesReceiptModel from "@/models/dynamics/dashboard/SalesReceiptModel";
import { getUrlPart } from "@/utils/helpers";
import SalesReceipt from "@/views/dynamics/dashboard/SalesReceipt";

export default class SalesReceiptController{
    
    /**@param {SalesReceipt} view*/
    constructor(view){
        this.view = view;
        this.model = new SalesReceiptModel();
    }
    
    load(){

        let params = {
            transaction_id: getUrlPart(3)
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