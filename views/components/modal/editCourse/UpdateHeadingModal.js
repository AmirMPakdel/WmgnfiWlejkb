import React, { Component } from "react";
import UpdateHeadingController from "@/controllers/components/modals/editCourse/UpdateHeadingController";
import { InputFilter } from "@/utils/validation";
import MainButton from "@/views/components/global/MainButton";
import TextInput from "@/views/components/global/TextInput";
import styles from "./UpdateHeadingModal.module.css";
import CrossSvg from "@/views/svgs/Cross";

/**
* Props of UpdateHeadingModal Component
* @typedef Props
* @property {string} className
* @property {React.CSSProperties} style
* @property {EditCourseContents} parent
* 
* @extends {Component<Props>}
*/
export default class UpdateHeadingModal extends Component {
    
    constructor(props){
        super(props);
        this.controller = new UpdateHeadingController(this);
        this.state = {
            update_loading:false,
            heading: props.heading.title,
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
            <div className={styles.con+" bglc2 "}>

                <CrossSvg className={styles.close_btn + " bglc1 amp_btn md_card_shd"} 
                stroke={env.THEME.dc1}
                onClick={this.onCancel}/>

                <div className={styles.title+" tilt"}>{"ویرایش عنوان سرفصل"}</div>

                <TextInput className={styles.input}
                ref={r=>this.TextInput=r}
                onChange={this.onInput}
                value={this.state.heading}
                inputFilter={InputFilter.persianNameInputFilter}
                placeholder={"عنوان سرفصل"}/>

                <MainButton className={styles.submit_btn}
                title={"ویرایش"}
                disabled={!this.state.can_continue}
                onClick={this.onUpdate}
                loading={this.state.update_loading}/>
                
            </div>
        )
    }
}