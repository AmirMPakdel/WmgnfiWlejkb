import StudentAuthModel from "@/models/components/modals/global/StudentAuthModel";
import StudentAuthModal from "@/views/components/modal/global/StudentAuthModal";
import chest from "@/utils/chest";
import { setCookie } from "@/utils/cookie";
import { secondsToTime } from "@/utils/time";
import Validation, { IsValid } from "@/utils/validation";
import Observer from "@/utils/observer";
import StudentModel from "@/models/global/StudentModel";
import Storage from "@/utils/storage";

export default class StudentAuthController{
    
    /**@param {StudentAuthModal} view*/
    constructor(view){
        this.view = view;
        this.model = new StudentAuthModel();
    }
    
    mobileConfirm(){

        if(this.lock)return;

        let res = this.mobilePageInputCheck();

        if(res){

            this.lock = true;

            this.view.setState({loading:true});

            let params = {
                phone_number : this.view.state.mobile
            }

            this.model.getPhoneNumberCheck(params, (err, data)=>{

                this.lock = false;

                if(data.result_code === env.SC.SUCCESS){

                    this.view.setState({page:"VerificationPage", loading:false});

                }else if(data.result_code === env.SC.REPETITIVE_PHONE_NUMBER){

                    this.view.setState({page:"PasswordPage", loading:false});

                }else{

                    this.view.setState({loading:false});
                }
            });
        }
    }

    mobilePageInputCheck(){

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

    passwordConfirm(){

        if(this.lock)return;

        let res = this.passwordPageInputCheck();

        if(res){

            this.lock = true;

            this.view.setState({loading:true});

            let vs = this.view.state;

            let params={
                phone_number: vs.mobile,
                password: vs.password
            }

            this.model.getLoginWithPassword(params, (err, data)=>{

                if(data.result_code === env.SC.SUCCESS){

                    this.view.setState({loading:false});

                    //remove last student data if exists
                    Storage.remove("student");

                    setCookie(env.STUDENT_TOKEN_KEY, data.data.token, 0);

                    //TODO: save user in localstorage

                    this.getStudent((student)=>{

                        Observer.execute("onStudentChange", student);
                        Observer.execute("onAuthenticate", student);
                        
                        chest.ModalLayout.closeAndDelete(1);
                    });

                }else{

                    this.view.setState({
                        loading:false,
                        password_error : "رمزعبور وارد شده اشتباه است."
                    });
                }

                this.lock = false;
            });
        }

    }

    passwordPageInputCheck(){
        
        let password_res = Validation.password(this.view.state.password);

        if(password_res.valid){

            this.view.setState({
                password_error:false,
            });

            return true;

        }else{

            this.view.setState({
                password_error:password_res.message,
            });

            return false;
        }
    }

    sendVerificationCode(cb){

        if(this.lock)return;

        this.lock = true;

        let params = {
            phone_number : this.view.state.mobile
        }

        this.model.getSendVerificationCode(params, (err, data)=>{

            if(typeof cb === "function")cb();

            if(data.result_code === env.SC.SUCCESS){

                this.startCountdown();

            }else if(data.result_code === env.SC.USER_ALREADY_VERIFIED){

                //TODO: what should be done here?
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
            
        }, env.TIMER_INTERVAL)
    }

    clearSmsCountdown(){
        clearInterval(this.view.sms_interval);
    }

    verificationConfirm(){

        if(this.lock)return;

        let res = this.verificationPageInputCheck();

        if(res){

            this.lock = true;

            this.view.setState({loading:true});

            let params = {
                code: this.view.state.verification_code,
                phone_number : this.view.state.mobile,
            }

            this.model.getCheckVerificationCode(params, (err, data)=>{

                if(data.result_code === env.SC.SUCCESS){
                    
                    this.clearSmsCountdown();

                    let user_id = data.data.student_id;

                    this.view.setState({
                        loading:false,
                        user_id,
                        page:"RegisterPage"
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

    verificationPageInputCheck(){

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

    onInput(key, v){
        this.view.state[key] = v;
        this.view.state[key+"_error"] = false;
        this.view.setState(this.view.state);
    }

    registerConfirm(){

        if(this.lock)return;

        let res = this.registerPageInputCheck();

        if(res){

            let vs = this.view.state;

            this.lock = true;

            this.view.setState({loading:true});

            let params = {
                student_id:vs.user_id,
                phone_number:vs.mobile,
                first_name:vs.first_name,
                last_name:vs.last_name,
                national_code:vs.national_code,
                password:vs.register_password,
            }
            
            this.model.getCompeleteRegisteration(params, (err, data)=>{

                if(data.result_code === env.SC.SUCCESS){

                    //remove last student data if exists
                    Storage.remove("student");

                    setCookie(env.STUDENT_TOKEN_KEY, data.data.token, 365);
                    
                    //TODO: save user in localstorage

                    this.getStudent((student)=>{

                        Observer.execute("onStudentChange", student);
                        Observer.execute("onAuthenticate", student);

                        chest.ModalLayout.closeAndDelete(1);
                    });

                }else if(data.result_code===env.SC.REPETITIVE_NATIONAL_CODE){

                    this.view.setState({loading:false});

                    chest.openNotification("کد ملی وارد شده قبلا ثبت شده است.");

                }else if(data.result_code===env.SC.INVALID_ID){

                    this.view.setState({loading:false});

                    chest.openNotification("DEV::user_id was invalid!");

                }else{
                    
                    this.view.setState({loading:false});
                }

                this.lock = false;
            });
        }
    }

    registerPageInputCheck(){

        let vs = this.view.state;
        let fn = Validation.persianName(vs.first_name);
        let ln = Validation.persianName(vs.last_name);
        let nc = Validation.nationalCode(vs.national_code);
        let pw = Validation.password(vs.register_password);

        let newState = {};
        let can = true;

        if(fn.valid){
            newState.first_name_error = false;
        }else{
            newState.first_name_error = fn.message;
            can = false;
        }

        if(ln.valid){
            newState.last_name_error = false;
        }else{
            newState.last_name_error = ln.message;
            can = false;
        }

        if(pw.valid){
            newState.register_password_error = false;
        }else{
            if(vs.register_password.length < 8){
                newState.register_password_error = "رمزعبور باید حداقل 8 کاراکتر باشد.";
            }else{
                newState.register_password_error = pw.message;
            }
            can = false;
        }

        
        if(pw.valid && vs.register_password === vs.password_confirm){
            newState.password_confirm_error = false;
        }else if(pw.valid && vs.register_password !== vs.password_confirm){
            newState.password_confirm_error = "تکرار رمزعبور اشتباه است.";
            can = false;
        }

        this.view.setState(newState);

        return can;
    }

    getStudent(cb){

        let studentModel = new StudentModel();
        studentModel.getStudent({}, (err, data)=>{

            if(data.result_code === env.SC.SUCCESS){

                cb(data.data);
            }
        });
    }
}