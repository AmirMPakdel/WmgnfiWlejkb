import React, { Component } from "react";
import MainButton from "../../global/MainButton";
import TextArea from "../../global/TextArea";
import TextInput from "../../global/TextInput";
import CrossSvg from "@/views/svgs/Cross";
import styles from "./AddEditInfoBoxElementModal.module.css";
import { InputFilter } from "@/utils/validation";
import { Popover, Radio } from "node_modules/antd/lib/index";
import UploadMedia from "../../editHomePage/UploadMedia";
import AddEditInfoBoxElementController from "@/controllers/components/modals/editHomePage/AddEditInfoBoxElementController";
import HomePage from "@/views/dynamics/dashboard/HomePage";
import CloseModalLayout from "../CloseModalLayout";

/**
* Props of AddEditInfoBoxElementModal Component
* @typedef Props
* @property {string} className
* @property {React.CSSProperties} style
* @property {HomePage} parent 
* @property {"add"|"edit"} mode
* @property {Object} data 
* 
* @extends {Component<Props>}
*/
export default class AddEditInfoBoxElementModal extends Component {
    
    constructor(props){
        super(props);
        this.controller = new AddEditInfoBoxElementController(this);
        this.state = {

            confirm_loading:false,

            title:"",
            text:"",

            title_error:false,
            text_error:false,

            has_link:false,

            link_title: "",
            link_url: "",

            media_type:"image",
        }
    }
    
    componentDidMount(){
        
    }

    onCancel=()=>{

        this.controller.onCancel();
    }

    onInput=(key , value)=>{

        this.state[key] = value;
        this.setState(this.state);
    }

    onHasLink=()=>{

        this.setState({has_link:true});
    }

    onRemoveLink=()=>{

        this.setState({has_link:false});
    }

    onMediaTypeSelect=(type)=>{

        this.setState({media_type:type});
    }

    onConfirm=()=>{

        if(this.state.confirm_loading){return;}
        
        this.controller.onConfirm();
    }
    
    render(){
        return(
            <CloseModalLayout className={styles.con+" bgw tbc2 xl_card_shd"}
            onClose={this.onCancel}>

                {
                    this.props.mode=="edit"?
                    <div className={styles.title+" tilt "}>{"تنظیمات آیتم جعبه اطلاعاتی"}</div>:
                    <div className={styles.title+" tilt "}>{"ایجاد آیتم جعبه اطلاعاتی"}</div>
                }

                <div className={styles.wrapper}>

                    <div className={styles.form_body}>

                        <TextInput className={styles.title_input}
                        placeholder={"عنوان جعبه اطلاعاتی"}
                        onChange={t=>this.onInput("title", t)}
                        value={this.state.title}
                        error={this.state.title_error}
                        inputFilter={InputFilter.persianNameInputFilter}/>

                        <TextArea className={styles.text_input}
                        placeholder={"متن توضیحات"}
                        onChange={t=>this.onInput("text", t)}
                        value={this.state.text}
                        error={this.state.text_error}
                        maxLength={800}/>

                        <div className={styles.links_sec}>

                        {
                            !this.state.has_link?
                            <div className={styles.link_con1}>

                                <MainButton className={styles.add_link_btn}
                                title={"اضافه کردن لینک"}
                                onClick={this.onHasLink}/>

                            </div>:
                            <div className={styles.link_con2}>
                                
                                <div className={styles.link_row1}>

                                    <MainButton className={styles.remove_link_btn+" tbgcerri"}
                                    titleClassName={"flc1i"}
                                    title={"حذف لینک"}
                                    onClick={this.onRemoveLink}/>

                                    <TextInput className={styles.link_title_input}
                                    placeholder={"عنوان دکمه لینک"}
                                    onChange={t=>this.onInput("link_title", t)}
                                    value={this.state.link_title}
                                    error={this.state.link_title_error}
                                    inputFilter={InputFilter.persianNameInputFilter}/>

                                </div>

                                <TextInput className={styles.link_url_input}
                                placeholder={"URL لینک"}
                                inputClassName={styles.link_url_input_input}
                                onChange={t=>this.onInput("link_url", t)}
                                value={this.state.link_url}
                                error={this.state.link_url_error}/>

                            </div>
                        }

                        </div>

                        <div className={styles.type_select_sec}>

                            <RadioSelect
                            title={"آپلود عکس"}
                            checked={this.state.media_type==="image"}
                            onSelect={()=>this.onMediaTypeSelect("image")}/>

                            <RadioSelect
                            title={"آپلود ویدیو"}
                            checked={this.state.media_type==="video"}
                            onSelect={()=>this.onMediaTypeSelect("video")}/>

                            <RadioSelect
                            title={"هیچکدام"}
                            checked={this.state.media_type==="none"}
                            onSelect={()=>this.onMediaTypeSelect("none")}/>

                        </div>

                        {
                            this.state.media_type==="image"?
                            <UploadMedia
                            ref={r=>this.UploadMedia=r}
                            className={styles.updload_media}
                            title={"بارگذاری تصویر"}
                            type="image"
                            />:null
                        }
                        {
                            this.state.media_type==="video"?
                            <UploadMedia
                            ref={r=>this.UploadMedia=r}
                            className={styles.updload_media}
                            title={"بارگذاری ویدیو"}
                            type="video"
                            />:null
                        }

                    </div>

                    <div className={styles.sec1}>
                        
                        <MainButton className={styles.confirm_btn}
                        title={this.props.mode=="edit"?"ویرایش":"ایجاد"}
                        loading={this.state.confirm_loading}
                        onClick={this.onConfirm}/>

                    </div>

                </div>

            </CloseModalLayout>
        )
    }
}

function RadioSelect(props){
    return(
        <div className={styles.rads_con+" bdyt"} onClick={props.onSelect}>

            <Radio checked={props.checked}/>

            <div className={styles.rads_title}>{props.title}</div>

        </div>
    )
}