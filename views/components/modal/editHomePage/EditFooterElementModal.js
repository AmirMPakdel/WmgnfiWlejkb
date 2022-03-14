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

        extractFooterData(props.parent.state);
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
                        onChange={t=>this.onInput("email", t)}
                        value={this.state.email}/>

                        <TextInput className={styles.input1}
                        placeholder={"واتس اپ"}
                        onChange={t=>this.onInput("email", t)}
                        value={this.state.email}/>

                        <TextInput className={styles.input1}
                        placeholder={"تلگرام"}
                        onChange={t=>this.onInput("email", t)}
                        value={this.state.email}/>

                        <TextInput className={styles.input1}
                        placeholder={"اینستاگرام"}
                        onChange={t=>this.onInput("email", t)}
                        value={this.state.email}/>

                        <TextInput className={styles.input1}
                        placeholder={"لینکدین"}
                        onChange={t=>this.onInput("email", t)}
                        value={this.state.email}/>

                        <div className={styles.title2+" tilt"}>{"شماره تماس"}</div>

                        <TextInput className={styles.input1}
                        placeholder={"تلفن ثابت 1"}
                        onChange={t=>this.onInput("email", t)}
                        value={this.state.email}/>

                        <TextInput className={styles.input1}
                        placeholder={"تلفن ثابت 2"}
                        onChange={t=>this.onInput("email", t)}
                        value={this.state.email}/>

                        <TextInput className={styles.input1}
                        placeholder={"شماره موبایل 1"}
                        onChange={t=>this.onInput("email", t)}
                        value={this.state.email}/>

                        <TextInput className={styles.input1}
                        placeholder={"شماره موبایل 2"}
                        onChange={t=>this.onInput("email", t)}
                        value={this.state.email}/>
                        
                    </div>

                    <div className={styles.sec1}>
                        
                        <MainButton className={styles.confirm_btn}
                        title={"ثبت"}
                        loading={this.state.btn_loading}
                        onClick={this.onConfirm}/>

                    </div>

                </div>

            </div>
        )
    }
}

const extractFooterData=(data)=>{
    console.log(data);
}

const text1 = "ورودی های زیر اختیاری هستند. آن اطلاعاتی که قصد دارید برای بازدید کننده سایت در فوتر نمایش داده شود را پر کنید."