import React, { Component } from "react";
import NewHeadingController from "@/controllers/components/modals/editCourse/NewHeadingController";
import { InputFilter } from "@/utils/validation";
import EditCourseContents from "@/views/components/editCourse/EditCourseContents";
import MainButton from "@/views/components/global/MainButton";
import TextInput from "@/views/components/global/TextInput";
import styles from "./NewHeadingModal.module.css";

/**
* Props of NewHeading Component
* @typedef Props
* @property {string} className
* @property {React.CSSProperties} style
* @property {EditCourseContents} parent
* 
* @extends {Component<Props>}
*/
export default class NewHeadingModal extends Component {
    
    constructor(props){
        super(props);
        this.controller = new NewHeadingController(this);
        this.state = {
            heading:"",
            create_loading:false,
            can_continue:false,
        }
    }
    
    componentDidMount(){
        this.TextInput.input.focus();
    }

    onInput=(t)=>{
        this.controller.onInput(t);
    }

    onCancel=()=>{
        this.controller.onCancel();
    }
    
    onCreate=()=>{
        this.controller.create();
    }
    
    render(){
        return(
            <div className={styles.con+" bglc2 "}>

                <img className={styles.close_btn + " bglc1 amp_btn md_card_shd"} 
                src={"/svg/modal_close.svg"}
                onClick={this.onCancel}/>

                <div className={styles.title+" tilt"}>{"ایجاد سرفصل جدید"}</div>

                <TextInput className={styles.input}
                ref={r=>this.TextInput=r}
                onChange={this.onInput}
                value={this.state.heading}
                inputFilter={InputFilter.persianNameInputFilter}
                placeholder={"عنوان سرفصل"}/>

                <MainButton className={styles.submit_btn}
                title={"ایجاد"}
                disabled={!this.state.can_continue}
                onClick={this.onCreate}
                loading={this.state.create_loading}/>
                
            </div>
        )
    }
}