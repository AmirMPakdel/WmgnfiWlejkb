import React, { Component } from "react";
import styles from "./Intro.module.css";

/**
* Props of Intro Component
* @typedef Props
* @property {string} className
* @property {React.CSSProperties} style
* 
* @extends {Component<Props>}
*/
export default class Intro extends Component {
    
    constructor(props){
        super(props);
        //this.controller = new IntroController(this);
        this.state = {
        
        }
    }
    
    componentDidMount(){
    }
    
    render(){
        return(

            // <SingleImage src={"/statics/fake_img/bg1.jpg"}/>
            <InfoBox/>
        )
    }
}

class InfoBox extends Component {

    componentDidMount(){

    }

    render(){
        return(
            <div className={styles.container1+" bglc1"}>

                <div className={styles.ib_wrapper1}>

                    <div className={styles.ib_title_holder}>

                        <div className={styles.ib_title+" tilt bgtc1 fdc1 sm_card_shd"}>{"جامع‌ترین دوره آموزش فتوشاپ"}</div>

                    </div>

                    <div className={styles.ib_sec1}>

                        <img className={styles.ib_image}
                        src={"https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Adobe_Illustrator_Icon_%28CS6%29.svg/1046px-Adobe_Illustrator_Icon_%28CS6%29.svg.png"}/>

                        <div className={styles.ib_sec2}>

                            <div className={styles.ib_text+" bdyt"}>{text1}</div>

                            {
                                true?
                                <a className={styles.ib_link+" bdyt bgtc1 fdc1"} href={"https://p30download.ir"}>{"مشاهده"}</a>
                                :null
                            }

                        </div>


                    </div>

                </div>

            </div>
        )
    }
}

class SingleImage extends Component {

    componentDidMount(){

    }

    render(){
        return(
            <div className={styles.container1}>

                <div className={styles.si_intro_poster}
                style={{backgroundImage:`url("${encodeURIComponent(this.props.src)}")`}}/>

            </div>
        )
    }
}

const text1 = "دوره از صفر صفر شروع خواهد شد! باهم نصب و تنظیم می کنیم و دوره شروع می شود. از مقدمات فتوشاپ شروع خواهیم کرد به تمام ابزار ها از مقدماتی تا حرفه ای و حتی فراتر خدمت شرکت کنندگان تدریس خواهد شد. این دوره هیچ محدودیت مطلبی نخواهد داشت ! هیچ تکنیکی در نزد مدرس باقی نمی ماند همه به شرکت کنندگان منتقل میگردد. بهترین دوره برای طراحان و بهترین دوره برای عکاس ها خواهد بود تا کار با فتوشاپ را اصولی یاد بگیرند"