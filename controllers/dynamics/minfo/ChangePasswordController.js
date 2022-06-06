import ChangePasswordModel from "@/models/dynamics/minfo/ChangePasswordModel";
import chest from "@/utils/chest";
import { secondsToTime } from "@/utils/time";
import Validation from "@/utils/validation";
import ChangePassword from "@/views/dynamics/minfo/ChangePassword";

export default class ChangePasswordController{
    
    /**@param {ChangePassword} view*/
    constructor(view){
        this.view = view;
        this.model = new ChangePasswordModel();
    }
    
    onMobileConfirm(){

        let res = this.step1InputCheck();

        if(res){

            let params = {
                phone_number: this.view.state.mobile
            }

            this.view.setState({loading:true});

            this.model.resetRequest(params, (err, data)=>{

                if(data.result_code === env.SC.SUCCESS){

                    this.view.state.step = 2;
                    this.startCountdown();

                }else if(data.result_code === env.SC.USER_NOT_FOUND){

                    chest.openNotification("شماره موبایل اشتباه است.", "error");

                }else if(data.result_code === env.SC.PASSWORD_RESET_REQUEST_LIMIT_ERROR){

                    chest.openNotification("برای تلاش مجدد لطفا اندکی صبر فرمایید.", "error");
                }

                this.view.setState({loading:false});
            });
        }
    }

    step1InputCheck(){

        let mobile_res = Validation.phoneNumber(this.view.state.mobile);

        if(mobile_res.valid){

            this.view.setState({
                mobile_error:false,
            });

            return true;

        }else{

            this.view.setState({
                mobile_error:mobile_res.message,
            });

            return false;
        }
    }

    onBacktoInsertPhonenumber(){

        if(this.lock || this.view.state.loading){return;}

        this.view.setState({step:1});
    }

    onSendSmsCode(){

        if(this.lock)return;

        this.lock = true;

        let params = {
            phone_number : this.view.state.mobile
        }

        this.model.resetRequest(params, (err, data)=>{

            if(data.result_code === env.SC.SUCCESS){
                
                this.view.state.show_timer_bar=true;
                this.startCountdown();

            }else if(data.result_code === env.SC.USER_NOT_FOUND){

                chest.openNotification("شماره موبایل اشتباه است.", "error");

            }else if(data.result_code === env.SC.PASSWORD_RESET_REQUEST_LIMIT_ERROR){

                chest.openNotification("برای تلاش مجدد لطفا اندکی صبر فرمایید.", "error");
            }

            this.lock = false;
        });
    }

    startCountdown(){

        this.clearSmsCountdown();
        this.view.state.can_send_sms_again = false;
        this.view.state.timer = env.SMS_TIMER;
        this.view.state.timer_text = secondsToTime(this.view.state.timer);
        
        this.view.setState({
            timer : this.view.state.timer,
            timer_text: secondsToTime(this.view.state.timer),
        });

        this.view.sms_interval = setInterval(()=>{

            if(this.view.state.timer){
                this.view.setState({
                    timer : this.view.state.timer-1,
                    timer_text: secondsToTime(this.view.state.timer-1),
                });
            }else{
                this.view.setState({
                    can_send_sms_again:true
                });
                this.clearSmsCountdown();
            }
            
        }, 80)
    }

    clearSmsCountdown(){
        clearInterval(this.view.sms_interval);
    }

    onSmsCodeConfirm(){

        if(this.lock)return;

        let res = this.onStep2InputCheck();

        if(res){

            this.lock = true;

            this.view.setState({loading:true});

            let params = {
                token: this.view.state.verification_code,
            }

            this.model.checkValidationCode(params, (err, data)=>{

                if(data.result_code === env.SC.SUCCESS){
                    
                    this.clearSmsCountdown();

                    this.view.state.step = 3;

                }else if(data.result_code === env.SC.INVALID_TOKEN){

                    this.view.state.verification_code_error = "کد تایید وارد شده اشتباه است.";

                }else if(data.result_code === env.SC.PASSWORD_RESET_REQUEST_LIMIT_ERROR){

                    chest.openNotification("برای تلاش مجدد لطفا اندکی صبر فرمایید.", "error");
                }

                this.view.setState({loading:false});

                this.lock = false;
            });
        }
    }

    onStep2InputCheck(){

        let res = Validation.verificationCode(this.view.state.verification_code);

        if(res.valid){

            this.view.setState({
                verification_code_error:false,
            });
            return true;

        }else{

            this.view.setState({
                verification_code_error:res.message,
            });
            return false;
        }
    }
    
    onPasswordConfirm(){

        if(this.lock)return;

        let res = this.onStep3InputCheck();

        if(res){

            let vs = this.view.state;

            this.lock = true;

            this.view.setState({loading:true});

            let params = {
                token: this.view.state.verification_code,
                password:vs.password,
            }
            
            this.model.resetPassword(params, (err, data)=>{

                if(data.result_code===env.SC.SUCCESS){

                    this.view.setState({step:4});

                }else if(data.result_code===env.SC.INVALID_TOKEN){
                    
                    chest.openNotification("کد تایید وارد شده اشتباه است.", "error");
                    
                }else if(data.result_code===env.SC.USER_NOT_FOUND){

                    chest.openNotification("برای تلاش مجدد لطفا اندکی صبر فرمایید.", "error");
                }

                this.view.setState({loading:false});

                this.lock = false;
            });
        }
    }

    onStep3InputCheck(){

        let vs = this.view.state;
        let pw = Validation.password(vs.password);

        let newState = {};
        let can = true;

        if(pw.valid){
            newState.password_error = false;
        }else{
            newState.password_error = pw.message;
            can = false;
        }
        
        if(pw.valid && vs.password === vs.password_confirm){
            newState.password_confirm_error = false;
        }else if(pw.valid && vs.password_error !== vs.password_confirm){
            newState.password_confirm_error = "تکرار رمزعبور اشتباه است.";
            can = false;
        }

        this.view.setState(newState);

        return can;
    }

    goToHomePage(){
        window.location.href= env.PATHS.USER_AUTHENTICATION;
    }
}