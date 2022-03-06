import React, { Component } from "react";
import MainButton from "../../global/MainButton";
import TextArea from "../../global/TextArea";
import TextInput from "../../global/TextInput";
import CrossSvg from "@/views/svgs/Cross";
import styles from "./AddEditInfoBoxElementModal.module.css";
import { InputFilter } from "@/utils/validation";
import chest from "@/utils/chest";

/**
* Props of AddEditInfoBoxElementModal Component
* @typedef Props
* @property {string} className
* @property {React.CSSProperties} style
* @property {"add"|"edit"} mode
* @property {Object} data 
* 
* @extends {Component<Props>}
*/
export default class AddEditInfoBoxElementModal extends Component {
    
    constructor(props){
        super(props);
        this.state = {

            title:"",
            text:"",

            title_error:false,
            text_error:false,
        }
    }
    
    componentDidMount(){
    }

    onCancel=()=>{
        chest.ModalLayout.closeAndDelete(1);
    }

    onInput=(key , value)=>{

        this.state[key] = value;
        this.setState(this.state);
    }
    
    render(){
        return(
            <div className={styles.con+" bglc1 btc2 xl_card_shd"}>

                <CrossSvg className={styles.close_btn + " bglc1 amp_btn md_card_shd"}
                stroke={env.THEME.dc1}
                onClick={this.onCancel}/>

                <div className={styles.wrapper}>

                    {
                        this.props.mode=="edit"?
                        <div className={styles.title+" tilt "}>{"ویرایش آیتم جعبه اطلاعاتی"}</div>:
                        <div className={styles.title+" tilt "}>{"ایجاد آیتم جعبه اطلاعاتی"}</div>
                    }

                    <div className={styles.form_body}>

                        <TextInput className={styles.form_input}
                        style={{marginTop:"2.5rem"}}
                        placeholder={"عنوان"}
                        onChange={t=>this.onInput("title", t)}
                        value={this.state.title}
                        error={this.state.title_error}
                        inputFilter={InputFilter.persianNameInputFilter}/>

                        <TextArea className={styles.form_ta}
                        title={"متن"}
                        onChange={t=>this.onInput("text", t)}
                        value={this.state.text}
                        error={this.state.text_error}/>

                    </div>

                    <div className={styles.sec1}>
                        
                        <MainButton className={styles.confirm_btn}
                        title={"ویرایش"}
                        loading={this.state.btn_loading}
                        onClick={this.onEdit}/>

                    </div>

                </div>

            </div>
        )
    }
}