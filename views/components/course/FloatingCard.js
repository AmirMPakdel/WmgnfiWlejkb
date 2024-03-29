import { Affix } from "antd";
import React, { Component } from "react";
import Course, { duration2Hours } from "@/views/dynamics/index/Course";
import MainButton from "@/views/components/global/MainButton";
import Price from "@/views/components/global/Price";
import VideoCard from "@/views/components/global/VideoCard";
import styles from "./FloatingCard.module.css";
import IconLine from "@/views/components/course/IconLine";
import myServer from "@/utils/myServer";

/**
* Props of FloatingCard Component
* @typedef Props
* @property {string} className
* @property {React.CSSProperties} style
* @property {Course} parent
* 
* @extends {Component<Props>}
*/
export default class FloatingCard extends Component {

    onBuy=()=>{
        
        this.props.parent.onBuy();
    }
    
    render(){
        let ps = this.props.parent.state;
        let c = ps.course;

        return(
            <Affix offsetTop={108} style={{ position: 'absolute', top: 30, left: 15 }}>

                <div className={styles.fltcrd_con+" bglc1i "}>

                    {
                        c.intro_video.url?
                        <VideoCard className={styles.fltcrd_video}
                        uploadKey={c.intro_video.url}
                        thumbnail={myServer.MediaFiles.publicImage(c.logo)}
                        playBtnClassName={styles.fltcrd_video_playbtn}/>
                        :
                        <div className={styles.fltcrd_video_default_img}
                        style={{backgroundImage:`url(${myServer.MediaFiles.publicImage(c.logo, "course_image")})`}}/>
                    }

                    <div className={styles.fltcrd_sec1}>

                        {
                            c.price?
                            <Price 
                            withDiscount={c.discount_price}
                            price={c.price}/>:
                            <div className={styles.free_price+" fdc1"}>{"رایگان"}</div>
                        }
                        
                    </div>

                    {/* <MainButton className={styles.fltcrd_btn1} title={"افزودن به سبد خرید"}/>

                    <MainButton className={styles.fltcrd_btn2} title={"خرید سریع"} borderMode/> */}
                    
                    {
                        c.access_type == "3" || c.access_type == "4"?
                        <div className={styles.fltcrd_btn3+" tbgcscs fdc1 bdyt"}>{"خریداری شده"}</div>
                        :
                        <MainButton className={styles.fltcrd_btn2}
                        title={c.price?"خرید":"ثبت نام در دوره"}
                        onClick={this.onBuy}/>
                    }
                    
                    <div className={styles.space1}/>

                    <IconLine icon={"/statics/img/play_l.svg"} text={duration2Hours(c.duration)+" آموزش"}/>

                    <IconLine icon={"/statics/img/paper_l.svg"} text={c.headings.length+" سرفصل"}/>

                    <IconLine icon_className={styles.download_icon} 
                    icon={"/statics/img/downlaod_l.svg"} 
                    text={c.contents.length+" محتوای قابل دانلود"}/>

                    {/* <IconLine icon={"/svg/crs_complete_icn.svg"} text={txt4}/> */}

                </div>

            </Affix>
        )
    }
}

const txt1 = "47 ساعت دوره";
const txt2 = "75 سرفصل دوره";
const txt3 = "38 منبع قابل دانلود";
const txt4 = "دوره به اتمام رسیده";