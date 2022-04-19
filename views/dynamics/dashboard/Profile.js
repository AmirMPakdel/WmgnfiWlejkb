import ProfileController from "@/controllers/dynamics/dashboard/ProfileController";
import Observer from "@/utils/observer";
import { InputFilter } from "@/utils/validation";
import ImageInput from "@/views/components/global/ImageInput";
import Loading from "@/views/components/global/Loading";
import MainButton from "@/views/components/global/MainButton";
import SelectSearch from "@/views/components/global/SelectSearch";
import TextInput from "@/views/components/global/TextInput";
import EducatorDashboardLayout from "@/views/layouts/EducatorDashboardLayout";
import WrapperT1 from "@/views/layouts/WrapperT1";
import React, { Component } from "react";
import styles from "./Profile.module.css";

/**
* Props of Profile Component
* @typedef Props
* @property {string} className
* @property {React.CSSProperties} style
* 
* @extends {Component<Props>}
*/
export default class Profile extends Component {
    
    constructor(props){
        super(props);
        this.controller = new ProfileController(this);
        this.state = {
            loading: false,
            baseInfoBtn_loading:false,
            bankInfoBtn_loading:false,

            first_name:"",
            last_name: "",
            phone_number: "",
            email: "",
            province_id: null,
            province_obj:{},
            city_id: null,
            city_obj: {},
            national_code: "",
            national_card: null,
            //account owner -> ao
            ao_first_name:"",
            ao_last_name:"",
            bank_name:"",
            account_number:"",
            shaba: "",
            a_card_number: "",

            //errors
            first_name_error:null,
            last_name_error:null,
            email_error: null,
            national_card_error: null,
            ao_first_name_error: null,
            ao_last_name_error: null,
            bank_name_error: null,
            account_number_error: null,
            shaba_error: null,
            a_card_number_error: null,
        }

        Observer.add("onAuthenticate", this.loadUserInfo);
    }
    
    componentDidMount(){
    }

    loadUserInfo=()=>{

        this.controller.loadUserProfile();
    }

    updateUserBaseInfo=()=>{

        this.controller.updateUserBaseInfo();
    }

    updateBankAccountInfo=()=>{
        
        this.controller.updateBankAccountInfo();
    }

    onProvinceSelect=(id, obj)=>{

        if(id === this.state.province_id){return}

        let cities = GET_CITIES_OF_PROVINCE(id);

        this.setState({
            province_id: id,
            province_title: obj.title,
            city_id: null,
            city_obj: {},
            cities
        });
    }

    onCitySelect=(id, obj)=>{
        this.setState({
            city_id:id,
            city_title: obj.title,
        });
    }

    onInput=(k,v)=>{
        this.state[k] = v;
        this.setState(this.state);
    }

    onShowNationalCodeAlert=()=>{

        this.controller.onShowNationalCodeAlert();
    }

    onChangePhonenumber=()=>{

        //TOOD: add modal
    }

    onChangePassword=()=>{

        window.location.href = env.PATHS.STUDENT_CHANGE_PASSWORD;
    }
    
    render(){

        let s = this.state;

        return(
            
            <EducatorDashboardLayout accessType="userL1"
            showWithoutAuth={false}>

            <WrapperT1 className={styles.con}>

                {
                    this.state.loading?
                    <Loading className={styles.loading}/>:
                    <>
                    <div className={styles.wrapper_card+" sm_card_shd"}>

                        <div className={styles.title_card+" bdyt sm_card_shd"}>{"اطلاعات حساب کاربری"}</div>

                        <div className={styles.inputs_wrapper}>

                            <TextInput className={styles.input}
                            placeholder={"نام"}
                            value={this.state.first_name}
                            error={s.first_name_error}
                            onChange={(t)=>this.onInput("first_name",t)}
                            inputFilter={InputFilter.persianNameInputFilter}/>

                            <TextInput className={styles.input}
                            placeholder={"نام خانوادگی"}
                            value={this.state.last_name}
                            error={s.last_name_error}
                            onChange={(t)=>this.onInput("last_name",t)}
                            inputFilter={InputFilter.persianNameInputFilter}/>

                            <div className={styles.unchangable1+" blc2"}>

                                <div className={styles.unchangable_label+" bgw"}>{"شماره موبایل"}</div>

                                <div>{this.state.phone_number}</div>

                                <MainButton className={styles.unchangable_btn}
                                title={"ویرایش"}
                                onClick={this.onChangePhonenumber}/>

                            </div>

                            <div className={styles.unchangable1+" blc2"}>

                                <div className={styles.unchangable_label+" bgw"}>{"رمزعبور"}</div>

                                <div>{"***********"}</div>

                                <MainButton className={styles.unchangable_btn}
                                title={"ویرایش"}
                                onClick={this.onChangePassword}/>

                            </div>

                            <SelectSearch className={styles.input}
                            placeholder={"استان"} title={"استان"}
                            value={this.state.province_id}
                            onChange={this.onProvinceSelect}
                            options={PROVINCES}/>

                            <SelectSearch className={styles.input}
                            placeholder={"شهر"} title={"شهر"}
                            value={this.state.city_id}
                            onChange={this.onCitySelect}
                            options={this.state.cities}/>

                            <TextInput className={styles.input}
                            placeholder={"آدرس ایمیل"}
                            value={this.state.email}
                            error={s.email_error}
                            onChange={(t)=>this.onInput("email",t)}/>

                            <div className={styles.unchangable1+" blc2"} onClick={this.onShowNationalCodeAlert}>

                                <div className={styles.unchangable_label+" bgw"}>{"کدملی"}</div>

                                <div>{this.state.national_code}</div>

                            </div>

                            <ImageInput className={styles.input}
                            ref={r=>this.NationalCardInput=r}
                            title={"ارسال تصویر کارت ملی"}
                            aspectRatio={"16:9"}/>

                            <div className={styles.submit_wrapper}>

                                <MainButton className={styles.submit_btn}
                                title={"بروزرسانی"}
                                loading={this.state.baseInfoBtn_loading}
                                onClick={this.updateUserBaseInfo}/>

                            </div>

                        </div>

                    </div>

                    <div className={styles.wrapper_card+" sm_card_shd"}>

                        <div className={styles.title_card+" bdyt sm_card_shd"}>{"اطلاعات حساب بانکی"}</div>

                        <div className={styles.inputs_wrapper}>

                            <TextInput className={styles.input}
                            placeholder={"نام دارنده حساب"}
                            error={s.first_name_error}
                            value={this.state.ao_first_name}
                            onChange={(t)=>this.onInput("ao_first_name",t)}
                            inputFilter={InputFilter.persianNameInputFilter}/>

                            <TextInput className={styles.input}
                            placeholder={"نام خانوادگی دارنده حساب"}
                            error={s.first_name_error}
                            value={this.state.ao_last_name}
                            onChange={(t)=>this.onInput("ao_last_name",t)}
                            inputFilter={InputFilter.persianNameInputFilter}/>

                            <TextInput className={styles.input}
                            placeholder={"نام بانک"}
                            error={s.first_name_error}
                            value={this.state.bank_name}
                            onChange={(t)=>this.onInput("bank_name",t)}
                            inputFilter={InputFilter.persianNameInputFilter}/>

                            <TextInput className={styles.input}
                            inputStyle={{fontFamily:"IranSansEng"}}
                            placeholder={"شماره حساب"}
                            error={s.first_name_error}
                            value={this.state.account_number}
                            onChange={(t)=>this.onInput("account_number",t)}
                            inputFilter={InputFilter.persianNameInputFilter}/>

                            <TextInput className={styles.input}
                            placeholder={"شماره شبا"}
                            inputStyle={{fontFamily:"IranSansEng"}}
                            error={s.first_name_error}
                            value={this.state.shaba}
                            onChange={(t)=>this.onInput("shaba",t)}
                            inputFilter={InputFilter.persianNameInputFilter}/>

                            <TextInput className={styles.input}
                            placeholder={"شماره کارت"}
                            inputStyle={{fontFamily:"IranSansEng"}}
                            error={s.first_name_error}
                            value={this.state.a_card_number}
                            onChange={(t)=>this.onInput("a_card_number",t)}
                            inputFilter={InputFilter.persianNameInputFilter}/>

                            <div className={styles.submit_wrapper}>

                                <MainButton className={styles.submit_btn}
                                title={"بروزرسانی"}
                                loading={this.state.bankInfoBtn_loading}
                                onClick={this.updateBankAccountInfo}/>
                                
                            </div>

                        </div>

                    </div>
                    </>
                }
                
            </WrapperT1>
            </EducatorDashboardLayout>
        )
    }
}