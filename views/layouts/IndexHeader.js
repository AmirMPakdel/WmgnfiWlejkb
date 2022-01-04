import React, { Component } from "react";
import styles from "./IndexHeader.module.css";
import MainButton from "@/views/components/global/MainButton";

export default class IndexHeader extends Component {
    
    render(){
        return(
            <div className={styles.header_con+" bglc1i"}>

                <MainButton title={"ثبت نام"}/>
                
                <div className={styles.space1}/>

                <MainButton title={"ورود"}/>
                
            </div>
        )
    }
}