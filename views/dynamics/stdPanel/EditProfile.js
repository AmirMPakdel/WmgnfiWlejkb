import EditProfileController from "@/controllers/dynamics/stdPanel/EditProfileController";
import Observer from "@/utils/observer";
import { InputFilter } from "@/utils/validation";
import Loading from "@/views/components/global/Loading";
import MainButton from "@/views/components/global/MainButton";
import SelectSearch from "@/views/components/global/SelectSearch";
import TextInput from "@/views/components/global/TextInput";
import StudentPanelLayout from "@/views/layouts/StudentPanelLayout";
import WrapperT1 from "@/views/layouts/WrapperT1";
import React, { Component } from "react";
import styles from "./EditProfile.module.css";

/**
* Props of EditProfile Component
* @typedef Props
* @property {string} className
* @property {React.CSSProperties} style
* 
* @extends {Component<Props>}
*/
export default class EditProfile extends Component {
    
    constructor(props){
        super(props);
        this.controller = new EditProfileController(this);
        this.state = {
            loading: true,
            first_name: "",
            last_name: "",
            phone_number: "",
            province_id: null,
            province_obj: {},
            city_id: null,
            city_obj: {},
            cities:[],
            email: "",
            btn_loading:false,
        }

        Observer.add("onAuthenticate", this.loadStudentInfo);
    }
    
    componentDidMount(){

    }

    loadStudentInfo=()=>{

        this.controller.loadStudentInfo();
    }

    updateStudentInfo=()=>{

        this.controller.updateStudentInfo();
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

    onChangePhonenumber=()=>{

        //TOOD: add modal
    }

    onChangePassword=()=>{

        window.location.href = env.PATHS.STUDENT_CHANGE_PASSWORD;
    }
    
    render(){
        let s = this.state;
        return(
            <StudentPanelLayout accessType="student"
            showWithoutAuth={false}>

                <WrapperT1 className={styles.con}>

                {
                    this.state.loading?
                    <Loading className={styles.loading}/>
                    :
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
                            
                            <div className={styles.submit_wrapper}>

                                <MainButton className={styles.submit_btn}
                                title={"بروزرسانی"}
                                loading={this.state.btn_loading}
                                onClick={this.updateStudentInfo}/>

                            </div>
                        
                        </div>
                        
                    </div>
                }

                </WrapperT1>

            </StudentPanelLayout>
        )
    }
}