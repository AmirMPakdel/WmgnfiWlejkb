import React, { Component } from "react";
import styles from "./EditSitesIconModal.module.css";
import chest from "@/utils/chest";
import MainButton from "../../global/MainButton";
import CrossSvg from "@/views/svgs/Cross";
import EditSitesIconController from "@/controllers/components/modals/settings/EditSitesIconController";

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
            loading:false,
        }
    }
    
    componentDidMount(){
    }

    onCancel=()=>{
        chest.ModalLayout.closeAndDelete(1);
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

                <div className={styles.wrapper}>

                    <div className={styles.title+" tilt "}>{"ویرایش آیکون سایت"}</div>

                    <div className={styles.form_body}>

                        

                    </div>

                    <div className={styles.sec1}>
                        
                        <MainButton className={styles.confirm_btn}
                        title={"ویرایش"}
                        loading={this.state.btn_loading}
                        onClick={this.onConfirm}/>

                    </div>

                </div>

            </div>
        )
    }
}