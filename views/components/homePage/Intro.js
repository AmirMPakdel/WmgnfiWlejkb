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

    }
    
    render(){

        let d = this.props.data;
        let show_default = this.props.show_default;

        if(show_default){

            return <InfoBox data={DEFAULT_INFO_BOX_DATA}/>;
        }

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
        let cover = "/statics/default_img/default_site_intro_cover.png";
        if(d.cover){
            cover = myServer.MediaFiles.publicImage(d.cover)
        }
        return(
            <div className={styles.container1+" bgw sm_card_shd"}>

                <div className={styles.ib_wrapper1}>

                    <div className={styles.ib_title_holder}>

                        <div className={styles.ib_title+" tilt bgtc1 fdc1 sm_card_shd"}>{d.title?d.title:DEFAULT_INFO_BOX_DATA.title}</div>

                    </div>

                    <div className={styles.ib_sec1}>

                        <img className={styles.ib_image}
                        src={cover}/>

                        <div className={styles.ib_sec2}>

                            <div className={styles.ib_text+" bdyt"}>{d.text?d.text:DEFAULT_INFO_BOX_DATA.text}</div>

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

const text1 = "تبریک میگیم بهت!\n"+"فروشگاه آموزشیت راه اندازی شده و الان وقتش رسیده تا صفحه سایتت رو شخصی سازی کنی. "+
"تمامی اجزای صفحه اصلی سایت ازجمله همین بخشی که داری میخونی قابلیت شخصی سازی دارن و میتونی به راحتی با چند کلیک سایت منحصر به فرد خودت رو داشته باشی. "+
"مثال هایی از اجزایی که میتونی به سایتت اضافه کنی رو تو این صفحه بصورت پیش فرض آوردیم. کافیه به داشبورد ادمین سایت بری و بخش صفحه اصلی از منو سمت راستش "+
"اجزای سایتت رو مدیریت کنی. برای راهنمایی بیشتر باهامون در ارتباط باش تا کمکت کنیم سایت بهتر و بهینه تری بسازی. "+
"بعد از اینکه با مدیریت صفحه اصلی آشنا شدی از همون داشبورد ادمین وارد بخش ایجاد دوره شو و چند تا دوره باکیفیت تو سایتت ایجاد کن. "+
"میتونی دوره هات رو تو بخش دوره های من ویرایش کنی و کلی اطلاعات برای دورت به نمایش بذاری و در نهایت منتشرشون کنی."+
"\ پس سریع تر شروع کن.";

const DEFAULT_INFO_BOX_DATA = {
    title:"با مینفو فروشگاه دوره های آموزشی بساز",
    cover: null,
    text: text1,
    has_link: true,
    link_title: "ورود به داشبورد",
    link: env.PATHS.USER_DASHBOARD
}