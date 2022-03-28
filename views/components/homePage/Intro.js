import myServer from "@/utils/myServer";
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

        console.log(this.props.data);
    }
    
    render(){

        let d = this.props.data;

        if(d.template == 1){

            return <InfoBox data={this.props.data}/>;

        }else if(d.template == 2){

            return <SingleImage src={d.cover}/>;
        }
    }
}

class InfoBox extends Component {

    componentDidMount(){

    }

    render(){
        let d = this.props.data;
        let cover = "/statics/default_img/default_site_intro_cover.jpg";
        if(d.cover){
            cover = myServer.MediaFiles.publicImage(d.cover)
        }
        return(
            <div className={styles.container1+" bglc1"}>

                <div className={styles.ib_wrapper1}>

                    <div className={styles.ib_title_holder}>

                        <div className={styles.ib_title+" tilt bgtc1 fdc1 sm_card_shd"}>{d.title}</div>

                    </div>

                    <div className={styles.ib_sec1}>

                        <img className={styles.ib_image}
                        src={cover}/>

                        <div className={styles.ib_sec2}>

                            <div className={styles.ib_text+" bdyt"}>{d.text}</div>

                            {
                                d.has_link?
                                <a className={styles.ib_link+" bdyt bgtc1 fdc1"} href={d.link}>{d.link_title}</a>
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
        let cover = myServer.MediaFiles.publicImage(this.props.src)
        return(
            <div className={styles.container1}>

                <div className={styles.si_intro_poster}
                style={{backgroundImage:`url("${cover}")`}}/>

            </div>
        )
    }
}

const text1 = "دوره از صفر صفر شروع خواهد شد! باهم نصب و تنظیم می کنیم و دوره شروع می شود. از مقدمات فتوشاپ شروع خواهیم کرد به تمام ابزار ها از مقدماتی تا حرفه ای و حتی فراتر خدمت شرکت کنندگان تدریس خواهد شد. این دوره هیچ محدودیت مطلبی نخواهد داشت ! هیچ تکنیکی در نزد مدرس باقی نمی ماند همه به شرکت کنندگان منتقل میگردد. بهترین دوره برای طراحان و بهترین دوره برای عکاس ها خواهد بود تا کار با فتوشاپ را اصولی یاد بگیرند"