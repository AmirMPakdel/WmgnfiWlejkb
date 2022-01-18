import React, { Component } from "react";
import chest from "@/utils/chest";
import EditCourseContents from "@/views/components/editCourse/EditCourseContents";
import AddContentModal from "@/views/components/modal/editCourse/AddContentModal";
import styles from "./NewContentTypeModal.module.css";
import CrossSvg from "@/views/svgs/Cross";

/**
* Props of NewContentTypeModal Component
* @typedef Props
* @property {string} className
* @property {React.CSSProperties} style
* @property {EditCourseContents} parent
* 
* @extends {Component<Props>}
*/
export default class NewContentTypeModal extends Component {
    
    constructor(props){
        super(props);
        this.state = {
        
        }
    }
    
    componentDidMount(){
    }

    onCancel=()=>{

        chest.ModalLayout.closeAndDelete(1);
    }

    onVideo=()=>{
        
        let modal = <AddContentModal heading={this.props.heading} parent={this.props.parent} type={"video"}/>

        chest.ModalLayout.setModal(1, modal, ()=>{

            chest.ModalLayout.visibleToggle(1, true);
        });
        
    }

    onAudio=()=>{

        let modal = <AddContentModal heading={this.props.heading} parent={this.props.parent} type={"audio"}/>

        chest.ModalLayout.setModal(1, modal, ()=>{

            chest.ModalLayout.visibleToggle(1, true);
        });
    }

    onText=()=>{

        let modal = <AddContentModal heading={this.props.heading} parent={this.props.parent} type={"text"}/>

        chest.ModalLayout.setModal(1, modal, ()=>{

            chest.ModalLayout.visibleToggle(1, true);
        });
    }
    
    render(){
        let type_btn = styles.type_btn + " bgtc1 btc2 tilt amp_btn"
        return(
            <div className={styles.con+" bglc1 "}>

                <CrossSvg className={styles.close_btn + " bglc1 amp_btn md_card_shd"} 
                stroke={env.THEME.dc1}
                onClick={this.onCancel}/>

                <div className={styles.title+" tilt"}>{"نوع محتوای جدید را انتخاب کنید."}</div>

                <div className={type_btn} onClick={this.onVideo}>{"فایل ویدیویی"} <span>{"(mp4)"}</span> </div>

                <div className={type_btn} onClick={this.onAudio}>{"فایل صوتی"} <span>{"(mp3)"}</span> </div>

                <div className={type_btn} onClick={this.onText}>{"فایل متنی"} <span>{"(pdf)"}</span> </div>
                
            </div>
        )
    }
}