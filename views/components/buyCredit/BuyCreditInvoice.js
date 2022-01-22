import React, { Component } from "react";
import styles from "./BuyCreditInvoice.module.css";

/**
* Props of BuyCreditInvoice Component
* @typedef Props
* @property {string} className
* @property {React.CSSProperties} style
* 
* @extends {Component<Props>}
*/
export default class BuyCreditInvoice extends Component {
    
    constructor(props){
        super(props);
        this.controller = new BuyCreditInvoiceController(this);
        this.state = {
        
        }
    }
    
    componentDidMount(){
    }
    
    render(){
        
        let p = this.props.parent;
        let ps = p.state;

        return(
            <div className={styles.con+" md_card_shd bgw"}>

                <div className={styles.title+" tilt md_card_shd bglc1"}>{"نوع پرداخت"}</div>

                
                
            </div>
        )
    }
}