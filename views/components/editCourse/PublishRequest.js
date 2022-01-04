import React, { Component } from "react";
import PublishRequestController from "@/controllers/components/editCourse/PublishRequestController";
import MainButton from "@/views/components/global/MainButton";
import styles from "./PublishRequest.module.css";
import EditCourse from "@/views/dynamics/dashboard/EditCourse";
import EditableTitle from "@/views/components/editable/EditableTitle";

/**
* Props of PublishRequest Component
* @typedef Props
* @property {string} className
* @property {React.CSSProperties} style
* @property {EditCourse} parent
* 
* @extends {Component<Props>}
*/
export default class PublishRequest extends Component {
    
    constructor(props){
        super(props);
        this.controller = new PublishRequestController(this);
        this.state = {
            request_loading:false,
            completion_errors:[],
        }
    }
    
    componentDidMount(){
    }

    onRequest=()=>{

        this.controller.onRequest();
    }
    
    render(){

        //let nw = {validation_status:"not_valid", validation_status_message:fake_errors} 
        let nw = this.props.parent.state.new_values;

        let jsx = 

        nw.validation_status !== "valid"?
        <>
            <div className={styles.con}>
            <EditableTitle
            title={"درخواست انتشار دوره"}
            status={null}/>

            {
                nw.validation_status === "not_valid" && !nw.validation_status_message.length?

                <div className={styles.info_list+" bdyt "}>

                    <ul>
                        <li>{text1}</li>
                        <li>{text2}</li>
                        <li>{text3}</li>
                    </ul>

                </div>:null
            }
            {
                nw.validation_status === "not_valid" && nw.validation_status_message.length?
                <>
                <div className={styles.error_title+" fec tilt "}>{"عدم تایید انتشار"}</div>

                <div className={styles.error_list+" bdyt fec"}>

                    <div className={styles.error_sub+" bdyt "}>{error1}</div>

                    <ul>
                        {
                            nw.validation_status_message.map((v,i)=>(
                                <li key={i}>{v}</li>
                            ))
                        }
                    </ul>

                </div>
                </>:null
            }
            {
                nw.validation_status === "not_valid"?
                <MainButton className={styles.request_btn}
                onClick={this.onRequest}
                loading={this.state.request_loading}
                title="درخواست انتشار"/>:null
            }
            {
                nw.validation_status === "is_checking"?
                <MainButton className={styles.request_btn}
                disabled={true}
                title="درحال بررسی"/>:null
            }
            {
                nw.validation_status === "valid"?
                <MainButton className={styles.request_btn}
                onClick={this.onRequest}
                loading={this.state.request_loading}
                title="درخواست انتشار"/>:null
            }
            {
                nw.validation_status === "not_valid" && nw.validation_status_message.length?
                <>
                <div className={styles.error_title+" fec tilt "}>{"عدم تایید انتشار"}</div>

                <div className={styles.error_list+" bdyt fec"}>

                    <div className={styles.error_sub+" bdyt "}>{error1}</div>

                    <ul>
                        {
                            nw.validation_status_message.map((v,i)=>(
                                <li key={i}>{v}</li>
                            ))
                        }
                    </ul>

                </div>
                </>:null
            }
            </div>

        </>:null

        return jsx;
    }
}

const text1 = "بعد از تکمیل جزئیات دوره و بارگذاری محتوای دوره خود می توانید درخواست انتشار دهید.";
const text2 = "بعد از ثبت درخواست انتشار، جزئیات و محتوای دوره شما مورد بررسی قرار خواهد گرفت و پس از تایید، دوره شما منتشر خواهد شد. ";
const text3 = "در صورت عدم تایید مشکلات و قوانین رعایت نشده در همین بخش برای شما لیست خواهد شد.";

const fake_errors = [
    "عکس لوگوی دوره کیفیت پایینی دارد. لطفا عکس با رزلوشن بالاتری بارگذاری نمایید.",
]
const error1 = "درخواست انتشار شما به دلایل زیر تایید نشد:"