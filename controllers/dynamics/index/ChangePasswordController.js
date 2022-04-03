import ChangePasswordModel from "@/models/dynamics/index/ChangePasswordModel";
import { secondsToTime } from "@/utils/time";
import Validation from "@/utils/validation";
import ChangePassword from "@/views/dynamics/index/ChangePassword";

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

    onSendSmsCode(){

        if(this.lock)return;

        this.lock = true;

        let params = {
            phone_number : this.view.state.mobile
        }

        this.model.sendVerificationCode(params, (err, data)=>{

            if(typeof cb === "function")cb();

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
    
    onPasswordConfirm(){

        if(this.lock)return;

        let res = this.onStep2InputCheck();

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

    onStep2InputCheck(){

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
}