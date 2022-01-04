import React, { Component } from "react";
import styles from "./RecommandedArticles.module.css";

export default class RecommandedArticles extends Component {
    
    render(){
        return(
            <div className={styles.con}>

                <RecommandedArticle/>
                <RecommandedArticle/>
                <RecommandedArticle/>
                <RecommandedArticle/>

            </div>
        )
    }
}

class RecommandedArticle extends Component{
    render(){
        return(
            <div className={styles.ra_con}>

                <img className={styles.ra_img} src={"/fake_img/3.jpg"}/>

                <div className={styles.ra_sec1}>

                    <div className={styles.ra_title+" fdc2 bdyt"}>{t1}</div>

                    <div className={styles.ra_sub_title+" fdc2 cpnt"}>{t2}</div>

                </div>

            </div>
        )
    }
}

const t1 = "این آموزش کاملا به درد من خورد و ";
const t2 = "این آموزش کاملا به درد من خورد و تونستم خودم رو از لوپ زمانی که هر روز برام تکرار می‌شد خارج کنم";