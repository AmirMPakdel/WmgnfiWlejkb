import React, { Component } from "react";
import styles from "./CourseInfo.module.css";


export default class CourseInfo extends Component {

    state={ opened:false }

    toggle = ()=>{
        this.setState({opened: !this.state.opened})
    }
    
    render(){

        // let line_style = {};
        // if(this.state.open){
        //     line_style = {height:"20rem"}
        // }

        let c = this.props.parent.state.course;

        return(
            <div className={styles.crs_info_con+" bglc1 "}>



                {/* <img className={styles.crs_info_icn+" amp_btn"} src={"/svg/closed_ccard_icn.svg"}
                onClick={this.toggle}/>
                
                <Collapse isOpened={true}>
                {
                    getText(this.state.opened?100:1)
                }
                </Collapse> */}

                
                <div className={styles.text+" bdyt fdc1 "}>{c.long_desc}</div>
                
            </div>
        )
    }
}

function paragraphMaker(text){

    let array = text.split("\n");
    return array

}

const getText = num => para.slice(0, num).map((p, i) => <p key={i}>{p}</p>);


const txt = `مستقیم بریم سر اصل مطلب، اگر امروزه اگهی های کار را یک نگاهی بندازید یا ویترین مغازه ها را نگاهی کنید! خواهید دید که فتوشاپ یکی از نرم افزار هایی است که همه شرکت ها و آتلیه ها و بخصوص کانون های تبلیغاتی به آن احساس نیاز میکنند! چرا ؟ برای مثال هر محصولی را تولید کنند حتما اولین مرحله بسته بندی ان خواهد بود که نیاز به فتوشاپ احساس میگردد. علاوه بر این ها تمام دانشجویان در هر رشته ای هم که باشند روزی به فتوشاپ احتیاج پیدا خواهند کرد و مهم تر از همه عکاس ها که فتوشاپ بخش جدا نشدنی ویرایش عکس آنان است. این ها مثال های بسیار کلی بود ! اگر شما احساس نیاز به فتوشاپ دارید، هیچ کلاص خصوصی با هزینه های بسیار هنگفت مناسب شما نخواهد بود. تضمین میکنیم در کنار شما همراهان ، یکی از بهترین ها هستیم …
دوره سوم آموزش فتوشاپ برای چه کسانی مناسب هست؟
دوره از صفر صفر شروع خواهد شد! باهم نصب و تنظیم می کنیم و دوره شروع می شود. از مقدمات فتوشاپ شروع خواهیم کرد به تمام ابزار ها از مقدماتی تا حرفه ای و حتی فراتر خدمت شرکت کنندگان تدریس خواهد شد. این دوره هیچ محدودیت مطلبی نخواهد داشت ! هیچ تکنیکی در نزد مدرس باقی نمی ماند همه به شرکت کنندگان منتقل میگردد`

const para = paragraphMaker(txt);