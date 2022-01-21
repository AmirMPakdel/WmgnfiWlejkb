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
    
    onAmount=(amount)=>{
        let p = this.props.parent;
        p.setState({amount, user_input: false});
    }

    onAmountInput=()=>{
        let p = this.props.parent;
        p.setState({user_input: true, amount:0});
    }
    
    render(){

        let p = this.props.parent;
        let ps = p.state;

        return(
            <div className={styles.con+" md_card_shd bglc1"}>

                <div className={styles.title+" tilt md_card_shd bglc1"}>{"انتخاب مبلغ"}</div>

                {
                    generatePrices(ps.payment_type, ps.incomes).map((v,i)=>(

                        <div key={i} className={styles.item_con+" blc2 amp_btn"}
                        onClick={()=>this.onAmount(v)}>
                            <Radio checked={ps.amount == v}/>
                            <div className={styles.item_text+" bdyt"}>{priceFormat(v)+" تومان"}</div>
                        </div>
                    ))
                }
                
                <div className={styles.item_con+" blc2 amp_btn"}
                onClick={this.onAmountInput}>
                    <Radio checked={ps.user_input}/>
                    <div className={styles.item_text+" bdyt"}>{"مبلغ دلخواه"}</div>
                </div>

            </div>
        )
    }
}

const generatePrices = (type, maxAmount=-1)=>{

    if(type==1){

        return [
            100000,
            200000,
            500000,
            800000,
            1000000,
            1500000,
            2000000,
        ]

    }else if(type==2){
        //TODO: calculate this
        return [
            100000,
            200000,
            500000,
            800000,
            1000000,
            1500000,
            2000000,
        ]
    }
}