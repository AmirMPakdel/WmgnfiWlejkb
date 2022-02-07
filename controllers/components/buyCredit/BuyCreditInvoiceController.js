import BuyCreditInvoiceModel from "@/models/components/buyCredit/BuyCreditInvoiceModel";
import BuyCreditInvoice from "@/views/components/buyCredit/BuyCreditInvoice";

export default class BuyCreditInvoiceController{
    
    /**@param {BuyCreditInvoice} view*/
    constructor(view){
        this.view = view;
        this.model = new BuyCreditInvoiceModel();
    }
    
    onConfirm(){

        let params = {
            title:"خرید اعتبار",
            price:100000,
            pt:"pt_incremental",
            prt:"prt_maintenance",
            //value: 10,
            //days: 10,
            portal:"zarinpal",
            redirect_url:"http://localhost/transaction/userBuyCreditSuccess"
        }

        this.model.pay(params);
    }
    
}