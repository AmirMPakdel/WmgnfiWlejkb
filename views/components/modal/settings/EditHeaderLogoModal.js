import EditHeaderLogoController from "@/controllers/components/modals/settings/EditHeaderLogoController";
import React, { Component } from "react";
import styles from "./EditHeaderLogoModal.module.css";
import chest from "@/utils/chest";
import MainButton from "../../global/MainButton";
import CrossSvg from "@/views/svgs/Cross";
import Loading from "../../global/Loading";
import myServer from "@/utils/myServer";
import CloseModalLayout from "../CloseModalLayout";

/**
* Props of EditHeaderLogoModal Component
* @typedef Props
* @property {string} className
* @property {React.CSSProperties} style
* 
* @extends {Component<Props>}
*/
export default class EditHeaderLogoModal extends Component {
    
    constructor(props){
        super(props);
        this.controller = new EditHeaderLogoController(this);
        this.state = {
            loading:true,
            logo:null,
            image_src:null,
            file:null,
            loading_btn: false,
        }
    }
    
    componentDidMount(){
        this.controller.loadImage();
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
                    <Loading style={{minHeight:"20rem"}}/>
                    :
                    <div className={styles.wrapper}>

                        <div className={styles.title+" tilt "}>{"ویرایش آیکون سایت"}</div>

                        <div className={styles.form_body} onClick={this.onClick}>

                            <input style={{display:"none"}}
                            type={"file"}
                            accept=".jpg, .png"
                            onChange={this.onFile}
                            ref={r=>this.input=r}/>

                            <div className={styles.img_con+" btc1 amp_btn"}>

                                <img className={styles.img} 
                                src={this.state.file?this.state.image_src:myServer.MediaFiles.publicImage(this.state.logo, "header_logo")}/>

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