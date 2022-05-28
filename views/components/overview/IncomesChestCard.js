import React, { Component } from "react";
import MainButton from "@/views/components/global/MainButton";
import styles from "./IncomesChestCard.module.css";

export default class IncomesChestCard extends Component {

    onSellReport=()=>{
        
        
        window.location.href = env.PATHS.USER_FINANCIAL_REPORT+"?report_type=1";
    }
    
    render(){
        return(
            <div className={styles.con}>

                <div className={styles.header}>{"صندوق درآمد"}</div>

                <div className={styles.price_con}>
                    
                    <div className={styles.price}>
                        {this.props.income}
                        <div className={styles.toman}>{"تومان"}</div>
                    </div>

                </div>

                <div className={styles.info}>
                    {"این مبلغ درآمد ماهانه شما می باشد و اول هر ماه به حساب شما واریز میگردد"}
                </div>

                <MainButton title={"گزارش فروش"}
                onClick={this.onSellReport}/>
                
            </div>
        )
    }
}