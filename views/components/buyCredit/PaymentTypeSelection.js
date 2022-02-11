import { Radio } from "node_modules/antd/lib/index";
import React, { Component } from "react";
import styles from "./PaymentTypeSelection.module.css";
import BuyCredit from "@/views/dynamics/dashboard/BuyCredit";
import { priceFormat } from "@/utils/price";

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
            if(p.state.payment_type==1){
                p.AmountSelection.scrollInto();
            }else{
                //TODO: after added the exchange feature
            }
        });
    }
    
    render(){

        let p = this.props.parent;
        let ps = p.state;

        return(
            <div className={styles.con+" md_card_shd bgw"}>

                <div ref={r=>this.anchor=r} style={{position:"absolute",top:"-6rem"}}/>

                <div className={styles.title+" tilt md_card_shd bglc1"}>{"نوع پرداخت"}</div>

                <div className={styles.wrapper1}>

                    <div className={styles.credit_sec+" bdyt"}>{"مقدار اعتبار باقی مانده : "}<span className="ftc2 bdyt">{priceFormat(ps.credit)+" تومان"}</span></div>
                    
                    <div className={styles.credit_sec+" bdyt"}>{"مقدار صندوق درآمد : "}<span className="ftc2 bdyt">{priceFormat(ps.incomes)+" تومان"}</span></div>

                </div>

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