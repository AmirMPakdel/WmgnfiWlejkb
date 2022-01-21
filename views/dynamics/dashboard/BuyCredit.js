import BuyCreditController from "@/controllers/dynamics/dashboard/BuyCreditController";
import AmountSelection from "@/views/components/buyCredit/AmountSelection";
import PaymentTypeSelection from "@/views/components/buyCredit/PaymentTypeSelection";
import UserAmountInput from "@/views/components/buyCredit/UserAmountInput";
import Loading from "@/views/components/global/Loading";
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
            user_input: true,
        }
    }
    
    componentDidMount(){
        this.controller.initialize();
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

                        <PaymentTypeSelection
                        parent={this}
                        ref={r=>this.PaymentTypeSelection=r}/>
                        
                        <AmountSelection
                        parent={this}
                        ref={r=>this.AmountSelection=r}/>

                        <UserAmountInput
                        parent={this}
                        ref={r=>this.AmountSelection=r}/>

                    </div>
                }
            </EducatorDashboardLayout>
        )
    }
}