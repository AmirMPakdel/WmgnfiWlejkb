import EditFooterElementController from "@/controllers/components/modals/editHomePage/EditFooterElementController";
import React, { Component } from "react";
import styles from "./EditFooterElementModal.module.css";
import MainButton from "../../global/MainButton";
import TextInput from "../../global/TextInput";
import CrossSvg from "@/views/svgs/Cross";
import { InputFilter } from "@/utils/validation";
import chest from "@/utils/chest";
/**
* Props of EditFooterElementModal Component
* @typedef Props
* @property {string} className
* @property {React.CSSProperties} style
* 
* @extends {Component<Props>}
*/
export default class EditFooterElementModal extends Component {
    
    constructor(props){
        super(props);
        this.controller = new EditFooterElementController(this);
        this.state = {
        
            email:"",
            telegram:"",
            instagram:"",
            whatsapp:"",
            linkedin:"",

            telephone1:"",
            telephone2:"",
            mobile1:"",
            mobile2:"",
        }

        this.state = extractFooterData(props.data);
        this.state.confirm_loading = false;
    }
    
    componentDidMount(){

    }

    onCancel=()=>{

        chest.ModalLayout.closeAndDelete(1);
    }

    onInput=(key , value)=>{

        this.state[key] = value;
        this.setState(this.state);
    }

    onConfirm=()=>{

        this.controller.onConfirm();
    }
    
    render(){
        return(
            <div className={styles.con+" bglc1 btc2 xl_card_shd"}>

                <CrossSvg className={styles.close_btn + " bglc1 amp_btn md_card_shd"}
                stroke={env.THEME.dc1}
                onClick={this.onCancel}/>

                <div className={styles.title+" tilt "}>{"تنظیمات فوتر"}</div>

                <div className={styles.wrapper}>

                    <div className={styles.form_body}>

                        <div className={styles.info+" bdyt"}>{text1}</div>

                        <div className={styles.title2+" tilt"}>{"راه های ارتباطی اینترنتی"}</div>

                        <TextInput className={styles.input1}
                        placeholder={"ایمیل"}
                        inputStyle={{direction:"ltr"}}
                        onChange={t=>this.onInput("email", t)}
                        value={this.state.email}/>

                        <TextInput className={styles.input1}
                        placeholder={"واتس اپ"}
                        inputStyle={{direction:"ltr"}}
                        onChange={t=>this.onInput("whatsapp", t)}
                        value={this.state.whatsapp}/>

                        <TextInput className={styles.input1}
                        placeholder={"تلگرام"}
                        inputStyle={{direction:"ltr"}}
                        onChange={t=>this.onInput("telegram", t)}
                        value={this.state.telegram}/>

                        <TextInput className={styles.input1}
                        placeholder={"اینستاگرام"}
                        inputStyle={{direction:"ltr"}}
                        onChange={t=>this.onInput("instagram", t)}
                        value={this.state.instagram}/>

                        <TextInput className={styles.input1}
                        inputStyle={{direction:"ltr"}}
                        placeholder={"لینکدین"}
                        onChange={t=>this.onInput("linkedin", t)}
                        value={this.state.linkedin}/>

                        <div className={styles.title2+" tilt"}>{"شماره تماس"}</div>

                        <TextInput className={styles.input1}
                        placeholder={"تلفن ثابت 1"}
                        inputStyle={{direction:"ltr"}}
                        onChange={t=>this.onInput("telephone1", t)}
                        value={this.state.telephone1}/>

                        <TextInput className={styles.input1}
                        placeholder={"تلفن ثابت 2"}
                        inputStyle={{direction:"ltr"}}
                        onChange={t=>this.onInput("telephone2", t)}
                        value={this.state.telephone2}/>

                        <TextInput className={styles.input1}
                        placeholder={"شماره موبایل 1"}
                        inputStyle={{direction:"ltr"}}
                        onChange={t=>this.onInput("mobile1", t)}
                        value={this.state.mobile1}/>

                        <TextInput className={styles.input1}
                        placeholder={"شماره موبایل 2"}
                        inputStyle={{direction:"ltr"}}
                        onChange={t=>this.onInput("mobile2", t)}
                        value={this.state.mobile2}/>
                        
                    </div>

                    <div className={styles.sec1}>
                        
                        <MainButton className={styles.confirm_btn}
                        title={"ثبت"}
                        loading={this.state.confirm_loading}
                        onClick={this.onConfirm}/>

                    </div>

                </div>

            </div>
        )
    }
}

const extractFooterData=(data)=>{
    console.log(data);

    let footer_links = data.footer_links;
    let footer_telephones = data.footer_telephones;
    if(!footer_links){
        footer_links = {
            email:"",
            telegram:"",
            instagram:"",
            whatsapp:"",
            linkedin:"",
        }
    }
    if(!footer_telephones){
        footer_telephones={
            telephone1:"",
            telephone2:"",
            mobile1:"",
            mobile2:"",
        }
    }

    return {...footer_links, ...footer_telephones};
}

const text1 = "ورودی های زیر اختیاری هستند. آن اطلاعاتی که قصد دارید برای بازدید کننده سایت در فوتر نمایش داده شود را پر کنید."