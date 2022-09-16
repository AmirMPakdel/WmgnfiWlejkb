import React, { Component } from "react";
import CourseCard, { HallowCourseCard } from "../global/CourseCard";
import styles from "./DefaultCourseList.module.css";

/**
* Props of DefaultCourseList Component
* @typedef Props
* @property {string} className
* @property {React.CSSProperties} style
* 
* @extends {Component<Props>}
*/
export default class DefaultCourseList extends Component {
    
    constructor(props){
        super(props);
    }
    
    
    render(){
        return(
            <div className={styles.con+" bgw sm_card_shd"}>

                <div className={styles.title_sec+" fdc2 tilt"}>
                    <span className={styles.left_dashes+" ftc1"}>&#8211; &#8211; &#8212;</span>
                    <span>{"پرفروش ترین دوره ها"}</span>
                    <span className={styles.right_dashes+" ftc1"}>&#8212; &#8211; &#8211;</span>
                </div>

                <div className={styles.wrapper}>

                    <div className={styles.wrapper2}>

                        <div className={styles.text_con}>

                            <div className={styles.text1+" bdyt"}>
                                <span>
                                    {"تو مینفو امکان ساخت لیست‌هایی با ترتیب‌های متفاوت از جمله از پربازدیدترین، پرفروش‌ترین، محبوب‌ترین و ... از دوره‌های موجود وجود داره که میشه از "}
                                    <a href={env.PATHS.USER_EDIT_HOMEPAGE}>{"اینجا "}</a>
                                    {" اون ها رو ایجاد، حذف و ویرایش کرد."}
                                </span>

                            </div>

                            <div className={styles.text2+" bdyt"}>
                                {"یادت نره که قبل از ایجاد این المان چندتا دوره ایجاد و منتشر کنی تا مثل "}
                                {"دوتا دوره مقابل که برای مثال نشون دادیم، تو این المان به نمایش گذاشته بشن."}
                            </div>

                        </div>

                        <CourseCard hideRating={true} disableLink={true} directLogoUrl={true} 
                        className={styles.card} data={CARD2_DATA}/>

                        <CourseCard hideRating={true} disableLink={true} directLogoUrl={true} 
                        className={styles.card} data={CARD1_DATA}/>

                    </div>

                </div>
                
            </div>
        )
    }
}

const CARD1_DATA = {
    title: "آموزش کامل نقاشی دیجیتال",
    educators_name: ["رضا ایرانی"],
    logo: "/statics/default_img/default_course_logo1.jpg",
    price: 700000
}

const CARD2_DATA = {
    title: "دوره آموزش برنامه نویسی",
    educators_name: ["رضا ایرانی"],
    logo: "/statics/default_img/default_course_logo2.jpg",
    price: 1200000,
    discount_price: 920000,
}