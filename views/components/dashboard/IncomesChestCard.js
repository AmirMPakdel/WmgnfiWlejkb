import React, { Component } from "react";
import MainButton from "@/views/components/global/MainButton";
import styles from "./IncomesChestCard.module.css";

export default class IncomesChestCard extends Component {
    
    render(){
        return(
            <div className={styles.con}>

                <div className={styles.header}>{"صندوق درآمد"}</div>

                <div className={styles.price_con}>
                    
                    <div className={styles.price}>
                        {"360,000,000"}
                        <div className={styles.toman}>{"تومان"}</div>
                    </div>

                </div>

                <div className={styles.info}>
                    {"این مبلغ درآمد ماهانه شما می باشد و اول هر ماه به حساب شما واریز میگردد"}
                </div>

                <MainButton title={"گزارش فروش"}/>
                
            </div>
        )
    }
}