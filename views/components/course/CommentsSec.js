import React, { Component } from "react";
import MainButton from "@/views/components/global/MainButton";
import styles from "./CommentsSec.module.css";
import Rating from "@/views/components/course/Rating";

export default class CommentsSec extends Component {
    
    render(){
        return(
            <div className={styles.cmt_sec}>


                <div className={styles.cmt_input_con}>

                    <div className={styles.cmt_rating_con}>
                        <Rating/>
                    </div>

                    <textarea className={styles.cmt_txtarea}
                    placeholder="نظر خودتان را در این قسمت بنویسید..."/>

                    <MainButton className={styles.cmt_send_btn} title={"ارسال"}/>

                </div>

                <div style={{height:"2rem"}}/>

                <Comment/>
                <Comment/>
                <Comment/>
                <Comment/>
                
                <div style={{height:"2rem"}}/>

                <MainButton borderMode title={"مشاهده همه"}/>
                
            </div>
        )
    }
}

class Comment extends CommentsSec{
    
    render(){
        return(
            <div className={styles.comnt_con}>

                <div className={styles.comnt_sec1}>

                    <div className={styles.comnt_name}>{"امیرمحمد پاکدل"}</div>

                    <div className={styles.comnt_txt}>{"این آموزش کاملا به درد من خورد و تونستم خودم رو از لوپ زمانی که هر روز برام تکرار می‌شد خارج کنم"}</div>

                </div>

                {/* <img src={"/svg/dashed_vertical.svg"}/> */}

                {/* <div className={styles.comnt_sec2}>

                    <Rating/>

                    <div>{"12 مهر 1400"}</div>

                </div> */}

            </div>
        )
    }
}

const arr=[]