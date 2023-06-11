import { Radio } from "node_modules/antd/lib/index";
import React, { Component } from "react";
import styles from "./AmountSelection.module.css";
import BuyCredit from "@/views/dynamics/dashboard/BuyCredit";
import { priceFormat } from "@/utils/price";

/**
* Props of AmountSelection Component
* @typedef Props
* @property {string} className
* @property {React.CSSProperties} style
* @property {BuyCredit} parent
* 
* @extends {Component<Props>}
*/
export default class AmountSelection extends Component {
    
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
    
    onAmount=(amount)=>{
        let p = this.props.parent;
        p.setState({amount, user_input: false}, ()=>{

            if(p.state.payment_type==1){
                p.PortalSelection.scrollInto();
            }else{
                p.ConfirmBtn.centerize();
            }

            p.continueCheck();
        });
    }

    onAmountInput=()=>{
        let p = this.props.parent;
        p.setState({user_input: true, amount:0}, ()=>{

            p.UserAmountInput.scrollInto();
        });
    }
    
    render(){

        let p = this.props.parent;
        let ps = p.state;

        return(
            <div className={styles.con+" md_card_shd bgw"} ref={r=>this.con=r}>

                <div ref={r=>this.anchor=r} style={{position:"absolute",top:"-6rem"}}/>

                <div className={styles.title+" tilt md_card_shd bglc1"}>{"انتخاب مبلغ"}</div>

                {
                    generatePrices(ps.payment_type, ps.incomes).map((v,i)=>(

                        <div key={i} className={styles.item_con+" amp_btn "+((ps.amount==v)?"tbc2 ":"blc2 ")}
                        onClick={()=>this.onAmount(v)}>

                            <Radio checked={ps.amount == v}/>

                            <div className={styles.item_text+" bdyt"}>{priceFormat(v)+" تومان"}</div>

                        </div>
                    ))
                }
                
                <div className={styles.item_con+" amp_btn "+((ps.user_input)?"tbc2 ":"blc2 ")}
                onClick={this.onAmountInput}>

                    <Radio checked={ps.user_input}/>

                    <div className={styles.item_text+" bdyt"}>{"مبلغ دلخواه"}</div>

                </div>

            </div>
        )
    }
}

const generatePrices = (type, maxAmount)=>{

    if(type==1){

        return env.CREDIT_BUY_AMOUNTS;

    }else if(type==2){
        
        return env.CREDIT_BUY_AMOUNTS.filter(v=>v<maxAmount);
    }
}