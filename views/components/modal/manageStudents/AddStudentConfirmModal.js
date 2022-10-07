import AddStudentConfirmController from "@/controllers/components/modals/studentManagement/AddStudentConfirmController";
import chest from "@/utils/chest";
import React, { Component } from "react";
import Loading from "../../global/Loading";
import MainButton from "../../global/MainButton";
import YesNoModalLayout from "../YesNoModalLayout";
import styles from "./AddStudentConfirmModal.module.css";

/**
* Props of AddStudentConfirmModal Component
* @typedef Props
* @property {string} className
* @property {string} courseTitle
* @property {Array<Any>} selectedList
* @property {Array<string>} selectedKeys
* 
* @extends {Component<Props>}
*/
export default class AddStudentConfirmModal extends Component {
    
    constructor(props){
        super(props);

        this.controller = new AddStudentConfirmController(this);

        this.state={
            loading:false,
        }

        this.selectedList = this.props.selectedList;
        this.selectedKeys = this.props.selectedKeys;
    }

    componentDidMount(){
    }
    

    onCancel=()=>{
        if(this.state.loading){
            return;
        }
        chest.ModalLayout.closeAndDelete(2);
    }

    onConfirm=()=>{
        this.controller.onConfirm();
    }
    
    render(){

        let title = "آیا دانش آموز با مشخصات زیر  به دوره "+ this.props.courseTitle +" به صورت رایگان ثبت نام و اضافه شود؟";
        if(this.selectedList.length>1){
            title = "آیا دانش آموزان با مشخصات زیر  به دوره "+ this.props.courseTitle +" به صورت رایگان ثبت نام و اضافه شوند؟";
        }

        return(
            <YesNoModalLayout className={styles.con+" bgw lg_card_shd"}
            closable={false}
            positiveClassName={"bgsc flc1i"}
            positiveTitle={"تایید"}
            onPositive={this.onConfirm}
            positiveLoading={this.state.loading}
            negativeClassName={""}
            negativeBorderMode={true}
            negativeTitle={"انصراف"}
            onNegative={this.onCancel}>

                <div className={styles.title+" tilt"}>{title}</div>

                <div className={styles.list_con}>
                    <table className={styles.table}>
                    <tr>
                        <th>{"نام نام خانوادگی"}</th>
                        <th>{"کد ملی"}</th>
                        <th>{"موبایل"}</th>
                    </tr>

                    {
                        this.selectedList.map((v,i)=>(
                            <tr className={styles.student_row}>

                                <td>{v.first_name+" "+v.last_name}</td>

                                <td>{v.national_code}</td>

                                <td>{v.phone_number}</td>

                            </tr>
                        ))
                    }
                    </table>

                </div>

            </YesNoModalLayout>
        )
    }
}