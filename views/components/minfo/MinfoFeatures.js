import React, { Component } from "react";
import styles from "./MinfoFeatures.module.css";
import MinfoSectionHeader from "./MinfoSectionHeader";

/**
* Props of MinfoFeatures Component
* @typedef Props
* @property {string} className
* @property {React.CSSProperties} style
* 
* @extends {Component<Props>}
*/
export default class MinfoFeatures extends Component {
    
    constructor(props){
        super(props);
        //this.controller = new MinfoFeaturesController(this);
        this.state = {
        
        }
    }
    
    componentDidMount(){
    }
    
    render(){
        return(
            <div className={styles.con}>

                <div id="features" className={styles.anchor}/>

                <MinfoSectionHeader title="ویژگی ها"/>

                <div className={styles.wrapper}>

                    <img className={styles.top_img} 
                    src={"/statics/svg/minfo-features-image2.svg"}/>

                    <div className={styles.right_side}>

                        <div className={styles.sec}>

                            <img className={styles.sec_icon} src={"/statics/svg/minfo-features-fast.svg"}/>

                            <div className={styles.sec_title}>{"سریع"}</div>

                            <div className={styles.sec_text}>
                                {text1}
                            </div>

                        </div>

                        <div className={styles.sec}>

                            <img className={styles.sec_icon} src={"/statics/svg/minfo-features-secure.svg"}/>

                            <div className={styles.sec_title}>{"ایمن"}</div>

                            <div className={styles.sec_text}>
                                {text2}
                            </div>

                        </div>

                        <div className={styles.sec}>

                            <img className={styles.sec_icon} src={"/statics/svg/minfo-features-easy.svg"}/>

                            <div className={styles.sec_title}>{"آسان"}</div>

                            <div className={styles.sec_text}>
                                {text3}
                            </div>

                        </div>

                    </div>

                    <img className={styles.left_img} 
                    src={"/statics/svg/minfo-features-image1.svg"}/>

                </div>
                
            </div>
        )
    }
}


const text1 = "سرور های مینفو داخلی بود و با استفاده از آخرین تکنولوژی ذخیره سازی مدیا "+
"سرعت دانلود و آپلود  مدیا در این سرور ها بسیار بالا می باشد. "+
"همچنین اپلیکیشن های پخش مدیا مینفو بسیار بهینه و پرسرعت تولید شده تا دانش آموزان بدون مشکل "+
"دوره های درسی خریداری شده را مشاهده کنند."

const text2 = "امنیت محتوا و اطلاعات فروشگاه شما توسط متخصصین مینفو تضمین می شود. "+
"همچنین اپلیکیشن پخش محتوای مینفو تا حد بسیار زیادی از گپی غیر قانونی محتوای شما جلوگیری خواهد کرد "+
"و هرروزه متخصصین مینفو در تلاش اند تا تکنولوژی بروز تری برای محافظت فراهم نمایند."

const text3 = "کلیه فرآیند بارگذاری توسط مدرس تا مشاهده توسط دانش آموز آن دوره "+
"به راحتی و چند با کلیک قابل انجام است. "+
"تمامی مراحل توسط کارشناسان مینفو بررسی شده و راهنمای کاربری برای آن در دسترس شما عزیزان قرار گرفته است."

