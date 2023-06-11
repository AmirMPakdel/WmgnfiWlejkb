import React, { Component } from "react";
import styles from "./EditSitesIconModal.module.css";
import chest from "@/utils/chest";
import MainButton from "../../global/MainButton";
import CrossSvg from "@/views/svgs/Cross";
import EditSitesIconController from "@/controllers/components/modals/settings/EditSitesIconController";
import Loading from "../../global/Loading";
import CloseModalLayout from "../CloseModalLayout";

/**
* Props of EditSitesIconModal Component
* @typedef Props
* @property {string} className
* @property {React.CSSProperties} style
* 
* @extends {Component<Props>}
*/
export default class EditSitesIconModal extends Component {
    
    constructor(props){
        super(props);
        this.controller = new EditSitesIconController(this);
        this.state = {
            loading:true,
            file:null,
            image_src:null,
            loading_btn: false,
        }
    }
    
    componentDidMount(){
        this.controller.checkImage();
    }

    onFile=(event)=>{
        this.controller.onFile(event);
    }

    onClick=()=>{
        this.input.click();
    }

    onCancel=()=>{
        chest.ModalLayout.closeAndDelete(1);
    }
    
    onConfirm=()=>{
        this.controller.onConfirm();
    }
    
    render(){

        return(
            <CloseModalLayout className={styles.con+" bgw xl_card_shd"}
            onClose={this.onCancel}>

                {
                    this.state.loading?
                    <Loading style={{minHeight:"20rem"}}/>:
                    <div className={styles.wrapper}>

                        <div className={styles.title+" tilt "}>{"ویرایش آیکون سایت"}</div>

                        <div className={styles.form_body} onClick={this.onClick}>

                            <input style={{display:"none"}}
                            type={"file"}
                            accept=".jpg, .png"
                            ref={r=>this.input=r}/>

                            <div className={styles.img_con+" tbc1 amp_btn"}>
                            
                                {
                                    this.state.image_src?
                                    <img className={styles.img} src={this.state.image_src}/>:
                                    <>
                                        {
                                            this.props.uploadKey?
                                            <img className={styles.img} src={myServer.MediaFiles.publicImage(this.props.uploadKey)}/>:
                                            <div className={styles.add_img+" tc2"}>+</div>
                                        }
                                    </>    
                                }

                            </div>

                        </div>

                        <div className={styles.sec1}>
                            
                            <MainButton className={styles.confirm_btn}
                            title={"ویرایش"}
                            disabled={!this.state.file}
                            loading={this.state.loading_btn}
                            onClick={this.onConfirm}/>

                        </div>

                    </div>
                }

            </CloseModalLayout>
        )
    }
}