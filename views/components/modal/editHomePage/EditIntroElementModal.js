import EditIntroElementController from "@/controllers/components/modals/editHomePage/EditIntroElementController";
import React, { Component } from "react";
import styles from "./EditIntroElementModal.module.css";
import MainButton from "../../global/MainButton";
import TextArea from "../../global/TextArea";
import TextInput from "../../global/TextInput";
import CrossSvg from "@/views/svgs/Cross";
import { InputFilter } from "@/utils/validation";
import chest from "@/utils/chest";
import { Popover, Radio } from "node_modules/antd/lib/index";
import UploadMedia from "../../editHomePage/UploadMedia";
import SwitchIntroElementModal from "./SwitchIntroElementModal";

/**
* Props of EditIntroElementModal Component
* @typedef Props
* @property {string} className
* @property {React.CSSProperties} style
* 
* @extends {Component<Props>}
*/
export default class EditIntroElementModal extends Component {
    
    constructor(props){
        super(props);
        this.controller = new EditIntroElementController(this);
        
        let type = 1;

        if(this.props.data.type){
            type = this.props.data.type
        }

        this.state = {

            type,

            confirm_loading:false,

            title:"",
            text:"",

            title_error:false,
            text_error:false,

            has_link:false,

            link_title: "",
            link_url: "",
        }
    }
    
    componentDidMount(){
    }

    onCancel=()=>{
        chest.ModalLayout.closeAndDelete(1);
    }

    onChangeType=()=>{
        let modal = <SwitchIntroElementModal data={this.props.data} type={this.state.type}/>;
        chest.ModalLayout.setAndShowModal(1, modal);
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

        this.controller.onConfirm();
    }
    
    render(){
        return(
            <div className={styles.con+" bglc1 btc2 xl_card_shd"}>

                <CrossSvg className={styles.close_btn + " bglc1 amp_btn md_card_shd"}
                stroke={env.THEME.dc1}
                onClick={this.onCancel}/>

                <div className={styles.title+" tilt "}>{"تنظیمات شروع سایت"}</div>

                <div className={styles.row1}>

                    {
                        this.state.type===1?
                        <div className={styles.type_title+" tilt"}>{"حالت پیش فرض"}</div>
                        :
                        <div className={styles.type_title+" tilt"}>{"حالت بنر"}</div>
                    }

                    <MainButton className={styles.change_type_btn}
                    borderMode
                    title={"تغییر حالت"}
                    onClick={this.onChangeType}/>

                </div>

                <div className={styles.wrapper}>

                    <div className={styles.form_body}>

                    {
                        this.state.type===1?
                        <>
                        <TextInput className={styles.title_input}
                        placeholder={"تیتر شروع سایت"}
                        onChange={t=>this.onInput("title", t)}
                        value={this.state.title}
                        error={this.state.title_error}
                        inputFilter={InputFilter.persianNameInputFilter}/>

                        <TextArea className={styles.text_input}
                        title={"متن توضیحات"}
                        onChange={t=>this.onInput("text", t)}
                        value={this.state.text}
                        error={this.state.text_error}
                        maxLength={250}/>

                        <div className={styles.links_sec}>

                        {
                            !this.state.has_link?
                            <div className={styles.link_con1}>

                                <MainButton className={styles.add_link_btn}
                                title={"اضافه کردن لینک"}
                                onClick={this.onHasLink}/>

                                <Popover overlayClassName={styles.link_pop_overlay}
                                content={<img className={styles.link_pop_con} 
                                src={"https://gamefa.com/wp-content/uploads/2022/03/robert-pattinson-the-batman-768x384.jpg.webp"}/>}>

                                    <img className={styles.link_help} src={"/statics/svg2/question.svg"}/>
                                
                                </Popover>

                            </div>:
                            <div className={styles.link_con2}>
                                
                                <div className={styles.link_row1}>

                                    <MainButton className={styles.remove_link_btn+" bgeci"}
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
                                onChange={t=>this.onInput("link_url", t)}
                                value={this.state.link_url}
                                error={this.state.link_url_error}/>

                            </div>
                        }

                        </div>
                        
                        </>:null
                    }
                    
                        <UploadMedia
                        ref={r=>this.UploadMedia=r}
                        className={styles.updload_media}
                        title={"بارگذاری تصویر"}
                        type="image"/>

                    </div>

                    <div className={styles.sec1}>
                        
                        <MainButton className={styles.confirm_btn}
                        title={"ثبت"}
                        loading={this.state.btn_loading}
                        onClick={this.onConfirm}/>

                    </div>

                </div>

            </div>
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