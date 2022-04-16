import { InputFilter } from "@/utils/validation";
import MainButton from "@/views/components/global/MainButton";
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
        //this.controller = new EditProfileController(this);
        this.state = {
            first_name: "",
            last_name: "",
            phonenumber: "",
        }
    }
    
    componentDidMount(){
    }

    loadUserInfo=()=>{
        
    }
    
    render(){
        let s = this.state;
        return(
            <StudentPanelLayout accessType="student"
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

                        <div className={styles.unchangable1+" blc2"}>

                            <div className={styles.unchangable_label+" cpnt bgw"}>{"شماره موبایل"}</div>

                            <div>{"09118015081"}</div>

                            <MainButton className={styles.unchangable_btn}
                            title={"ویرایش"}/>

                        </div>

                        <div className={styles.unchangable1+" blc2"}>

                            <div className={styles.unchangable_label+" cpnt bgw"}>{"رمزعبور"}</div>

                            <div>{"***********"}</div>

                            <MainButton className={styles.unchangable_btn}
                            title={"ویرایش"}/>

                        </div>

                        <SelectSearch/>
                        
                        <div className={styles.submit_wrapper}>

                            <MainButton className={styles.submit_btn}
                            title={"بروزرسانی"}
                            onClick={this.updateUserInfo}/>

                        </div>
                    
                    </div>
                    
                </div>

                </WrapperT1>

            </StudentPanelLayout>
        )
    }
}