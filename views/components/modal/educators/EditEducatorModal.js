import React, { Component } from "react";
import EditEducatorController from "@/controllers/components/modals/educators/EditEducatorController";
import chest from "@/utils/chest";
import { InputFilter } from "@/utils/validation";
import MainButton from "@/views/components/global/MainButton";
import TextArea from "@/views/components/global/TextArea";
import TextInput from "@/views/components/global/TextInput";
import styles from "./EditEducatorModal.module.css";
import UploadEducatorImage from "@/views/components/educator/UploadEducatorImage";
import CrossSvg from "@/views/svgs/Cross";
import CloseModalLayout from "../CloseModalLayout";

/**
* Props of EditEducatorModal Component
* @typedef Props
* @property {string} className
* @property {React.CSSProperties} style
* 
* @extends {Component<Props>}
*/
export default class EditEducatorModal extends Component {
    
    constructor(props){
        super(props);
        this.controller = new EditEducatorController(this);
        this.state = {
            educator: props.data,

            btn_loading:false,

            image:props.data.image,
            first_name:props.data.first_name,
            last_name:props.data.last_name,
            bio:props.data.bio,

            first_name_error:false,
            last_name_error:false,
            bio_error:false,
        }
    }
    
    componentDidMount(){
    }

    onCancel=()=>{
        if(this.props.onCancel){
            this.props.onCancel();
        }else{
            chest.ModalLayout.visibleToggle(2, false, ()=>{
                chest.ModalLayout.visibleToggle(1, true);
            });
        }
    }

    onEdit=()=>{
        this.controller.editEducator();
    }

    onImage=(file, file_name, img_src)=>{
        this.setState({image_file:file, img_src});
    }

    onInput=(key, text)=>{
        this.state[key] = text;
        this.state[key+"_error"] = false;
        this.setState(this.state);
    }
    
    render(){
        return( 
            <CloseModalLayout className={styles.con+" bgw xl_card_shd"}
            wrapperClass={styles.wrapper}
            onClose={this.onCancel}>

                <div className={styles.title+" tilt "}>{"ویرایش دبیر"}</div>

                <div className={styles.form_body}>

                    <UploadEducatorImage
                    uploadKey={this.state.image}
                    ref={r=>this.UploadEducatorImage=r}/>

                    <TextInput className={styles.form_input}
                    style={{marginTop:"2.5rem"}}
                    placeholder={"نام"}
                    onChange={t=>this.onInput("first_name", t)}
                    value={this.state.first_name}
                    error={this.state.first_name_error}
                    inputFilter={InputFilter.persianNameInputFilter}/>

                    <TextInput className={styles.form_input}
                    placeholder={"نام خانوادگی"}
                    onChange={t=>this.onInput("last_name", t)}
                    value={this.state.last_name}
                    error={this.state.last_name_error}
                    inputFilter={InputFilter.persianNameInputFilter}/>

                    <TextArea className={styles.form_ta}
                    placeholder={"بایو"}
                    onChange={t=>this.onInput("bio", t)}
                    value={this.state.bio}
                    error={this.state.bio_error}/>

                </div>

                <div className={styles.sec1}>
                    
                    <MainButton className={styles.confirm_btn}
                    title={"ویرایش"}
                    loading={this.state.btn_loading}
                    onClick={this.onEdit}/>

                </div>

            </CloseModalLayout>
        )
    }
}