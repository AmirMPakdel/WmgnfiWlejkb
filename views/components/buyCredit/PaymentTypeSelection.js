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

    scrollInto=()=>{

        this.anchor.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
            inline: 'nearest'
        });
    }

    onPaymentType=(type)=>{

        let p = this.props.parent;

        p.state.payment_type = type;

        if(type == 2 && p.state.amount > p.state.incomes){

            env.CREDIT_BUY_AMOUNTS.forEach(v=>{
                if(v <= p.state.incomes){
                    p.state.amount = v;
                }
            });
        }

        p.setState(p.state, ()=>{
            p.AmountSelection.scrollInto();
        });
    }
    
    render(){

        let p = this.props.parent;
        let ps = p.state;

        return(
            <div className={styles.con+" md_card_shd bgw"}>

                <div ref={r=>this.anchor=r} style={{position:"absolute",top:"-6rem"}}/>

                <div className={styles.title+" tilt md_card_shd bglc1"}>{"نوع پرداخت"}</div>

                <div className={styles.item_con+" amp_btn "+((ps.payment_type == 1)?"btc2 ":"blc2 ")}
                onClick={()=>this.onPaymentType(1)}>
                    <Radio checked={ps.payment_type == 1}/>
                    <div className={styles.item_text+" bdyt"}>{"خرید اینترنتی"}</div>
                </div>

                <div className={styles.item_con+" amp_btn "+((ps.payment_type == 2)?"btc2 ":"blc2 ")}
                onClick={()=>this.onPaymentType(2)}>
                    <Radio checked={ps.payment_type == 2}/>
                    <div className={styles.item_text+" bdyt"}>{"صندوق درآمد"}</div>
                </div>
                
            </div>
        )
    }
}