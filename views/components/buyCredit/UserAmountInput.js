import { priceFormat } from "@/utils/price";
import { InputFilter } from "@/utils/validation";
import React, { Component } from "react";
import MainButton from "../global/MainButton";
import TextInput from "../global/TextInput";
import BuyCredit from "@/views/dynamics/dashboard/BuyCredit";
import styles from "./UserAmountInput.module.css";
const persianNToText = require('number-to-persian-text');

/**
* Props of UserAmountInput Component
* @typedef Props
* @property {string} className
* @property {React.CSSProperties} style
* @property {BuyCredit} parent
* 
* @extends {Component<Props>}
*/
export default class UserAmountInput extends Component {
    
    constructor(props){
        super(props);
        this.state = {
            error:false,
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
    
    onUserInput=(amount)=>{
        let p = this.props.parent;

        this.lazyInputCheck();
        
        p.setState({user_amount_input: amount}, p.continueCheck);
    }

    lazyInputCheck=()=>{

        clearTimeout(this.input_check_timeout);

        this.input_check_timeout = setTimeout(()=>{

            let amount = this.props.parent.state.user_amount_input;
            let error = false;

            if(amount === ""){

                this.setState({error});
                return;

            }else{

                amount = Number(amount);
                if(isNaN(amount) || amount<env.LIMITS.MIN_CREDIT_BUY_AMOUNT){
                    error = "مبلغ ورودی باید حداقل "+priceFormat(env.LIMITS.MIN_CREDIT_BUY_AMOUNT)+" تومان باشد"
                }
                this.setState({error});
            }

        }, 2000);
    }
    
    render(){

        let p = this.props.parent;
        let ps = p.state;

        return(
            <div className={styles.con+" md_card_shd bgw"} ref={r=>this.con=r}>

                <div ref={r=>this.anchor=r} style={{position:"absolute",top:"-6rem"}}/>

                <div className={styles.title+" tilt md_card_shd bglc1"}>{"وارد کردن مبلغ دلخواه"}</div>

                <TextInput
                className={styles.input}
                inputStyle={{textAlign:"center", direction:"ltr"}}
                maxLength={12}
                placeholder="به تومان"
                type="price"
                error={this.state.error}
                inputFilter={InputFilter.integer}
                value={ps.user_amount_input}
                onChange={this.onUserInput}
                />

                {
                    ps.user_amount_input?
                    <div className={styles.sub}>{persianNToText.getText(ps.user_amount_input)+" تومان"}</div>:
                    <div className={styles.sub}>{"مبلغ مورد نظر خود را وارد نمایید."}</div>
                }

                <MainButton
                className={styles.confirm_btn}
                title="تایید"
                onClick={this.onConfirm}/>
                
            </div>
        )
    }
}