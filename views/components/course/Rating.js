import { Rate } from "antd";
import React, { Component } from "react";
import styles from "./Rating.module.css";

/**
* Props of Rating Component
* @typedef Props
* @property {string} className
* @property {React.CSSProperties} style
* @property {number} rate
* @property {number} myRate
* @property {boolean} disabled 
* 
* @extends {Component<Props>}
*/
export default class Rating extends Component {
    
    render(){

        let rate = this.props.rate || 0;
        if(this.props.myRate){
            rate = this.props.myRate;
        }

        return(
            <div className={styles.rating+" "+this.props.className}>
                
                <Rate
                defaultValue={rate}
                allowClear={false}
                allowHalf
                onChange={this.props.onChange}
                disabled={this.props.disabled}/>
                
            </div>
        )
    }
}