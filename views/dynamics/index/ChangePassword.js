import ChangePasswordController from "@/controllers/dynamics/index/ChangePasswordController";
import { InputFilter } from "@/utils/validation";
import MainButton from "@/views/components/global/MainButton";
import TextInput from "@/views/components/global/TextInput";
import React, { Component } from "react";
import styles from "./ChangePassword.module.css";

/**
* Props of ChangePassword Component
* @typedef Props
* @property {string} className
* @property {React.CSSProperties} style
* 
* @extends {Component<Props>}
*/
export default class ChangePassword extends Component {
    
    constructor(props){
        super(props);
        this.controller = new ChangePasswordController(this);
        this.state = {
            loading:false,
            step: 1,
            show_timer_bar: true,
            timer:0,
            timer_text:"",
            can_send_sms_again:true,

            mobile:"",
            password:"",
            password_confirm:"",
            verification_code:"",

            mobile_error:false,
            password_error: false,
            password_confirm_error: false,
            verification_code_error: false,
        }
    }
    
    componentDidMount(){
    }

    onMobileInput=(v)=>{
        this.setState({mobile:v, mobile_error:false});
    }

    onMobileConfirm=()=>{
        this.controller.onMobileConfirm();
    }

    onBacktoInsertPhonenumber=()=>{
        this.controller.onBacktoInsertPhonenumber();
    }

    onVerificationCodeInput=(v)=>{
        this.setState({verification_code:v, verification_code_error:false});
    }

    onSendSmsCode=()=>{
        this.controller.onSendSmsCode();
    }

    onSmsCodeConfirm=()=>{
        this.controller.onSmsCodeConfirm();
    }

    onPasswordInput=(v)=>{
        this.setState({password:v, password_error:false});
    }

    onPasswordConfirmInput=(v)=>{
        this.setState({password_confirm:v, password_confirm_error:false});
    }

    onPasswordConfirm=()=>{
        this.controller.onPasswordConfirm();
    }

    goToHomePage=()=>{
        this.controller.goToHomePage();
    }
    
    render(){
        return(
            <div className={styles.con}>

                <div className={styles.wrapper_card+" sm_card_shd"}>

                    {
                        this.state.step===1?
                        <InserPhonenumber ref={r=>this.InserPhonenumber=r}
                        parent={this}/>:null
                    }
                    {
                        this.state.step===2?
                        <InsertValidationCode ref={r=>this.InsertValidationCode=r}
                        parent={this}/>:null
                    }
                    {
                        this.state.step===3?
                        <SetNewPassword ref={r=>this.SetNewPassword=r}
                        parent={this}/>:null
                    }
                    {
                        this.state.step===4?
                        <SuccessMessage ref={r=>this.SuccessMessage=r}
                        parent={this}/>:null
                    }

                </div>
                
            </div>
        )
    }
}

class InserPhonenumber extends Component{

    render(){
        let p = this.props.parent;
        let ps = p.state;
        return(
            <div className={styles.con1}>

                <div className={styles.title1}>{"فراموشی رمز عبور"}</div>

                <div className={styles.sub1}>{"شماره موبایل حساب کاربری خود را وارد نمایید."}</div>

                <TextInput placeholder={"شماره موبایل"}
                ref={r=>this.TextInput=r}
                className={styles.comp1+" blc2"}
                value={ps.mobile}
                error={ps.mobile_error}
                maxLength={11}
                inputFilter={InputFilter.phoneNumberInputFilter}
                onChange={p.onMobileInput}
                OnEnterKeyPressed={p.onMobileConfirm}/>

                <MainButton  className={styles.submit1}
                loading={ps.loading}
                title={"تایید"}
                onClick={p.onMobileConfirm}/>

            </div>
        )
    }
}

class InsertValidationCode extends Component{

    componentDidMount(){
        let p = this.props.parent;
        let ps = p.state;
        if(ps.can_send_sms_again){
            p.onSendSmsCode();
        }
    }

    render(){
        let p = this.props.parent;
        let ps = p.state;
        return(
            <div className={styles.con1}>

                <div className={styles.title1}>{"کد تایید"}</div>

                <div className={styles.sub1}>{"کد تایید ارسال شده به شماره موبایل "+ps.mobile+" را وارد نمایید"}</div>

                <a className={styles.back_link} onClick={p.onBacktoInsertPhonenumber}>
                    {"بازگشت"}
                </a>

                <TextInput placeholder={"کد تایید"}
                className={styles.comp2+" blc2"}
                ref={r=>this.TextInput=r}
                inputStyle={{textAlign:"center", direction:"ltr"}}
                value={ps.sms_code}
                error={ps.verification_code_error}
                inputFilter={InputFilter.verificationCodeInputFilter}
                onChange={p.onVerificationCodeInput}
                OnEnterKeyPressed={p.onSmsCodeConfirm}/>

                {
                    ps.show_timer_bar?
                    <div style={{height:"3rem", display:"flex", alignItems:"center"}}>
                    {
                        ps.can_send_sms_again?
                        <a  onClick={p.onSendSmsCode}>
                            {"ارسال مجدد"}
                        </a>
                        :
                        <div className={"cpnts"} style={{display:"flex", direction:"rtl"}}>
                            {"ارسال مجدد کد تا "}
                            <div style={{minWidth:"2.6rem", textAlign:"center", fontWeight:700}}>{ps.timer_text}</div>
                            {" دیگر"}
                        </div>
                    }
                    </div>
                    :
                    <div style={{height:"3rem"}}/>
                }

                <MainButton className={styles.submit2}
                title={"تایید"}
                loading={ps.loading}
                onClick={p.onSmsCodeConfirm}/>

            </div>
        )
    }
}

class SetNewPassword extends Component{

    focusInput2=()=>{
        this.TextInput2.input.focus();
    }

    render(){
        let p = this.props.parent;
        let ps = p.state;
        return(
            <div className={styles.con1}>

                <div className={styles.title1}>{"رمزعبور جدید"}</div>

                <div className={styles.sub1}>{"رمزعبور جدید خود را وارد نمایید."}</div>

                <TextInput placeholder={"رمزعبور جدید"}
                ref={r=>this.TextInput1=r}
                className={styles.comp1+" blc2"}
                value={ps.password}
                error={ps.password_error}
                type={"password"}
                maxLength={48}
                inputFilter={InputFilter.passwordInputFilter}
                onChange={p.onPasswordInput}
                OnEnterKeyPressed={this.focusInput2}/>

                <TextInput placeholder={"تکرار رمزعبور جدید"}
                ref={r=>this.TextInput2=r}
                className={styles.comp3+" blc2"}
                type={"password"}
                value={ps.password_confirm}
                error={ps.password_confirm_error}
                maxLength={48}
                inputFilter={InputFilter.passwordInputFilter}
                onChange={p.onPasswordConfirmInput}
                OnEnterKeyPressed={p.onPasswordConfirm}/>

                <MainButton  className={styles.submit3}
                loading={ps.loading}
                title={"تایید"}
                onClick={p.onPasswordConfirm}/>

            </div>
        )
    }
}

class SuccessMessage extends Component{

    render(){
        let p = this.props.parent;
        let ps = p.state;
        return(
            <div className={styles.con1}>

                <img className={styles.img1} src={"/statics/svg2/success_green.svg"}/>

                <div className={styles.title2}>{"تغییر رمزعبور با موفقیت انجام شد"}</div>

                <MainButton  className={styles.submit4}
                loading={ps.loading}
                title={"صفحه اصلی"}
                onClick={p.goToHomePage}/>

            </div>
        )
    }
}