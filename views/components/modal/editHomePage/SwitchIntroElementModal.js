import React, { Component } from "react";
import styles from "./SwitchIntroElementModal.module.css";
import MainButton from "../../global/MainButton";
import TextArea from "../../global/TextArea";
import TextInput from "../../global/TextInput";
import CrossSvg from "@/views/svgs/Cross";
import { InputFilter } from "@/utils/validation";
import chest from "@/utils/chest";
import { Popover, Radio } from "node_modules/antd/lib/index";
import UploadMedia from "../../editHomePage/UploadMedia";
import EditIntroElementModal from "./EditIntroElementModal";

/**
* Props of SwitchIntroElementModal Component
* @typedef Props
* @property {string} className
* @property {React.CSSProperties} style
* 
* @extends {Component<Props>}
*/
export default class SwitchIntroElementModal extends Component {
    
    constructor(props){
        super(props);

        this.state = {
            type: this.props.type,
            info_text: type2Info(this.props.type)
        }
    }
    
    componentDidMount(){
    }

    onCancel=()=>{

        let modal = <EditIntroElementModal data={this.props.data}/>;
        chest.ModalLayout.setAndShowModal(1, modal);
    }

    onTypeSelect=(type)=>{

        this.setState({type, info_text: type2Info(type)});
    }

    onConfirm=()=>{

        let newData = Object.assign({}, this.props.data);
        newData.type = this.state.type;

        let modal = <EditIntroElementModal data={newData}/>;
        chest.ModalLayout.setAndShowModal(1, modal);
    }
    
    render(){
        return(
            <div className={styles.con+" bglc1 btc2 xl_card_shd"}>

                <CrossSvg className={styles.close_btn + " bglc1 amp_btn md_card_shd"}
                stroke={env.THEME.dc1}
                onClick={this.onCancel}/>

                <div className={styles.title+" tilt "}>{"تغییر حالت شروع سایت"}</div>

                <div className={styles.wrapper}>

                    <div className={styles.form_body}>

                        <div className={styles.info1+" bdyt "}>{"یک گزینه را برای حالت شروع سایت انتخاب کنید."}</div>

                        <div className={styles.type_select_sec}>

                            <RadioSelect title={"حالت پیش فرض"}
                            checked={this.state.type===1}
                            onSelect={()=>this.onTypeSelect(1)}/>

                            <RadioSelect title={"حالت بنر"}
                            checked={this.state.type===2}
                            onSelect={()=>this.onTypeSelect(2)}/>

                        </div>
                        
                        <div className={styles.info2+" bdyt "}>{this.state.info_text}</div>

                    </div>

                    <div className={styles.sec1}>
                        
                        <MainButton className={styles.confirm_btn}
                        title={"ادامه"}
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

function type2Info(type){

    switch(type){

        case 1:
            return "این حالت شامل یک تیتر، متن توضیحات، تصویر و یک لینک اختیاری است.";
        case 2:
            return "این حالت شامل یک تصویر برای شروع سایت است.";
    }
}