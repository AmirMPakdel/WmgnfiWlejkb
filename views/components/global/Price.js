import React, { Component } from "react";
import styles from "./Price.module.css";
import {priceFormat} from "@/utils/price";

/**
 * Props of Price Component
 * @typedef Props
 * @property {string} className
 * @property {string|number} price
 * @property {string|number} offPercent 
 * @property {string|number} orginalPrice 
 * 
 * @extends {Component<Props>}
 */
export default class Price extends Component {
    
    render(){
        let addClass = "";
        return(
            <div className={styles.con+" "+this.props.className+" "+addClass}>

                {
                    this.props.offPercent?
                    <div className={styles.sec1}>

                        <div className={styles.offPercent+" cpnt bgec flc1"}>{this.props.offPercent+"%"}</div>
                        <div className={styles.orginalPrice+" cpnt"}>{priceFormat(this.props.orginalPrice)}</div>

                    </div>:null
                }
                {
                    this.props.price?
                    <div className={styles.price+" tilt"}>

                        <div className={styles.currency+" cpnt"}>{"تومان"}</div>

                        {priceFormat(this.props.price)}

                    </div>
                    :null
                }

            </div>
        )
    }
}