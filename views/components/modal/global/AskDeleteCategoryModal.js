import React, { Component } from "react";
import Loading from "../../global/Loading";
import MainButton from "../../global/MainButton";
import YesNoModalLayout from "../YesNoModalLayout";
import styles from "./AskDeleteCategoryModal.module.css";

/**
* Props of AskDeleteCategoryModal Component
* @typedef Props
* @property {string} className
* @property {React.CSSProperties} style
* 
* @extends {Component<Props>}
*/
export default class AskDeleteCategoryModal extends Component {
    
    constructor(props){
        super(props);
        this.state = {
        
        }
    }
    
    componentDidMount(){

    }

    onConfirm = ()=>{
        if(this.props.onConfirm){
            this.props.onConfirm(this.props.data, this.props.parentNode);
        }
    }

    onCancel = ()=>{
        if(this.state.loading){
            return;
        }
        
        if(this.props.onCancel){
            this.props.onCancel();
        }
    }
    
    render(){
        let d = this.props.data;
        let title = "آیا از حذف دسته با عنوان \""+ d.title+"\" اطمینان دارید؟";

        return(
            <YesNoModalLayout className={styles.con+" bgw lg_card_shd"}
            closable={false}
            positiveClassName={"bgec flc1i"}
            positiveTitle={"حذف"}
            onPositive={this.onConfirm}
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