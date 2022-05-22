import BuyCreditInvoiceModel from "@/models/components/buyCredit/BuyCreditInvoiceModel";
import { getCookie } from "@/utils/cookie";
import { getTenant } from "@/utils/helpers";
import myServer from "@/utils/myServer";
import Storage from "@/utils/storage";
import BuyCreditInvoice from "@/views/components/buyCredit/BuyCreditInvoice";

export default class BuyCreditInvoiceController{
    
    /**@param {BuyCreditInvoice} view*/
    constructor(view){
        this.view = view;
        this.model = new BuyCreditInvoiceModel();
    }
    
    onConfirm(){
        
        let v = this.view;
        v.setState({confirm_loading:true});
        
        let BuyCredit = v.props.parent;
        let amount = BuyCredit.state.amount;
        if(BuyCredit.state.user_input){
            amount = BuyCredit.state.user_amount_input;
        }

        let params = {
            title:"خرید اعتبار",
            price: amount,
            value: amount,
            pt:"pt_incremental",
            prt:"prt_maintenance",
            portal: BuyCredit.state.selected_portal.name,
            redirect_url: window.location.origin+"/transaction/userBuyCredit",
        }

        this.model.pay(params, (err, data)=>{

            if(data.result_code === env.SC.SUCCESS){

                let user = Storage.get("user");

                user.should_update = true;

                Storage.store("user", user);

                let d = data.data;
                window.location.href = myServer.urls.OPEN_TRANSACTION_PORTAL+
                `?transaction_id=${d.id}&`+
                `tenant=${getTenant()}&`+
                `token=${getCookie(env.TOKEN_KEY)}`
            }
        });
    }
    
}