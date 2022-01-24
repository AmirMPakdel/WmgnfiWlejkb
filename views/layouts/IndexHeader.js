import React, { Component } from "react";
import styles from "./IndexHeader.module.css";
import MainButton from "@/views/components/global/MainButton";
import chest from "@/utils/chest";
import StudentAuthModal from "../components/modal/global/StudentAuthModal";

export default class IndexHeader extends Component {

    onStudentAuthModal=()=>{
        chest.ModalLayout.setModal(1, <StudentAuthModal/>, ()=>{
            chest.ModalLayout.visibleToggle(1, true);
        });
    }
    
    render(){
        return(
            <div className={styles.header_con+" bglc1i"}>

                <MainButton title={"ورود / ثبت نام"}
                onClick={this.onStudentAuthModal}/>
                
            </div>
        )
    }
}