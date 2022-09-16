import AddStudentConfirmController from "@/controllers/components/modals/studentManagement/AddStudentConfirmController";
import chest from "@/utils/chest";
import React, { Component } from "react";
import Loading from "../../global/Loading";
import MainButton from "../../global/MainButton";
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
            <div className={styles.con+" bglc1 btc2 lg_card_shd"}>

                {
                    this.state.loading?
                    <Loading style={{minHeight:"12rem"}} scale={0.8}/>:null
                }
                {
                    !this.state.loading?
                    <>
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

                        <div className={styles.sec1}>

                            <MainButton className={"bgsc"}
                            titleClassName={"flc1i"}
                            title={"تایید"}
                            onClick={this.onConfirm}/>

                            <MainButton className={""} 
                            title={"انصراف"}
                            borderMode={true}
                            onClick={this.onCancel}/>

                        </div>
                    </>:null
                }

            </div>
        )
    }
}