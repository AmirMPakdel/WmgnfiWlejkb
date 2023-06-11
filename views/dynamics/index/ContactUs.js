import MainButton from "@/views/components/global/MainButton";
import TextArea from "@/views/components/global/TextArea";
import TextInput from "@/views/components/global/TextInput";
import IndexLayout from "@/views/layouts/IndexLayout";
import WrapperT1 from "@/views/layouts/WrapperT1";
import React, { Component } from "react";
import styles from "./ContactUs.module.css";

/**
* Props of ContactUs Component
* @typedef Props
* @property {string} className
* @property {React.CSSProperties} style
* 
* @extends {Component<Props>}
*/
export default class ContactUs extends Component {
    
    constructor(props){
        super(props);
        //this.controller = new ContactUsController(this);
        this.state = {
            full_name:"",
            contact_number:"",
            message:"",
        }
    }
    
    componentDidMount(){
        document.title = "تماس با ما";
    }

    onInput=(k, v)=>{

        this.state[k] = v;
        this.setState(this.state);
    }
    
    render(){
        return(
            <IndexLayout accessType="noAuth"
            showWithoutAuth={false}
            footerAutoLoad={true}>

                <WrapperT1 className={styles.wrapper+' sm_card_shd'}>

                    <div className={styles.con}>

                        <div className={styles.contact_info_sec}>

                            <div className={styles.title}>{"تماس با ما"}</div>

                            <div className={styles.text1}>{text1}</div>

                            <IconText src={"/statics/svg/educator_bold_black.svg"}
                            text={"09118015081"}/>

                            <IconText src={"/statics/svg/educator_bold_black.svg"}
                            text={"contact@minfo.ir"}/>

                            <IconText src={"/statics/svg/educator_bold_black.svg"}
                            text={"خیابان فلان، کوچه فلان، پلاک 120، طبقه 12، واحد 47"}/>

                        </div>

                        <div className={styles.send_message_sec}>

                            <TextInput className={styles.input1}
                            placeholder={"نام نام خانوادگی"}
                            value={this.state.full_name}
                            onChange={(t)=>this.onInput("full_name", t)}/>

                            <TextInput className={styles.input1}
                            placeholder={"ایمیل"}
                            value={this.state.contact_number}
                            onChange={(t)=>this.onInput("contact_number", t)}/>

                            <TextArea className={styles.ta1}
                            placeholder={"متن پیام"}
                            value={this.state.message}
                            onChange={(t)=>this.onInput("message", t)}/>

                            <MainButton className={styles.submit_btn}
                            title={"ارسال"}/>

                        </div>

                    </div>

                </WrapperT1>
                
            </IndexLayout>
        )
    }
}

function IconText(props) {
    return (
        <div className={styles.icon_text_con}>

            <img className={styles.icon_text_icon} src={props.src}/>

            <div className={styles.icon_text_text}>{props.text}</div>

        </div>
    )
}

const text1 = "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد کرد، در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها، و شرایط سخت تایپ به پایان رسد و زمان مورد نیاز شامل حروفچینی دستاوردهای اصلی، و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.";