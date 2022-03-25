import React, { Component } from "react";
import styles from "./InfoBox.module.css";

/**
* Props of InfoBox Component
* @typedef Props
* @property {string} className
* @property {React.CSSProperties} style
* 
* @extends {Component<Props>}
*/
export default class InfoBox extends Component {
    
    constructor(props){
        super(props);
        //this.controller = new InfoBoxController(this);
        this.state = {
        
        }
    }
    
    componentDidMount(){
    }
    
    render(){
        
        if(this.props.data.template==1){
            return <NoMedia data={this.props.data}/>
        }
        if(this.props.data.template==2){
            return <WithMedia index={this.props.index}
            data={this.props.data}/>
        }
        return null
    }
}

class NoMedia extends Component {

    render(){
        return(
            <div className={styles.nmd_con+" bglc1"}>

                <div className={styles.nmd_title+" tilt"}>{"ثبت نام تابستانه آغاز شد"}</div>

                <div className={styles.nmd_text+" bdyt"}>{text1}</div>

                <div className={styles.mnd_link_wrapper}>
                {
                    true?
                    <a className={styles.nmd_link+" bdyt bgtc1 fdc1"} 
                    href={"https://p30download.ir"}>{"ثبت نام کنید"}</a>
                    :null
                }
                </div>

            </div>
        )
    }
}

class WithMedia extends Component {

    render(){

        let card_con = styles.wm_card_left;
        let wm_wrapper = styles.wm_wrapper_left;
        if(this.props.index%2){
            card_con = styles.wm_card_right;
            wm_wrapper = styles.wm_wrapper_right
        }

        return(
        <div className={styles.wm_con}>

        <div className={card_con+" bglc1"}>

            <div className={wm_wrapper}>

                <div className={styles.wm_title_sec+" fdc2 tilt"}>
                    <span className={styles.wm_left_dashes+" ftc1"}>&#8211; &#8211; &#8212;</span>
                    <span>{"درباره اینجا"}</span>
                    <span className={styles.wm_right_dashes+" ftc1"}>&#8212; &#8211; &#8211;</span>
                </div>

                <div className={styles.wm_media_con}>

                {
                    true?
                    <img className={styles.wm_media_pic} src={"/statics/fake_img/bg1.jpg"}/>:
                    <VideoCard className={styles.wm_media_video}/>
                }
                
                </div>

                <div className={styles.wm_sec1}>

                    <div className={styles.wm_text+" bdyt"}>{text1}</div>

                    {
                        this.props.data.has_link?
                        <a className={styles.wm_link+" bdyt bgtc1 fdc1"} 
                        href={"https://p30download.ir"}>{"ثبت نام کنید"}</a>
                        :null
                    }

                </div>
    
            </div>

        </div>

        </div>
        )
    }
}

const text1 = ` لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که
لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد. کتابهای زیادی در شصت و سه درصد گذشته، حال و آینده
شناخت فراوان جامعه و متخصصان را می طلبد تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی و فرهنگ پیشرو در زبان فارسی
ایجاد کرد. در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها و شرایط سخت تایپ به پایان رسد وزمان مورد نیاز شامل حروفچینی
.دستاوردهای اصلی و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد`