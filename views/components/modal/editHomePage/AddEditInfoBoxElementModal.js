import React, { Component } from "react";
import MainButton from "../../global/MainButton";
import TextArea from "../../global/TextArea";
import TextInput from "../../global/TextInput";
import CrossSvg from "@/views/svgs/Cross";
import styles from "./AddEditInfoBoxElementModal.module.css";
import { InputFilter } from "@/utils/validation";
import chest from "@/utils/chest";
import { Popover, Radio } from "node_modules/antd/lib/index";

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

            has_link:false,

            media_type:"3"
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

    onMediaTypeSelect=(type)=>{
        this.setState({media_type:type})
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
                        <div className={styles.title+" tilt "}>{"تنظیمات آیتم جعبه اطلاعاتی"}</div>:
                        <div className={styles.title+" tilt "}>{"ایجاد آیتم جعبه اطلاعاتی"}</div>
                    }

                    <div className={styles.form_body}>

                        <TextInput className={styles.title_input}
                        style={{marginTop:"2.5rem"}}
                        placeholder={"عنوان جعبه اطلاعاتی"}
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
                                title={"اضافه کردن لینک"}/>

                                <Popover overlayClassName={styles.link_pop_overlay}
                                content={<img className={styles.link_pop_con} 
                                src={"https://gamefa.com/wp-content/uploads/2022/03/robert-pattinson-the-batman-768x384.jpg.webp"}/>}>

                                    <img className={styles.link_help} src={"/statics/svg2/question.svg"}/>
                                
                                </Popover>


                            </div>:
                            <div className={styles.link_con2}>
                                
                                

                            </div>
                        }

                        </div>

                        <div className={styles.type_select_sec}>

                            <RadioSelect
                            title={"آپلود عکس"}
                            checked={this.state.media_type==="1"}
                            onSelect={()=>this.onMediaTypeSelect("1")}/>

                            <RadioSelect
                            title={"آپلود ویدیو"}
                            checked={this.state.media_type==="2"}
                            onSelect={()=>this.onMediaTypeSelect("2")}/>

                            <RadioSelect
                            title={"هیچکدام"}
                            checked={this.state.media_type==="3"}
                            onSelect={()=>this.onMediaTypeSelect("3")}/>

                        </div>

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

function RadioSelect(props){
    return(
        <div className={styles.rads_con+" bdyt"} onClick={props.onSelect}>

            <Radio checked={props.checked}/>

            <div className={styles.rads_title}>{props.title}</div>

        </div>
    )
}