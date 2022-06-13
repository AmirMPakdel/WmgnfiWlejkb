import React, { Component } from "react";
import styles from "./Price.module.css";
import {priceFormat} from "@/utils/price";

/**
* Props of Price Component
* @typedef Props
* @property {string} className
* @property {React.CSSProperties} style
* @property {number} price
* @property {number} withDiscount
* 
* @extends {Component<Props>}
*/
export default class Price extends Component {
    
    render(){
        let addClass = "";
        
        return(
            <div className={styles.con+" "+this.props.className+" "+addClass}>

                {
                    this.props.withDiscount?
                    <>

                    <div className={styles.sec1}>

                        <div className={styles.offPercent+" cpnt bgec flc1"}>{calculateOffPercent(this.props.price, this.props.withDiscount)+"%"}</div>

                        <div className={styles.orginalPrice+" cpnt"}>{priceFormat(this.props.price)}</div>

                    </div>

                    <div className={styles.price+" tilt"}>

                        {
                            this.props.withDiscount != 0?
                            <>
                                <div className={styles.currency+" cpnt"}>{"تومان"}</div>

                                {priceFormat(this.props.withDiscount)}
                            </>
                            :
                            <div className={styles.currency+" cpnt"} style={{fontWeight:"bold"}}>{"رایگان"}</div>
                        }

                    </div>

                    </>
                    :
                    <div className={styles.price+" tilt"}>
                        
                        {
                            this.props.price != 0?
                            <>
                                <div className={styles.currency+" cpnt"}>{"تومان"}</div>

                                {priceFormat(this.props.price)}
                            </>
                            :
                            <div className={styles.currency+" cpnt"} style={{fontWeight:"bold"}}>{"رایگان"}</div>
                        }

                    </div>
                }

            </div>
        )
    }
}

function calculateOffPercent(price, withDiscount) {

    price = Number(price);
    withDiscount = Number(withDiscount);

    if(isNaN(price) || isNaN(withDiscount)){
        return "";
    }

    let off = 100 - Math.floor((100 * withDiscount) / price );

    return off;
}