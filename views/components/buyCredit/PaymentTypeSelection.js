import { Radio } from "node_modules/antd/lib/index";
import React, { Component } from "react";
import styles from "./PaymentTypeSelection.module.css";
import BuyCredit from "@/views/dynamics/dashboard/BuyCredit";

/**
* Props of PaymentTypeSelection Component
* @typedef Props
* @property {string} className
* @property {React.CSSProperties} style
* @property {BuyCredit} parent
* 
* @extends {Component<Props>}
*/
export default class PaymentTypeSelection extends Component {
    
    constructor(props){
        super(props);
        this.state = {
            
        }
    }
    
    componentDidMount(){
    }

    onPaymentType=(type)=>{
        let p = this.props.parent;
        p.setState({payment_type: type});
    }
    
    render(){

        let p = this.props.parent;
        let ps = p.state;

        return(
            <div className={styles.con+" md_card_shd bglc1"}>

                <div className={styles.title+" tilt md_card_shd bglc1"}>{"نوع پرداخت"}</div>

                <div className={styles.item_con+" blc2 amp_btn"}
                onClick={()=>this.onPaymentType(1)}>
                    <Radio checked={ps.payment_type == 1}/>
                    <div className={styles.item_text+" bdyt"}>{"خرید اینترنتی"}</div>
                </div>

                <div className={styles.item_con+" blc2 amp_btn"}
                onClick={()=>this.onPaymentType(2)}>
                    <Radio checked={ps.payment_type == 2}/>
                    <div className={styles.item_text+" bdyt"}>{"صندوق درآمد"}</div>
                </div>
                
            </div>
        )
    }
}