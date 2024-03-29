import React, { Component } from "react";
import AuthController from "@/controllers/dynamics/minfo/AuthController";
import { InputFilter } from "@/utils/validation";
import Loading from "@/views/components/global/Loading";
import MainButton from "@/views/components/global/MainButton";
import ReactiveTextInput from "@/views/components/global/ReactiveTextInput";
import TextInput from "@/views/components/global/TextInput";
import styles from "./Auth.module.css";

/**
* Props of Auth Component
* @typedef Props
* @property {string} className
* @property {React.CSSProperties} style
* 
* @extends {Component<Props>}
*/
export default class Auth extends Component {

    constructor(props){

        super(props);

        this.controller = new AuthController(this);

        this.state={
            page: "MobilePage",
            loading:false,

            mobile:"",
            password:"",
            verification_code:"",

            user_id:"",// will be set by server
            subdomain:"",
            first_name:"",
            last_name:"",
            national_code:"",
            register_password:"",
            password_confirm:"",

            mobile_error:false,
            password_error:false,
            verification_code_error:false,

            subdomain_status: "",
            subdomain_message: "",
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


        changeCSSVars(themes.userDefault);
        this.controller.setupPageTitle();
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
        window.location.href = env.PATHS.CHANGE_PASSWORD_PAGE;
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

    onRegisterSuccessConfirm=()=>{
        
        this.controller.onRegisterSuccessConfirm();
    }
    
    render(){
        return(
            <div className={styles.con}>

                <div className={styles.wrapper_card+" sm_card_shd"}>

                    {
                        this.state.page === "Loading"?
                        <Loading style={{minHeight:"50vh"}}/>:null
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
                    {
                        this.state.page === "RegisterSuccessPage"?
                        <RegisterSuccessPage parent={this}/>:null
                    }
                    
                </div>

            </div>
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
            <div className={styles.con1}>

                <div className={styles.title1}>{"ثبت نام در مینفو"}</div>

                <div className={styles.sub1}>
                    {"برای ثبت نام یا ورود ابتدا شماره موبایل خود را وارد نمایید."}
                </div>

                <TextInput placeholder={"شماره موبایل"}
                ref={r=>this.TextInput=r}
                className={styles.comp1+" blc2"}
                value={ps.mobile}
                error={ps.mobile_error}
                maxLength={11}
                inputFilter={InputFilter.phoneNumberInputFilter}
                onChange={p.onMobileInput}
                OnEnterKeyPressed={p.onMobileConfirm}/>

                <MainButton className={styles.submit1}
                loading={ps.loading}
                title={"تایید"}
                onClick={p.onMobileConfirm}/>

                <p className={styles.sub2}>
                    با ورود و یا ثبت نام در مینفو شما 
                    <a href={env.PATHS.MINFO_TERMS}> شرایط و قوانین </a>
                    استفاده از سرویس های سایت مینفو و 
                    <a href={env.PATHS.MINFO_PRIVACY}> قوانین حریم خصوصی </a>
                    آن را می‌پذیرید.
                </p>

            </div>
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
            <div className={styles.con1}>

                <div className={styles.title1}>{"ورود"}</div>
                    
                <div className={styles.sub1}>
                    {"برای ورود، رمزعبور حساب کاربری خودرا وارد نمایید."}
                </div>

                <TextInput placeholder={"رمز عبور"}
                className={styles.comp1+" blc2"}
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

                <MainButton className={styles.submit2}
                title={"تایید"}
                loading={ps.loading}
                onClick={p.onPasswordConfirm}/>

            </div>
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
            <div className={styles.con1}>

                <div className={styles.title1}>{"کد تایید"}</div>
                        
                <div className={styles.sub1}>
                    {"حساب کاربری با این شماره موبایل وجود ندارد. برای ثبت نام کد ارسالی به شماره موبایل "}
                    <span className={"tc2"}>{ps.mobile}</span>
                    {" را وارد نمایید."}
                </div>

                <TextInput placeholder={"کد تایید"}
                className={styles.comp1+" blc2"}
                ref={r=>this.TextInput=r}
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

                <MainButton className={styles.submit3}
                title={"تایید"}
                loading={ps.loading}
                onClick={p.onSmsCodeConfirm}/>

            </div>
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
        this.ReactiveTextInput.input.focus();
    }

    render(){
        let p = this.props.parent;
        let ps = p.state;
        return(
            <div className={styles.con1}>

                <div className={styles.title2}>{"ثبت نام در مینفو"}</div>

                <ReactiveTextInput placeholder={"نام سایت"}
                className={styles.comp2+" blc2"}
                ref={r=>this.ReactiveTextInput=r}
                value={ps.subdomain}
                status={ps.subdomain_status}
                message={ps.subdomain_message}
                maxLength={24}
                inputFilter={InputFilter.tenantInputFilter}
                onChange={p.onSubdomain}/>

                <TextInput placeholder={"نام"}
                className={styles.comp2+" blc2"}
                value={ps.first_name}
                style={{marginTop:"0rem"}}
                error={ps.first_name_error}
                inputFilter={InputFilter.persianNameInputFilter}
                onChange={(v)=>p.onInput("first_name",v)}/>

                <TextInput placeholder={"نام خانوادگی"}
                className={styles.comp2+" blc2"}
                value={ps.last_name}
                style={{marginTop:"0rem"}}
                error={ps.last_name_error}
                inputFilter={InputFilter.persianNameInputFilter}
                onChange={(v)=>p.onInput("last_name",v)}/>

                <TextInput placeholder={"کدملی"}
                className={styles.comp2+" blc2"}
                value={ps.national_code}
                style={{marginTop:"0rem"}}
                error={ps.national_code_error}
                inputFilter={InputFilter.nationalCodeInputFilter}
                onChange={(v)=>p.onInput("national_code",v)}/>

                <TextInput placeholder={"رمزعبور"}
                className={styles.comp2+" blc2"}
                value={ps.register_password}
                style={{marginTop:"0rem"}}
                type={"password"}
                autocomplete={"new-password"}
                error={ps.register_password_error}
                inputFilter={InputFilter.passwordInputFilter}
                onChange={(v)=>p.onInput("register_password",v)}/>

                <TextInput placeholder={"تکرار رمزعبور"}
                className={styles.comp2+" blc2"}
                value={ps.password_confirm}
                style={{marginTop:"0rem"}}
                type={"password"}
                error={ps.password_confirm_error}
                inputFilter={InputFilter.passwordInputFilter}
                onChange={(v)=>p.onInput("password_confirm",v)}
                OnEnterKeyPressed={p.onRegisterConfirm}/>

                <MainButton className={styles.submit4}
                title={"ثبت نام"}
                loading={ps.loading}
                onClick={p.onRegisterConfirm}/>

                {/*for the browsers auto username password fill*/}
                <input style={{height:0}} onChange={()=>{}} autoComplete="username" 
                type={"text"} value={ps.mobile}/>

            </div>
        )
    }
}

/**
* Props of RegisterSuccessPage Component
* @typedef RegisterSuccessProps
* @property {Auth} parent
* 
* @extends {Component<RegisterSuccessProps>}
*/
class RegisterSuccessPage extends Component{

    componentDidMount(){
        window.addEventListener("keyup", this.onEnterKeyPressed);
    }

    componentWillUnmount(){
        window.removeEventListener("keyup", this.onEnterKeyPressed);
    }

    onEnterKeyPressed = (e)=>{
        if (e.keyCode === 13) {
            e.preventDefault();
            p.onRegisterSuccessConfirm();
        }
    }

    render(){
        let p = this.props.parent;
        let ps = p.state;
        return(
            <div className={styles.con1}>

                <img className={styles.image1} src={"/statics/svg2/success_green.svg"}/>

                <div className={styles.title1}>{"به مینفو خوش آمدید"}</div>
                
                <MainButton className={styles.submit5}
                title={"ورود"}
                onClick={p.onRegisterSuccessConfirm}/>

            </div>
        )
    }
}
