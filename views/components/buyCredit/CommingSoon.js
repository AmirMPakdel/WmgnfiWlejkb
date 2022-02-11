import React, { Component } from "react";
import styles from "./CommingSoon.module.css";

/**
* Props of CommingSoon Component
* @typedef Props
* @property {string} className
* @property {React.CSSProperties} style
* 
* @extends {Component<Props>}
*/
export default class CommingSoon extends Component {
    
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
    
    render(){

        return(
            <div className={styles.con+" md_card_shd bgw"} ref={r=>this.con=r}>

                <div ref={r=>this.anchor=r} style={{position:"absolute",top:"-6rem"}}/>

                <div className={styles.title+" tilt md_card_shd bglc1"}>{"به زودی"}</div>

                <div className={styles.soon_text}>
                    {"قابلیت تبدیل مبلغ از صندوق درآمد به اعتبار سایت به زودی اضافه خواهد شد."}
                </div>

            </div>
        )
    }
}