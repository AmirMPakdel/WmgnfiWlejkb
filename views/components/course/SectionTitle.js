import React, { Component } from "react";
import styles from "./SectionTitle.module.css";

export default class SectionTitle extends Component {
    
    render(){
        return(
            <div className={styles.sectitle_con+" tilt fdc2"}>
                {this.props.title}
            </div>
        )
    }
}