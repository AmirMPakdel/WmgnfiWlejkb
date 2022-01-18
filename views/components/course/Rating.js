import React, { Component } from "react";
import styles from "./Rating.module.css";

export default class Rating extends Component {
    
    render(){
        return(
            <div className={styles.rating+" "+this.props.className}>
                
                    <img className={styles.star} src={"/statics/img/star-white-l.svg"}/>
                    <img className={styles.star} src={"/statics/img/star-white-l.svg"}/>
                    <img className={styles.star} src={"/statics/img/star-white-l.svg"}/>
                    <img className={styles.star} src={"/statics/img/star-white-l.svg"}/>
                    <img className={styles.star} src={"/statics/img/star-white-l.svg"}/>
                
            </div>
        )
    }
}