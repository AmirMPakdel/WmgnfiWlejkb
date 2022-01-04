import React, { Component } from "react";
import styles from "./DashboardCard.module.css";

export default class DashboardCard extends Component {
    
    render(){
        return(
            <div className={styles.con+" "+this.props.className}>
                
                <div className={styles.right_sec}>
                    <div className={styles.number}>
                        {this.props.number}
                        {
                            this.props.number_title?
                            <div className={styles.number_title}>{this.props.number_title}</div>:null
                        }
                    </div>
                    <div className={styles.text}>{this.props.title}</div>
                </div>
                <div className={styles.left_bar}/>

            </div>
        )
    }
}