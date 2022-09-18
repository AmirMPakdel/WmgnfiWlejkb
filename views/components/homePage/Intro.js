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

const text1 = "به سایت جدیدتان خوش آمدید\n"+"فروشگاه آموزشی شما راه اندازی شده است و الان زمان آن رسیده تا صفحه سایتتان را شخصی سازی کنید. "+
"تمامی اجزای صفحه اصلی سایت ازجمله همین بخش قابلیت شخصی سازی دارند و میتوانید به راحتی با چند کلیک سایت منحصر به فرد خود را داشته باشید . "+
"مثال هایی از اجزایی که میتوانید به سایتتان اضافه کنید را در این صفحه بصورت پیش فرض آورده ایم. کافیست به داشبورد ادمین سایت خود بروید و در بخش صفحه اصلی از منو سمت راست "+
"اجزای سایت خود را مدیریت کنید. برای راهنمایی بیشتر باما در ارتباط باشید تا کمک کنیم سایت بهتر و بهینه‌تری بسازید. "+
"بعد از اینکه با مدیریت صفحه اصلی آشنا شدید از داشبورد ادمین وارد بخش ایجاد دوره شوید و چند دوره باکیفیت در سایت خود ایجاد کنید. "+
"می‌توانید دوره‌های‌ خود را در بخش دوره‌های من ویرایش کنید و اطلاعات بسیاری برای دوره خود به نمایش بگذارید و در نهایت دوره را منتشر کنید.";

const DEFAULT_INFO_BOX_DATA = {
    title:"با مینفو فروشگاه دوره های آموزشی بسازید",
    cover: null,
    text: text1,
    has_link: true,
    link_title: "ورود به داشبورد",
    link: env.PATHS.USER_DASHBOARD
}