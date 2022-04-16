import { InputFilter } from "@/utils/validation";
import MainButton from "@/views/components/global/MainButton";
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
        //this.controller = new ProfileController(this);
        this.state = {
            first_name:"",
            last_name: "",
            phone_number: "",
            email: "",
            province: "",
            city: "",
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
    }
    
    componentDidMount(){
    }

    updateUserInfo=()=>{

    }

    updateBankAccount=()=>{
        
    }
    
    render(){

        let s = this.state;

        return(
            
            <EducatorDashboardLayout accessType="userL1"
            showWithoutAuth={false}>

            <WrapperT1 className={styles.con}>

                <div className={styles.wrapper_card+" sm_card_shd"}>

                    <div className={styles.title_card+" bdyt sm_card_shd"}>{"اطلاعات حساب کاربری"}</div>

                    <div className={styles.inputs_wrapper}>

                        <TextInput className={styles.input}
                        placeholder={"نام"}
                        error={s.first_name_error}
                        onChange={(t)=>this.onInput("first_name",t)}
                        inputFilter={InputFilter.persianNameInputFilter}/>

                        <TextInput className={styles.input}
                        placeholder={"نام خانوادگی"}
                        error={s.last_name_error}
                        onChange={(t)=>this.onInput("last_name",t)}
                        inputFilter={InputFilter.persianNameInputFilter}/>

                        <TextInput className={styles.input}
                        placeholder={"شماره موبایل"}/>

                        <TextInput className={styles.input}
                        placeholder={"پست الکترونیکی"}/>

                        <TextInput className={styles.input}
                        placeholder={"استان"}/>

                        <TextInput className={styles.input}
                        placeholder={"شهر"}/>

                        <TextInput className={styles.input}
                        placeholder={"کدملی"}/>

                        <TextInput className={styles.input}
                        placeholder={"ارسال تصویر کارت ملی"}/>

                        <div className={styles.submit_wrapper}>

                            <MainButton className={styles.submit_btn}
                            title={"بروزرسانی"}
                            onClick={this.updateUserInfo}/>

                        </div>

                    </div>

                </div>

                <div className={styles.wrapper_card+" sm_card_shd"}>

                    <div className={styles.title_card+" bdyt sm_card_shd"}>{"اطلاعات حساب بانکی"}</div>

                    <div className={styles.inputs_wrapper}>

                        <TextInput className={styles.input}
                        placeholder={"نام دارنده حساب"}
                        error={s.first_name_error}
                        onChange={(t)=>this.onInput("first_name",t)}
                        inputFilter={InputFilter.persianNameInputFilter}/>

                        <TextInput className={styles.input}
                        placeholder={"نام خانوادگی دارنده حساب"}
                        error={s.first_name_error}
                        onChange={(t)=>this.onInput("first_name",t)}
                        inputFilter={InputFilter.persianNameInputFilter}/>

                        <TextInput className={styles.input}
                        placeholder={"نام بانک"}
                        error={s.first_name_error}
                        onChange={(t)=>this.onInput("first_name",t)}
                        inputFilter={InputFilter.persianNameInputFilter}/>

                        <TextInput className={styles.input}
                        placeholder={"شماره حساب"}
                        error={s.first_name_error}
                        onChange={(t)=>this.onInput("first_name",t)}
                        inputFilter={InputFilter.persianNameInputFilter}/>

                        <TextInput className={styles.input}
                        placeholder={"شماره شبا"}
                        error={s.first_name_error}
                        onChange={(t)=>this.onInput("first_name",t)}
                        inputFilter={InputFilter.persianNameInputFilter}/>

                        <TextInput className={styles.input}
                        placeholder={"شماره کارت"}
                        error={s.first_name_error}
                        onChange={(t)=>this.onInput("first_name",t)}
                        inputFilter={InputFilter.persianNameInputFilter}/>

                        <div className={styles.submit_wrapper}>

                            <MainButton className={styles.submit_btn}
                            title={"بروزرسانی"}
                            onClick={this.updateBankAccount}/>
                            
                        </div>

                    </div>

                </div>
                
            </WrapperT1>
            </EducatorDashboardLayout>
        )
    }
}