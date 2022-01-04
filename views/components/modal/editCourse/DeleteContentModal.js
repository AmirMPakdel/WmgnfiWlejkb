import React, { Component } from "react";
import styles from "./DeleteContentModal.module.css";
import DeleteContentController from "@/controllers/components/modals/editCourse/DeleteContentController";
import EditCourseContents from "@/views/components/editCourse/EditCourseContents";
import MainButton from "@/views/components/global/MainButton";

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
            <div className={styles.con+" bglc2 "}>

                <img className={styles.close_btn + " bglc1 amp_btn md_card_shd"} 
                src={"/svg/modal_close.svg"}
                onClick={this.onCancel}/>

                <div className={styles.title+" tilt"}>{"محتوای "+content.title+" حذف شود؟"}</div>

                <div className={styles.sec1}>

                    <MainButton className={styles.submit_btn+" bgec"}
                    title={"حذف"}
                    onClick={this.onDelete}
                    loading={this.state.delete_loading}/>

                    <MainButton className={styles.cancel_btn}
                    title={"انصراف"}
                    onClick={this.onCancel}/>

                </div>
                
            </div>
        )
    }
}