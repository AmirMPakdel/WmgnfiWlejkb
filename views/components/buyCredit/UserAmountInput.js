import { InputFilter } from "@/utils/validation";
import React, { Component } from "react";
import MainButton from "../global/MainButton";
import TextInput from "../global/TextInput";
import styles from "./UserAmountInput.module.css";
const persianNToText = require('number-to-persian-text');

/**
* Props of UserAmountInput Component
* @typedef Props
* @property {string} className
* @property {React.CSSProperties} style
* 
* @extends {Component<Props>}
*/
export default class UserAmountInput extends Component {
    
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
    
    onUserInput=(amount)=>{
        let p = this.props.parent;
        p.setState({user_amount_input: amount});
    }

    onConfirm=()=>{
        
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