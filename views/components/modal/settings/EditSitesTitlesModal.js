import React, { Component } from "react";
import styles from "./EditSitesTitlesModal.module.css";
import chest from "@/utils/chest";
import MainButton from "../../global/MainButton";
import CrossSvg from "@/views/svgs/Cross";
import EditSitesTitlesController from "@/controllers/components/modals/settings/EditSitesTitlesController";
import TextInput from "../../global/TextInput";
import Loading from "../../global/Loading";

/**
* Props of EditSitesTitlesModal Component
* @typedef Props
* @property {string} className
* @property {React.CSSProperties} style
* 
* @extends {Component<Props>}
*/
export default class EditSitesTitlesModal extends Component {
    
    constructor(props){
        super(props);
        this.controller = new EditSitesTitlesController(this);
        this.state = {
            loading:true,
            title:"",
            motto:"",
        }
    }
    
    componentDidMount(){
        this.controller.loadSiteTitle();
    }

    onInput=(k, v)=>{
        this.state[k]=v;
        this.setState(this.state);
    }

    onCancel=()=>{
        chest.ModalLayout.closeAndDelete(1);
    }

    onConfirm=()=>{
        this.controller.saveSiteInfo();
    }
    
    render(){

        return(
            <div className={styles.con+" bglc1 btc2 xl_card_shd"}>

                <CrossSvg className={styles.close_btn + " bglc1 amp_btn md_card_shd"}
                stroke={env.THEME.dc1}
                onClick={this.onCancel}/>

                {
                    this.state.loading?
                    <Loading style={{height:"20rem"}}/>:
                    <div className={styles.wrapper}>

                        <div className={styles.title+" tilt "}>{"ویرایش عنوان سایت"}</div>

                        <div className={styles.form_body}>

                            <TextInput className={styles.title_input}
                            placeholder={"عنوان سایت"}
                            value={this.state.title}
                            onChange={(v)=>this.onInput("title",v)}/>

                            <TextInput className={styles.motto_input}
                            placeholder={"شعار سایت"}
                            value={this.state.motto}
                            onChange={(v)=>this.onInput("motto",v)}/>

                        </div>

                        <div className={styles.sec1}>
                            
                            <MainButton className={styles.confirm_btn}
                            title={"ویرایش"}
                            loading={this.state.btn_loading}
                            onClick={this.onConfirm}/>

                        </div>

                    </div>
                }

            </div>
        )
    }
}