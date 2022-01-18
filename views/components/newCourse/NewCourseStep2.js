import { Checkbox } from "antd";
import React, { Component } from "react";
import MainButton from "@/views/components/global/MainButton";
import styles from "./NewCourseStep2.module.css";

export default class NewCourseStep2 extends Component {
    
    state={
        selected:1
    }

    onSecure = ()=>{
        this.setState({selected:1})
    }

    onInsecure = ()=>{
        this.setState({selected:0})
    }

    onPrevious=()=>{
        this.props.parent.setState({
            step: 1
        },()=>{
            window.scrollTo(0,0);
        })
    }

    onNext=()=>{
        this.props.parent.setState({
            step: 3
        },()=>{
            window.scrollTo(0,0);
        })
    }

    render(){
        return(
        <>
        <div className={styles.con}>

            <div className={styles.secure_sec}  onClick={this.onSecure}>

                <img className={styles.icon} src="/statics/img/shield-done_h.svg"/>
                <div className={styles.title}>{"نحوه پخش ایمن"}</div>
                <div className={styles.info_con}>
                    {t}
                </div>

                <Checkbox className={styles.select} checked={this.state.selected===1}/>
                
            </div>

            <div className={styles.not_secure_sec} onClick={this.onInsecure}>

                <img className={styles.icon} src="/statics/img/shield-fail_h.svg"/>
                <div className={styles.title}>{"نحوه پخش عادی"}</div>
                <div className={styles.info_con}>
                    {t}
                </div>
                
                <Checkbox className={styles.select} checked={this.state.selected===0}/>
                
            </div>
            
        </div>
        <div className={styles.wrapper2}>

            <MainButton className={styles.back_btn}
            title={"مرحله قبل"}
            borderMode={true}
            onClick={this.onPrevious}/>

            <MainButton className={styles.next_btn} 
            title={"تایید و ادامه"}
            onClick={this.onNext}/>

        </div>
        </>
        )
    }
}

const t = `لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد کتابهای زیادی در شصت و سه درصد گذشته حال و آینده`