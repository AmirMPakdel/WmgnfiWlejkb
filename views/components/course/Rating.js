import React, { Component } from "react";
import styles from "./Rating.module.css";

export default class Rating extends Component {
    
    render(){
        return(
            <div className={styles.rating+" "+this.props.className}>
                
                    <img className={styles.star} src={"/svg/rating_emptystar.svg"}/>
                    <img className={styles.star} src={"/svg/rating_emptystar.svg"}/>
                    <img className={styles.star} src={"/svg/rating_emptystar.svg"}/>
                    <img className={styles.star} src={"/svg/rating_emptystar.svg"}/>
                    <img className={styles.star} src={"/svg/rating_emptystar.svg"}/>
                
                {/* <img className={styles.star} src={"/svg/rating_fullstar_black.svg"}/>
                <img className={styles.star} src={"/svg/rating_fullstar_black.svg"}/>
                <img className={styles.star} src={"/svg/rating_fullstar_black.svg"}/>
                <img className={styles.star} src={"/svg/rating_fullstar_black.svg"}/>
                <img className={styles.star} src={"/svg/rating_fullstar_black.svg"}/> */}
                
            </div>
        )
    }
}