import React, { Component } from "react";
import styles from "./CourseBanner.module.css";
import myServer from "@/utils/myServer";
import { priceFormat } from "@/utils/price";
import Course, { duration2Hours } from "@/views/dynamics/index/Course";
import IconButton from "@/views/components/global/IconButton";
import MainButton from "@/views/components/global/MainButton";
import Price from "@/views/components/global/Price";
import VideoCard from "@/views/components/global/VideoCard";
import IconLine from "@/views/components/course/IconLine";
import Rating from "@/views/components/course/Rating";
import { sqlTimeStamp2ShamsiDate } from "@/utils/time";

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

    onBuy=()=>{

        this.props.parent.onBuy();
    }

    onShare=()=>{

        const shareData = {
            title: this.props.parent.state.course.title,
            text: document.title,
            url: window.location.href,
        }

        if(navigator.canShare(shareData)){
            navigator.share(shareData);
        }
    }
    
    render(){
        let ps = this.props.parent.state;
        let c = ps.course;
        return(
            <>
                <div className={styles.back_img} style={{backgroundImage:`url(${myServer.MediaFiles.publicImage(c.cover, "course_image")})`}}/>

                <div className={styles.title+" tc1i tbc1i tilt"}>
                    {c.title}
                </div>

                <div className={styles.educator_con}>
                    
                    <img className={styles.educator_icon} src={"/statics/svg/educator_bold_white.svg"}/>
                    {c.educators.map(e=>e.first_name+" "+e.last_name).join("، ")}

                </div>

                <div className={styles.row1+"  flc1i cpnt"}>

                    <div className={styles.row1_div}>{"آخرین بروزرسانی : "+ sqlTimeStamp2ShamsiDate(c.last_update)}</div>
                    <div className={styles.row1_div}>|</div>
                    <div className={styles.row1_div}>{"شرکت کننده در دوره"+ " : " +priceFormat(c.sells)}</div>
                    {/* TODO:: uncomment when rating feature added */}
                    {/* <div className={styles.row1_div}>|</div>
                    <div className={styles.rating_sec+" "+styles.row1_div}>
                        <Rating className={styles.rating}
                        rate={c.score}
                        disabled={1}
                        onChange={this.onRate}/>
                        {"( "+c.score+" )"}
                    </div> */}

                </div>

                {/* <div className={styles.dashed+" dashed_line_lc2"}/> */}

                <div className={styles.row2+" flc1i bdyt"}>
                    {c.short_desc}
                </div>

                {/* <div className={styles.dashed+" "+styles.dashed2+" dashed_line_lc2"}/> */}

                <div className={styles.row3}>

                    <IconButton className={styles.tablet_icon_btn} 
                    borderMode
                    onClick={this.onShare}
                    icon={"/statics/img/send_l-w.svg"} 
                    title={<div className={styles.tablet_icon_btn_t}>{"به اشتراک گذاری"}</div>}/>

                    {
                        c.is_favorite?
                        <IconButton className={styles.tablet_icon_btn} 
                        borderMode
                        icon={"/statics/img/heart_b.svg"} 
                        title={<div className={styles.tablet_icon_btn_t}>{"حذف از علاقمندی ها"}</div>}
                        onClick={this.props.parent.removeFromWishlist}/>
                        :
                        <IconButton className={styles.tablet_icon_btn} 
                        borderMode
                        icon={"/statics/img/heart_l-w.svg"}
                        title={<div className={styles.tablet_icon_btn_t}>{"افزودن به علاقمندی ها"}</div>}
                        onClick={this.props.parent.addToWishlist}/>
                    }
                    
                </div>

                <div className={styles.tablet_sec}>

                    <div className={styles.dashed+" dashed_line_lc2"}/>

                    {
                        c.intro_video.url?
                        <VideoCard className={styles.tablet_video}
                        thumbnail={myServer.MediaFiles.publicImage(c.logo)}
                        uploadKey={c.intro_video.url}/>
                        :
                        <div className={styles.default_intro_video_image}
                        style={{backgroundImage:`url(${myServer.MediaFiles.publicImage(c.logo, "course_image")})`}}/>
                    }
                    

                    <div className={styles.tablet_sec1+" flc1"}>

                        <IconLine icon={"/statics/img/play_l-w.svg"} text={duration2Hours(c.duration)+" آموزش"}/>

                        <IconLine icon={"/statics/img/paper_l-w.svg"} text={c.headings.length+" سرفصل"}/>

                        <IconLine icon_className={styles.download_icon} 
                        icon={"/statics/img/downlaod_l-w.svg"} 
                        text={c.contents.length+" محتوای قابل دانلود"}/>

                        {/* <IconLine icon={"/svg/crs_complete_icn.svg"} text={txt4}/> */}

                    </div>

                    <div className={styles.dashed+" dashed_line_lc2"}/>
                    
                    <div className={styles.price_wrapper+" flc1"}>

                        {
                            c.price?
                            <Price 
                            withDiscount={c.discount_price}
                            price={c.price}/>:
                            <div className={styles.free_price}>{"رایگان"}</div>
                        }

                    </div>

                    <div className={styles.dashed+" dashed_line_lc2"}/>

                    {/* <MainButton className={styles.tablet_buy_btn} title={"افزودن به سبد خرید"}/> */}

                    {/* <MainButton className={styles.tablet_buy_btn} title={"خرید سریع"}
                    whiteBorder={true}/> */}

                    {
                        c.access_type == "3" || c.access_type == "4"?
                        <div className={styles.tablet_buy_btn+" tbgcscs fdc1 bdyt"}>{"خریداری شده"}</div>
                        :
                        <MainButton className={styles.tablet_buy_btn} 
                        title={c.price?"خرید":"ثبت نام در دوره"}
                        onClick={this.onBuy}
                        whiteBorder={false}/>
                    }
                    

                </div>
            </>
        )
    }
}

const txt1 = "47 ساعت دوره";
const txt2 = "75 سرفصل دوره";
const txt3 = "38 منبع قابل دانلود";
const txt4 = "دوره به اتمام رسیده";