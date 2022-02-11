import BuyCreditModel from "@/models/dynamics/dashboard/BuyCreditModel";
import Storage from "@/utils/storage";
import BuyCredit from "@/views/dynamics/dashboard/BuyCredit";

export default class BuyCreditController{
    
    /**@param {BuyCredit} view*/
    constructor(view){
        this.view = view;
        this.model = new BuyCreditModel();
    }
    
    initialize=()=>{
        this.model.getPortals(null, (err, data)=>{

            if(data.result_code===env.SC.SUCCESS){

                let d = data.data;
                
                let user = Storage.retrive("user");

                this.view.setState({
                    loading: false,
                    credit: user.m_balance,
                    incomes: user.total_saved_income,
                    portals: d,
                });
            }
        });
    }

    continueCheck=()=>{

        let can = true;
        let v = this.view;
        let vs = v.state;

        if(vs.user_input){

            if(Number(vs.user_amount_input) < env.LIMITS.MIN_CREDIT_BUY_AMOUNT){
                can = false;
            }

        }else{

            if(Number(vs.amount) < env.LIMITS.MIN_CREDIT_BUY_AMOUNT){
                can = false;
            }
        }

        if(!vs.selected_portal || !vs.selected_portal.name){
            can = false;
        }

        v.setState({can_continue:can});
    }

    onConfirm=()=>{

        if(this.view.state.can_continue){
            
            this.view.setState({show_invoice: true}, ()=>{
                window.scrollTo(0,0)
            });
        }
        
    }
    
}