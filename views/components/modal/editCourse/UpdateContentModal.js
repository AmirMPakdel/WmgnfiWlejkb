import React, { Component } from "react";
import MainButton from "@/views/components/global/MainButton";
import TextInput from "@/views/components/global/TextInput";
import styles from "./UpdateContentModal.module.css";
import UpdateContentController from "@/controllers/components/modals/editCourse/UpdateContentController";
import EditCourseContents from "@/views/components/editCourse/EditCourseContents";
import CloseModalLayout from "../CloseModalLayout";

/**
* Props of UpdateContentModal Component
* @typedef Props
* @property {string} className
* @property {React.CSSProperties} style
* @property {{id:number, title:string}} heading
* @property {{id:number, title:string, is_free:boolean, type:string}} content
* @property {EditCourseContents} parent
* 
* @extends {Component<Props>}
*/
export default class UpdateContentModal extends Component {
    
    constructor(props){
        super(props);
        this.controller = new UpdateContentController(this);
        this.state = {
            update_loading:false,
            content_title: props.content.title,
            can_continue:true,
        }
    }
    
    componentDidMount(){

        this.input = this.TextInput.input;
        let len = this.input.value.length;
        if (this.input.setSelectionRange) {
            this.input.focus();
            this.input.setSelectionRange(len, len);
        } else if (this.input.createTextRange) {
            var t = this.input.createTextRange();
            t.collapse(true);
            t.moveEnd('character', len);
            t.moveStart('character', len);
            t.select();
        }
    }
    
    onInput=(t)=>{
        this.controller.onInput(t);
    }

    onCancel=()=>{
        this.controller.onCancel();
    }
    
    onUpdate=()=>{
        this.controller.update();
    }
    
    render(){
        return(
            <CloseModalLayout className={styles.con+" bgw"}
            onClose={this.onCancel}>

                <div className={styles.title+" tilt"}>{"ویرایش عنوان محتوا"}</div>

                <TextInput className={styles.input}
                ref={r=>this.TextInput=r}
                onChange={this.onInput}
                value={this.state.content_title}
                placeholder={"عنوان محتوا"}/>

                <MainButton className={styles.submit_btn}
                title={"ویرایش"}
                disabled={!this.state.can_continue}
                onClick={this.onUpdate}
                loading={this.state.update_loading}/>
                
            </CloseModalLayout>
        )
    }
}