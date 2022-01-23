import BuyCreditController from "@/controllers/dynamics/dashboard/BuyCreditController";
import AmountSelection from "@/views/components/buyCredit/AmountSelection";
import BuyCreditInvoice from "@/views/components/buyCredit/BuyCreditInvoice";
import PaymentTypeSelection from "@/views/components/buyCredit/PaymentTypeSelection";
import PortalSelection from "@/views/components/buyCredit/PortalSelection";
import UserAmountInput from "@/views/components/buyCredit/UserAmountInput";
import Loading from "@/views/components/global/Loading";
import MainButton from "@/views/components/global/MainButton";
import EducatorDashboardLayout from "@/views/layouts/EducatorDashboardLayout";
import React, { Component } from "react";
import styles from "./BuyCredit.module.css";

/**
* Props of BuyCredit Component
* @typedef Props
* @property {string} className
* @property {React.CSSProperties} style
* 
* @extends {Component<Props>}
*/
export default class BuyCredit extends Component {
    
    constructor(props){
        super(props);
        this.controller = new BuyCreditController(this);
        this.state = {
            loading: true,
            credit: 0,
            incomes: 0,
            daily_expense: 0,
            payment_type: 1,
            amount: 0,
            user_input: false,
            portals:[],
            selected_portal: null,
            show_invoice: false,
        }
    }
    
    componentDidMount(){
        this.controller.initialize();
    }

    onConfirm=()=>{
        this.controller.onConfirm();
    }
    
    render(){
        return(
            <EducatorDashboardLayout>
                {
                    this.state.loading?
                    <div className={styles.loading_con}>
                        <Loading/>
                    </div>
                    :
                    <div className={styles.con}>
                        
                        {
                            !this.state.show_invoice?
                            <>
                                <PaymentTypeSelection
                                parent={this}
                                ref={r=>this.PaymentTypeSelection=r}/>
                                
                                <AmountSelection
                                parent={this}
                                ref={r=>this.AmountSelection=r}/>

                                {
                                    this.state.user_input?
                                    <UserAmountInput
                                    parent={this}
                                    ref={r=>this.UserAmountInput=r}/>
                                    :null
                                }
                                {
                                    this.state.payment_type==1?
                                    <PortalSelection
                                    parent={this}
                                    ref={r=>this.PortalSelection=r}/>
                                    :null
                                }
                                
                                <div className={styles.btn_wrapper}>

                                    <MainButton
                                    ref={r=>this.ConfirmBtn=r}
                                    className={styles.confirm_btn}
                                    title="تایید"
                                    onClick={this.onConfirm}/>

                                </div>
                            
                            </>:
                            <BuyCreditInvoice
                            parent={this}
                            ref={r=>this.BuyCreditInvoice=r}/>
                        }

                    </div>
                }
            </EducatorDashboardLayout>
        )
    }
}