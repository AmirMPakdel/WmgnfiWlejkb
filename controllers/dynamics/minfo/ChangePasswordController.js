import ChangePasswordModel from "@/models/dynamics/minfo/ChangePasswordModel";
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

            this.view.setState({step:2});
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

        this.model.sendVerificationCode(params, (err, data)=>{

            if(typeof cb === "function")cb();

            this.view.state.show_timer_bar=true;

            if(data.result_code === env.SC.SUCCESS){

                this.startCountdown();

            }else if(data.result_code === env.SC.USER_ALREADY_VERIFIED){

                //TODO: what to do?
                this.view.setState({loading:false});

            }else{

                //TODO: handle other stuff?
                this.view.setState({loading:false});
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
                code: this.view.state.verification_code,
                phone_number : this.view.state.mobile,
            }

            this.model.verifyCode(params, (err, data)=>{

                if(data.result_code === env.SC.SUCCESS){
                    
                    this.clearSmsCountdown();

                    this.view.setState({
                        loading:false,
                        step:3,
                    });

                }else if(data.result_code === env.SC.INVALID_VERIFICATION_CODE){

                    this.view.setState({
                        loading:false,
                        verification_code_error: "کد تایید وارد شده اشتباه است."
                    });

                }else{

                    this.view.setState({loading:false});
                }

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
                password:vs.password,
            }
            
            this.model.saveNewPassword(params, (err, data)=>{

                if(data.result_code===env.SC.SUCCESS){

                    this.view.setState({step:4});

                }else{
                    
                    //show error
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
        window.location.href="/minfo/auth";
    }
}