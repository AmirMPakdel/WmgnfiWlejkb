import { Affix } from "antd";
import React, { Component } from "react";
import Course from "@/views/dynamics/index/Course";
import MainButton from "@/views/components/global/MainButton";
import Price from "@/views/components/global/Price";
import VideoCard from "@/views/components/global/VideoCard";
import styles from "./FloatingCard.module.css";
import IconLine from "@/views/components/course/IconLine";

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
    
    render(){
        let ps = this.props.parent.state;
        let c = ps.course;
        return(
            <Affix offsetTop={40} style={{ position: 'absolute', top: 30, left: 15 }}>

                <div className={styles.fltcrd_con+" bglc1i "}>

                    <VideoCard className={styles.fltcrd_video}
                    uploadKey={c.intro_video.url}
                    playBtnClassName={styles.fltcrd_video_playbtn}/>

                    <div className={styles.fltcrd_sec1}>

                        <Price
                        offPercent={c.discount}
                        orginalPrice={c.price}
                        price={c.price}/>

                    </div>

                    <img className={styles.fltcrd_dash} src={"/svg/dash_line.svg"}/>

                    {/* <MainButton className={styles.fltcrd_btn1} title={"افزودن به سبد خرید"}/>

                    <MainButton className={styles.fltcrd_btn2} title={"خرید سریع"} borderMode/> */}
                    <MainButton className={styles.fltcrd_btn2} title={"خرید"}/>

                    <div className={styles.space1}/>

                    <IconLine icon={"/statics/img/play_l.svg"} text={c.duration+" ساعت دوره"}/>

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