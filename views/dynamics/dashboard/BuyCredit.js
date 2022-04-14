import BuyCreditController from "@/controllers/dynamics/dashboard/BuyCreditController";
import AmountSelection from "@/views/components/buyCredit/AmountSelection";
import BuyCreditInvoice from "@/views/components/buyCredit/BuyCreditInvoice";
import CommingSoon from "@/views/components/buyCredit/CommingSoon";
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
            user_amount_input:"",
            portals:[],
            selected_portal: {},
            show_invoice: false,
            can_continue:false,
        }
    }
    
    componentDidMount(){
        this.controller.initialize();
    }

    onConfirm=()=>{
        this.controller.onConfirm();
    }

    continueCheck=()=>{
        this.controller.continueCheck();
    }
    
    render(){
        return(
            <EducatorDashboardLayout accessType="userL1"
            showWithoutAuth={false}>
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
                                
                                {
                                    this.state.payment_type==1?
                                    <AmountSelection
                                    parent={this}
                                    ref={r=>this.AmountSelection=r}/>:null
                                }
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
                                {
                                    this.state.payment_type==2?
                                    <CommingSoon/>
                                    :null
                                }
                                {
                                    this.state.payment_type==1?
                                    <div className={styles.btn_wrapper}>

                                    <MainButton
                                    ref={r=>this.ConfirmBtn=r}
                                    className={styles.confirm_btn}
                                    title="تایید"
                                    disabled={!this.state.can_continue}
                                    onClick={this.onConfirm}/>

                                    </div>:null
                                }
                                
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