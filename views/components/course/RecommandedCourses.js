import React, { Component } from "react";
import Price from "@/views/components/global/Price";
import styles from "./RecommandedCourses.module.css";

export default class RecommandedCourses extends Component{

    render(){
        return(
            <div className={styles.con}>

                <RecommandedCourse/>
                <RecommandedCourse/>
                <RecommandedCourse/>
                <RecommandedCourse/>

            </div>
        )
    }
}

class RecommandedCourse extends Component{
    render(){
        return(
            <div className={styles.rc_con}>

                <img className={styles.rc_img} src={"/fake_img/3.jpg"}/>

                <div className={styles.rc_sec1}>

                    <div className={styles.rc_title+" fdc2 bdyt"}>{t1}</div>

                </div>

                <div className={styles.rc_sec2+" blc2 "}>

                    <Price price={365000}
                    offPercent={30}
                    orginalPrice={500000}/>

                </div>

            </div>
        )
    }
}

const t1 = "این آموزش کاملا به درد من خورد و ";
const t2 = "این آموزش کاملا به درد من خورد و تونستم خودم رو از لوپ زمانی که هر روز برام تکرار می‌شد خارج کنم";