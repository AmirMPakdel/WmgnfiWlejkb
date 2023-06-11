import React, { Component } from "react";
import styles from "./DeleteContentModal.module.css";
import DeleteContentController from "@/controllers/components/modals/editCourse/DeleteContentController";
import EditCourseContents from "@/views/components/editCourse/EditCourseContents";
import YesNoModalLayout from "../YesNoModalLayout";

/**
* Props of DeleteContentModal Component
* @typedef Props
* @property {string} className
* @property {React.CSSProperties} style
* @property {{id:number, title:string}} heading
* @property {{id:number, title:string, is_free:boolean, type:string}} content
* @property {EditCourseContents} parent
* 
* @extends {Component<Props>}
*/
export default class DeleteContentModal extends Component {
    
    constructor(props){
        super(props);
        this.controller = new DeleteContentController(this);
        this.state = {
            delete_loading:false,
        }
    }
    
    componentDidMount(){
    }

    onCancel=()=>{
        this.controller.onCancel();
    }
    
    onDelete=()=>{
        this.controller.onDelete();
    }
    
    render(){
        let content = this.props.content;
        return(
            <YesNoModalLayout className={styles.con+" bgw"}
            wrapperClass={styles.wrapper}
            closable={false}
            positiveClassName={styles.submit_btn+" tbgcerr fwi"}
            positiveLoading={this.state.delete_loading}
            positiveTitle={"حذف"}
            onPositive={this.onDelete}
            negativeClassName={styles.cancel_btn}
            negativeTitle={"انصراف"}
            onNegative={this.onCancel}>

                <div className={styles.title+" tilt"}>{"محتوای "+content.title+" حذف شود؟"}</div>
                
            </YesNoModalLayout>
        )
    }
}