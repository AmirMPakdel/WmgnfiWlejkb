import React, { Component } from "react";
import styles from "./StudentAuthModal.module.css";
import CrossSvg from "@/views/svgs/Cross";
import chest from "@/utils/chest";
import TextInput from "../../global/TextInput";
import MainButton from "../../global/MainButton";
import { InputFilter } from "@/utils/validation";
import Loading from "../../global/Loading";
import StudentAuthController from "@/controllers/components/modals/global/StudentAuthController";
import CloseModalLayout from "../CloseModalLayout";

/**
* Props of StudentAuthModal Component
* @typedef Props
* @property {string} className
* @property {React.CSSProperties} style
* @property {boolean} closable
* 
* @extends {Component<Props>}
*/
export default class StudentAuthModal extends Component {
    
    constructor(props){
        super(props);
        this.controller = new StudentAuthController(this);
        this.state = {
            page: "MobilePage",
            loading:false,

            mobile:"",
            password:"",
            verification_code:"",

            user_id:"",// will be set by server
            first_name:"",
            last_name:"",
            national_code:"",
            register_password:"",
            password_confirm:"",

            mobile_error:false,
            password_error:false,
            verification_code_error:false,

            first_name_error:"",
            last_name_error:"",
            national_code_error:"",
            register_password_error:"",
            password_confirm_error:"",

            timer:0,
            timer_text:"",
            can_send_sms_again:false,
        }
    }
    
    componentDidMount(){
    }

    onCancel=()=>{
        chest.ModalLayout.visibleToggle(1, false);
    }

    onMobileInput=(v)=>{
        this.setState({mobile:v, mobile_error:false});
    }

    onMobileConfirm=()=>{
        this.controller.mobileConfirm();
    }

    onPasswordInput=(v)=>{
        this.setState({password:v});
    }

    onPasswordConfirm=()=>{
        this.controller.passwordConfirm();
    }

    onForgotLink=()=>{
        window.location.href = env.PATHS.STUDENT_CHANGE_PASSWORD;
    }

    onVerificationCodeInput=(v)=>{
        this.setState({verification_code:v,  verification_code_error:false});
    }

    startSmsCountdown=()=>{
        this.controller.startSmsCountdown();
    }

    onSendSmsAgain=()=>{
        this.controller.sendVerificationCode();
    }

    onSmsCodeConfirm=()=>{
        this.controller.verificationConfirm();
    }

    onSubdomain=(v)=>{
        this.setState({subdomain:v}, this.controller.subdomainInputCheck);
    }

    onInput=(key,v)=>{
        this.controller.onInput(key, v);
    }

    onRegisterConfirm=()=>{
        this.controller.registerConfirm();
    }
    
    render(){
        return(
            <CloseModalLayout className={styles.con+" bgw xl_card_shd"}
            wrapperClass={styles.wrapper}
            closable={this.props.closable}
            onClose={this.onCancel}>
            {
                this.state.page === "Loading"?
                <Loading/>:null
            }
            {
                this.state.page === "MobilePage"?
                <MobilePage parent={this}/>:null
            }
            {
                this.state.page === "PasswordPage"?
                <PasswordPage parent={this}/>:null
            }
            {
                this.state.page === "VerificationPage"?
                <VerificationPage parent={this}/>:null
            }
            {
                this.state.page === "RegisterPage"?
                <RegisterPage parent={this}/>:null
            }
            </CloseModalLayout>
        )
    }
}

/**
* Props of MobilePage Component
* @typedef MobilePageProps
* @property {Auth} parent
* 
* @extends {Component<MobilePageProps>}
*/
class MobilePage extends Component{

    componentDidMount(){
        this.TextInput.input.focus();
    }

    render(){
        let p = this.props.parent;
        let ps = p.state;
        return(
            <>

            <div className={styles.title1+" hrot fdc1"}>{"ورود‌ /‌ ثبت نام"}</div>

            <div className={styles.info1}>
                {"برای ثبت نام یا ورود ابتدا شماره موبایل خود را وارد نمایید."}
            </div>

            <TextInput placeholder={"شماره موبایل"}
            ref={r=>this.TextInput=r}
            className={styles.input1+" blc2"}
            value={ps.mobile}
            error={ps.mobile_error}
            maxLength={11}
            inputFilter={InputFilter.phoneNumberInputFilter}
            onChange={p.onMobileInput}
            OnEnterKeyPressed={p.onMobileConfirm}/>

            <MainButton
            className={styles.btn1}
            loading={ps.loading}
            title={"تایید"}
            onClick={p.onMobileConfirm}/>

            <p style={{direction:"rtl", maxWidth:"18rem", textAlign:"center", marginTop:"1rem", fontSize:"11px"}}>
                با ورود و یا ثبت نام شما 
                <a href={env.PATHS.STUDENT_RULES} target="_blank" rel="noopener noreferrer"> شرایط و قوانین </a>
                استفاده از خدمات و محصولات سایت را می‌پذیرید.
            </p>

            </>
        )
    }
}

/**
* Props of PasswordPage Component
* @typedef PasswordPageProps
* @property {Auth} parent
* 
* @extends {Component<PasswordPageProps>}
*/
class PasswordPage extends Component{

    componentDidMount(){
        this.TextInput.input.focus();
    }

    render(){
        let p = this.props.parent;
        let ps = p.state;
        return(
            <>

            <div className={styles.title1+" hrot fdc1"}>{"ورود"}</div>
                    
            <div className={styles.info1}>
                {"برای ورود، رمزعبور حساب کاربری خودرا وارد نمایید."}
            </div>

            <TextInput placeholder={"رمز عبور"}
            className={styles.input1+" blc2"}
            ref={r=>this.TextInput=r}
            value={ps.password}
            error={ps.password_error}
            type={"password"}
            inputFilter={InputFilter.passwordInputFilter}
            onChange={p.onPasswordInput}
            OnEnterKeyPressed={p.onPasswordConfirm}/>

            <a onClick={p.onForgotLink}
            style={{direction:"rtl", textAlign:"center", marginTop:"1rem", fontSize:"13px"}}>
                {"فراموشی رمزعبور"}
            </a>

            <MainButton
            className={styles.btn1}
            title={"تایید"}
            loading={ps.loading}
            onClick={p.onPasswordConfirm}/>

            </>
        )
    }
}

/**
* Props of VerificationPage Component
* @typedef VerificationPageProps
* @property {Auth} parent
* 
* @extends {Component<VerificationPageProps>}
*/
class VerificationPage extends Component{

    state={
        show_timer_bar:false,
    }

    componentDidMount(){

        this.props.parent.controller.sendVerificationCode(()=>{
            this.setState({show_timer_bar:true});
        });

        this.TextInput.input.focus();
    }

    render(){
        let p = this.props.parent;
        let ps = p.state;
        return(
            <>

            <div className={styles.title1+" hrot fdc1"}>{"کد تایید"}</div>
                        
            <div className={styles.info1} style={{display:"inline"}}>
                {"حساب کاربری با این شماره موبایل وجود ندارد. برای ثبت نام کد ارسالی به شماره موبایل "}
                <span className={"tc2"}>{ps.mobile}</span>
                {" را وارد نمایید."}
            </div>

            <TextInput placeholder={"کد تایید"}
            className={styles.input1+" blc2"}
            ref={r=>this.TextInput=r}
            style={{marginBottom:"0.5rem"}}
            inputStyle={{textAlign:"center", direction:"ltr"}}
            value={ps.sms_code}
            error={ps.verification_code_error}
            inputFilter={InputFilter.verificationCodeInputFilter}
            onChange={p.onVerificationCodeInput}
            OnEnterKeyPressed={p.onSmsCodeConfirm}/>

            {
                this.state.show_timer_bar?
                <div style={{height:"3rem", display:"flex", alignItems:"center"}}>
                {
                    ps.can_send_sms_again?
    
                    <a  onClick={p.onSendSmsAgain}>
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

            <MainButton
            className={styles.btn1}
            title={"تایید"}
            loading={ps.loading}
            onClick={p.onSmsCodeConfirm}/>

            </>
        )
    }
}

/**
* Props of RegisterPage Component
* @typedef RegisterPageProps
* @property {Auth} parent
* 
* @extends {Component<RegisterPageProps>}
*/
class RegisterPage extends Component{

    componentDidMount(){
        this.TextInput.input.focus();
    }

    render(){
        let p = this.props.parent;
        let ps = p.state;
        return(
            <div className={styles.scroll_wrapper}>

            <div className={styles.title1+" hrot fdc1"}>{"ثبت نام"}</div>

            <div style={{marginTop:"1rem"}}/>

            <TextInput placeholder={"نام"}
            className={styles.input1+" blc2"}
            ref={r=>this.TextInput=r}
            value={ps.first_name}
            style={{marginTop:"0rem"}}
            error={ps.first_name_error}
            inputFilter={InputFilter.persianNameInputFilter}
            onChange={(v)=>p.onInput("first_name",v)}/>

            <TextInput placeholder={"نام خانوادگی"}
            className={styles.input1+" blc2"}
            value={ps.last_name}
            style={{marginTop:"0rem"}}
            error={ps.last_name_error}
            inputFilter={InputFilter.persianNameInputFilter}
            onChange={(v)=>p.onInput("last_name",v)}/>

            <TextInput placeholder={"کدملی"}
            className={styles.input1+" blc2"}
            value={ps.national_code}
            style={{marginTop:"0rem"}}
            error={ps.national_code_error}
            inputFilter={InputFilter.nationalCodeInputFilter}
            onChange={(v)=>p.onInput("national_code",v)}/>

            <TextInput placeholder={"رمزعبور"}
            className={styles.input1+" blc2"}
            value={ps.register_password}
            style={{marginTop:"0rem"}}
            type={"password"}
            autocomplete={"new-password"}
            error={ps.register_password_error}
            inputFilter={InputFilter.passwordInputFilter}
            onChange={(v)=>p.onInput("register_password",v)}/>

            <TextInput placeholder={"تکرار رمزعبور"}
            className={styles.input1+" blc2"}
            value={ps.password_confirm}
            style={{marginTop:"0rem"}}
            type={"password"}
            error={ps.password_confirm_error}
            inputFilter={InputFilter.passwordInputFilter}
            onChange={(v)=>p.onInput("password_confirm",v)}
            OnEnterKeyPressed={p.onRegisterConfirm}/>

            <MainButton
            className={styles.btn1}
            title={"ثبت نام"}
            loading={ps.loading}
            onClick={p.onRegisterConfirm}/>

            {/*for the browsers auto username password fill*/}
            <input style={{height:0}} autoComplete="username" type={"text"} value={ps.mobile}/>

            </div>
        )
    }
}