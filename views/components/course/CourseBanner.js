import React, { Component } from "react";
import styles from "./CourseBanner.module.css";
import myServer from "@/utils/myServer";
import { priceFormat } from "@/utils/price";
import Course from "@/views/dynamics/index/Course";
import IconButton from "@/views/components/global/IconButton";
import MainButton from "@/views/components/global/MainButton";
import Price from "@/views/components/global/Price";
import VideoCard from "@/views/components/global/VideoCard";
import IconLine from "@/views/components/course/IconLine";
import Rating from "@/views/components/course/Rating";

/**
* Props of CourseBanner Component
* @typedef Props
* @property {string} className
* @property {React.CSSProperties} style
* @property {Course} parent
* 
* @extends {Component<Props>}
*/
export default class CourseBanner extends Component {
    
    render(){
        let ps = this.props.parent.state;
        let c = ps.course;
        return(
            <>
                <div className={styles.back_img} style={{backgroundImage:`url(${myServer.MediaFiles.publicImage(c.cover)})`}}/>

                <div className={styles.title+" ftc1i btc1i tilt"}>
                    {c.title}
                </div>

                <div className={styles.row1+"  flc1i cpnt"}>

                    <div>{"آخرین بروزرسانی : 1400/02/05"}</div>
                    <div>|</div>
                    <div>{"شرکت کننده در دوره"+ " : " +priceFormat(c.sells)}</div>
                    <div>|</div>
                    <div className={styles.rating_sec}>
                        <Rating className={styles.rating} rate={c.score}/>
                        {c.score+" (466,551)"}
                    </div>
                    

                </div>

                <div className={styles.dashed+" dashed_line_lc2"}/>

                <div className={styles.row2+" flc1i bdyt"}>
                    {c.short_desc}
                </div>

                <div className={styles.dashed+" "+styles.dashed2+" dashed_line_lc2"}/>

                <div className={styles.row3}>

                    <IconButton className={styles.tablet_icon_btn} borderMode
                    icon={"/statics/img/send_l-w.svg"} title={"به اشتراک گذاری"}/>

                    {
                        Math.random()>0.5?
                        <IconButton className={styles.tablet_icon_btn} borderMode
                        icon={"/statics/img/heart_l-w.svg"} title={"افزودن به علاقمندی ها"}/>:
                        <IconButton className={styles.tablet_icon_btn} borderMode
                        icon={"/statics/img/heart_b.svg"} title={"حذف از علاقمندی ها"}/>
                    }
                    
                </div>

                <div className={styles.tablet_sec}>

                    <div className={styles.dashed+" dashed_line_lc2"}/>

                    <VideoCard className={styles.tablet_video}
                    uploadKey={c.intro_video.url}/>

                    <div className={styles.tablet_sec1+" flc1"}>

                        <IconLine icon={"/statics/img/play_l-w.svg"} text={c.duration+" ساعت دوره"}/>

                        <IconLine icon={"/statics/img/paper_l-w.svg"} text={c.headings.length+" سرفصل"}/>

                        <IconLine icon_className={styles.download_icon} 
                        icon={"/statics/img/downlaod_l-w.svg"} 
                        text={c.contents.length+" محتوای قابل دانلود"}/>

                        {/* <IconLine icon={"/svg/crs_complete_icn.svg"} text={txt4}/> */}

                    </div>

                    <div className={styles.dashed+" dashed_line_lc2"}/>
                    
                    <div className={styles.price_wrapper+" flc1"}>

                        <Price
                        offPercent={c.discount}
                        orginalPrice={c.price}
                        price={c.price}/>

                    </div>

                    <div className={styles.dashed+" dashed_line_lc2"}/>

                    {/* <MainButton className={styles.tablet_buy_btn} title={"افزودن به سبد خرید"}/> */}

                    {/* <MainButton className={styles.tablet_buy_btn} title={"خرید سریع"}
                    whiteBorder={true}/> */}

                    <MainButton className={styles.tablet_buy_btn} title={"خرید"}
                    whiteBorder={false}/>

                </div>
            </>
        )
    }
}

const txt1 = "47 ساعت دوره";
const txt2 = "75 سرفصل دوره";
const txt3 = "38 منبع قابل دانلود";
const txt4 = "دوره به اتمام رسیده";