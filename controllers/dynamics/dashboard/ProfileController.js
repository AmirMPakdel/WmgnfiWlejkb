import ProfileModel from "@/models/dynamics/dashboard/ProfileModel";
import chest from "@/utils/chest";
import Validation from "@/utils/validation";
import Profile from "@/views/dynamics/dashboard/Profile";

export default class ProfileController{
    
    /**@param {Profile} view*/
    constructor(view){
        this.view = view;
        this.model = new ProfileModel();
    }
    
    
    loadUserProfile(){

        let v = this.view;

        v.setState({loading: true});

        this.model.getUserProfile(null, (err, data)=>{

            if(data.result_code === env.SC.SUCCESS){

                let d = data.data;
                
                let province_id = d.state?Number(d.state):null;
                let province_obj = {};
                let cities = [];

                if(province_id){
                    province_obj = FIND_PROVINCE_BY_ID(province_id);
                    cities = GET_CITIES_OF_PROVINCE(province_id);
                }

                let city_id = d.city?Number(d.city):null;
                let city_obj = {};

                if(city_id){
                    city_obj = FIND_CITY_BY_ID(city_id);                    
                }

                v.setState({
                    loading: false,
                    first_name: d.first_name,
                    last_name: d.last_name,
                    phone_number: d.phone_number,
                    email: d.email,
                    province_id,
                    province_obj,
                    city_id,
                    city_obj,
                    national_code: d.national_code,
                    national_card: d.national_cart_image,
                    //account owner -> ao
                    ao_first_name: d.account_owner_first_name,
                    ao_last_name: d.account_owner_last_name,
                    bank_name: d.bank,
                    account_number: d.account_number,
                    shaba: d.shaba_number,
                    a_card_number: d.credit_cart_number,
                });
            }
        });
    }

    onShowNationalCodeAlert(){

        chest.openNotification("برای ویرایش شماره ملی لطفا تصویر کارت ملی را ارسال نمایید تا بعد از تایید کارشناسان ما، کدملی  شما ویرایش شود.", "alert", {duration:8});
    }

    updateUserBaseInfo=()=>{

        if(this.view.state.baseInfoBtn_loading){return};

        let can = this.checkUserBaseInfoInput();

        if(!can){return};

        this.view.setState({baseInfoBtn_loading:true});

        let v = this.view;
        let vs = v.state;
        let params = {
            first_name: vs.first_name,
            last_name: vs.last_name,
            state: vs.province_id,
            city: vs.city_id,
            email: vs.email,
        };

        let nc_file = v.NationalCardInput.getFile();

        if(nc_file){

            this.getNationalCardUploadKey((uploadKey)=>{

                params.national_card = uploadKey;

                if(vs.national_card){

                    params.file_state = "ufs_replace";

                }else{

                    params.file_state = "ufs_new";
                }

                this.sendUserBaseInfoData(params);
            });

        }else{

            params.file_state = "ufs_no_change";

            this.sendUserBaseInfoData(params);
        }

    }

    checkUserBaseInfoInput(){

        let v = this.view;
        let vs = v.state;
        let can = true;

        if(vs.first_name.length < 2){
            chest.openNotification("نام وارد شده نا معتبر است.", "error");
            can = false;
        }
        if(vs.last_name.length < 2){
            chest.openNotification("نام خانوادگی وارد شده نا معتبر است.", "error");
            can = false;
        }
        if(!vs.province_id){
            chest.openNotification("استان خود را انتخاب نمایید.", "error");
            can = false;
        }
        if(!vs.city_id){
            chest.openNotification("شهر خود را انتخاب نمایید.", "error");
            can = false;
        }
        if(!Validation.email(vs.email).valid){
            chest.openNotification(Validation.email(vs.email).message, "error");
            can = false;
        }
        if(!v.NationalCardInput.getFile() && !vs.national_card){
            chest.openNotification("تصویر کارت ملی خود را آپلود نمایید.", "error");
            can = false;
        }
        return can;
    }

    updateBankAccountInfo(){
        
        if(this.view.state.bankInfoBtn_loading){return};

        let can = this.checkBankAccountInfoInput();

        if(!can){return};

        let v = this.view;
        let vs = v.state;

        v.setState({bankInfoBtn_loading:true});

        let params = {
            account_owner_first_name: vs.ao_first_name,
            account_owner_last_name: vs.ao_last_name,
            bank: vs.bank_name,
            account_number: vs.account_number,
            shaba_number: vs.shaba,
            credit_cart_number: vs.a_card_number,
        }

        this.model.updateUserBankAccountInfo(params, (err, data)=>{

            if(data.result_code === env.SC.SUCCESS){

                chest.openNotification("اطلاعات حساب بانکی شما با موفقیت بروزرسانی شد.", "success");
            }

            v.setState({bankInfoBtn_loading:false});
        });
    }

    checkBankAccountInfoInput(){

        let v = this.view;
        let vs = v.state;
        let can = true;

        if(vs.ao_first_name.length < 2){
            chest.openNotification("نام دارنده حساب وارد شده نا معتبر است.", "error");
            can = false;
        }
        if(vs.ao_last_name.length < 2){
            chest.openNotification("نام خانوادگی دارنده حساب وارد شده نا معتبر است.", "error");
            can = false;
        }
        if(!vs.bank_name){
            chest.openNotification("نام بانک را وارد نمایید.", "error");
            can = false;
        }
        if(!vs.account_number){
            chest.openNotification("شماره حساب را وارد نمایید.", "error");
            can = false;
        }
        if(!vs.shaba){
            chest.openNotification("شماره شبا را وارد نمایید.", "error");
            can = false;
        }
        if(!vs.a_card_number){
            chest.openNotification("شماره کارت را وارد نمایید.", "error");
            can = false;
        }
        return can;
    }

    sendUserBaseInfoData=(params)=>{

        this.model.updateUserBaseInfo(params, (err, data)=>{

            if(data.result_code === env.SC.SUCCESS){

                chest.openNotification("اطلاعات حساب کاربری شما با موفقیت بروزرسانی شد.", "success");
            }

            this.view.setState({baseInfoBtn_loading:false});
        });
    }

    getNationalCardUploadKey(cb){

        let vs = this.view.state;

        let params = {
            file_size: vs.file.size,
            file_type: fileType2Ext(vs.file.type),
            upload_type: env.UT.NATIONA_____,
        }

        if(this.view.props.uploadKey){
            params.old_upload_key = this.view.props.uploadKey;
        }

        this.model.getNationalCardUploadKey(params, (err, data)=>{

            if(data.result_code === env.SC.SUCCESS){
                
                // this.view.setState({upload_key:data.data.upload_key}, ()=>{

                //     this.checkUploadKey(cb);
                // });
            }
        })
    }
}