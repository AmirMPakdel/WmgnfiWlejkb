import BuyCreditInvoiceModel from "@/models/components/buyCredit/BuyCreditInvoiceModel";
import { getCookie } from "@/utils/cookie";
import myServer from "@/utils/myServer";
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
            redirect_url:"http://localhost:3000/transaction/userBuyCredit"
        }

        this.model.pay(params, (err, data)=>{

            if(data.result_code === env.SC.SUCCESS){

                let d = data.data;
                console.log(d);
                window.location.href = myServer.urls.OPEN_TRANSACTION_PORTAL+
                `?transaction_id=${d.id}&`+
                `tenant=${getCookie(env.TENANT_KEY)}&`+
                `token=${getCookie(env.TOKEN_KEY)}`
            }
        });
    }
    
}