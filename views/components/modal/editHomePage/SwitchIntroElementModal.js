import React, { Component } from "react";
import styles from "./SwitchIntroElementModal.module.css";
import MainButton from "../../global/MainButton";
import CrossSvg from "@/views/svgs/Cross";
import chest from "@/utils/chest";
import { Radio } from "node_modules/antd/lib/index";
import EditIntroElementModal from "./EditIntroElementModal";
import CloseModalLayout from "../CloseModalLayout";

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
            template: this.props.template,
            info_text: template2Info(this.props.template),
            guide_image_src: "/statics/img/guide_intro_default.jpg",
        }
    }
    
    componentDidMount(){
    }

    onCancel=()=>{

        let modal = <EditIntroElementModal data={this.props.data}/>;
        chest.ModalLayout.setAndShowModal(1, modal);
    }

    onTypeSelect=(template)=>{

        let guide_image_src = "";
        if(template == 1){
            guide_image_src = "/statics/img/guide_intro_default.jpg";
        }else if(template == 2){
            guide_image_src = "/statics/img/guide_intro_banner.jpg";
        }

        this.setState({template, info_text: template2Info(template), guide_image_src});
    }

    onConfirm=()=>{

        let newData = Object.assign({}, this.props.data);
        newData.template = this.state.template;

        let modal = <EditIntroElementModal data={newData} parent={this.props.parent}/>;
        chest.ModalLayout.setAndShowModal(1, modal);
    }
    
    render(){
        return(
            <CloseModalLayout className={styles.con+" bgw tbc2 xl_card_shd"}
            onClose={this.onCancel}>

                <div className={styles.title+" tilt "}>{"تغییر حالت شروع سایت"}</div>

                <div className={styles.wrapper}>

                    <div className={styles.form_body}>

                        <div className={styles.info1+" bdyt "}>{"یک گزینه را برای حالت شروع سایت انتخاب کنید."}</div>

                        <div className={styles.type_select_sec}>

                            <RadioSelect title={"حالت پیش فرض"}
                            checked={this.state.template===1}
                            onSelect={()=>this.onTypeSelect(1)}/>

                            <RadioSelect title={"حالت بنر"}
                            checked={this.state.template===2}
                            onSelect={()=>this.onTypeSelect(2)}/>

                        </div>
                        
                        <img className={styles.guide_image+" sm_card_shd"} src={this.state.guide_image_src}/>

                        <div className={styles.info2+" bdyt "}>{this.state.info_text}</div>

                    </div>

                    <div className={styles.sec1}>
                        
                        <MainButton className={styles.confirm_btn}
                        title={"ادامه"}
                        loading={this.state.btn_loading}
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

function template2Info(template){

    switch(template){

        case 1:
            return "این حالت شامل یک تیتر، متن توضیحات، تصویر و یک لینک اختیاری است.";
        case 2:
            return "این حالت شامل یک تصویر برای شروع سایت است.";
    }
}