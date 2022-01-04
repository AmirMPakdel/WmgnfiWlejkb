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

        //this.controller = new ChangePasswordController(this);

        this.state={
            page: "RegisterPage",

            mobile:"",
            verification_code:"",
            register_password:"",
            password_confirm:"",


            timer:0,
            timer_text:"",
        }
    }

    componentDidMount(){
    }

    onMobileInput=(v)=>{
        this.setState({mobile:v, mobile_error:false});
    }

    onMobileConfirm=()=>{
        this.controller.mobileConfirm();
    }
    
    render(){
        return(
            <div style={{width:"100vw", display:"flex", flexDirection:"column", alignItems:"center"}}>

                <h1 style={{marginTop:"4rem"}}>ChangePassword Page</h1>

                {
                    this.state.page === "VerificationPage"?
                    <VerificationPage parent={this}/>:null
                }
                {
                    this.state.page === "NewPasswordPage"?
                    <NewPasswordPage parent={this}/>:null

                }
                {
                    this.state.page === "NewPasswordSuccessPage"?
                    <NewPasswordSuccessPage parent={this}/>:null
                }
                
            </div>
        )
    }
}

/**
* Props of VerificationPage Component
* @typedef Props
* @property {ChangePassword} parent
* 
* @extends {Component<Props>}
*/
class VerificationPage extends Component{

    render(){
        let p = this.props.parent;
        let ps = p.state;
        return(
            <>
                    
            <div className={styles.info}>
                {"برای تغییر رمزعبور ابتدا کد ارسالی به شماره موبایل خود را وارد نمایید."}
            </div>

            <TextInput placeholder={"کد تایید"}
            className={styles.btn+" blc2"}
            value={this.state.sms_code}
            onChange={this.onSmsCodeInput}/>

            {
                this.state.can_send_sms_again?

                <a style={{marginTop:"0.8rem"}}
                onClick={this.onSendSmsAgain}>
                    {"ارسال مجدد"}
                </a>
                :
                <div className={"cpnts"} style={{marginTop:"0.8rem", display:"flex", direction:"rtl"}}>
                    {"ارسال مجدد کد تا "}
                    <div style={{minWidth:"2.6rem", textAlign:"center", fontWeight:700}}>{this.state.timer_text}</div>
                    {" دیگر"}
                </div>
            }

            <MainButton  style={{marginTop:"1rem", width:"20rem"}} 
            title={"تایید"}
            onClick={this.onSmsCodeConfirm}/>

            </>
        )
    }
}

/**
* Props of NewPasswordPage Component
* @typedef Props
* @property {ChangePassword} parent
* 
* @extends {Component<Props>}
*/
class NewPasswordPage extends Component{

    render(){
        let p = this.props.parent;
        let ps = p.state;
        return(
            <>

            <div className={styles.info}>
                {"رمزعبور جدید حساب کاربری خود را وارد نمایید."}
            </div>

            <TextInput placeholder={"رمزعبور جدید"}
            className={styles.btn+" blc2"}
            value={this.state.sms_code}
            onChange={this.onSmsCodeInput}/>

            <TextInput placeholder={"تکرار رمزعبور جدید"}
            className={styles.btn+" blc2"}
            value={this.state.sms_code}
            style={{marginTop:"0.8rem"}}
            onChange={this.onSmsCodeInput}/>

            <MainButton  style={{marginTop:"2rem", width:"20rem"}} 
            title={"تایید"}
            onClick={this.onSmsCodeConfirm}/>

            </>
        )
    }
}

/**
* Props of NewPasswordSuccessPage Component
* @typedef Props
* @property {ChangePassword} parent
* 
* @extends {Component<Props>}
*/
class NewPasswordSuccessPage extends Component{

    render(){
        let p = this.props.parent;
        let ps = p.state;
        return(
            <>

            <div className={styles.info}>
                <img style={{width:"4rem", marginBottom:"2rem"}} src={"/svg2/success_green.svg"}/>
                {"رمزعبور حساب کاربری شما با موفقیت تغییر کرد."}
            </div>

            <MainButton  style={{marginTop:"4rem", width:"20rem"}} 
            title={"ادامه"}
            onClick={this.onSmsCodeConfirm}/>

            </>
        )
    }
}