import React, { Component } from "react";
import AskDeleteEducatorController from "@/controllers/components/modals/educators/AskDeleteEducatorController";
import chest from "@/utils/chest";
import Loading from "@/views/components/global/Loading";
import MainButton from "@/views/components/global/MainButton";
import styles from "./AskDeleteEducatorModal.module.css";
import YesNoModalLayout from "../YesNoModalLayout";

/**
* Props of AskDeleteEducatorModal Component
* @typedef Props
* @property {string} className
* @property {React.CSSProperties} style
* 
* @extends {Component<Props>}
*/
export default class AskDeleteEducatorModal extends Component {

    constructor(props){
        super(props);

        this.controller = new AskDeleteEducatorController(this);

        this.state={
            loading:false,
        }
    }

    componentDidMount(){
    }
    

    onCancel=()=>{
        if(this.state.loading){
            return;
        }
        
        if(this.props.onCancel){
            this.props.onCancel();
        }else{
            chest.ModalLayout.visibleToggle(2, false, ()=>{
                chest.ModalLayout.visibleToggle(1, true);
            });
        }
    }

    onDelete=()=>{
        this.controller.confirmDelete();
    }
    
    render(){

        let d = this.props.data;
        let title = "آیا می خواهید دبیر با نام " +d.first_name+" "+d.last_name+" را از لیست دبیران خود حذف کنید؟";

        return(
            <YesNoModalLayout className={styles.con+" bgw lg_card_shd"}
            closable={false}
            positiveClassName={"tbgcerr flc1i"}
            positiveTitle={"حذف"}
            onPositive={this.onDelete}
            positiveLoading={this.state.loading}
            negativeClassName={""}
            negativeBorderMode={true}
            negativeTitle={"انصراف"}
            onNegative={this.onCancel}>

                <div className={styles.title+" tilt"}>{title}</div>

            </YesNoModalLayout>
        )
    }
}