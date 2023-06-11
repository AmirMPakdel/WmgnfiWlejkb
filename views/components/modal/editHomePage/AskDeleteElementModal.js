import React, { Component } from "react";
import Loading from "../../global/Loading";
import MainButton from "../../global/MainButton";
import YesNoModalLayout from "../YesNoModalLayout";
import styles from "./AskDeleteElementModal.module.css";

/**
* Props of AskDeleteElementModal Component
* @typedef Props
* @property {string} className
* @property {React.CSSProperties} style
* 
* @extends {Component<Props>}
*/
export default class AskDeleteElementModal extends Component {
    
    constructor(props){
        super(props);
        this.state={
            loading:false,
        }
    }

    componentDidMount(){
    }
    
    onCancel=()=>{
        
        if(this.state.loading){return};

        if(this.props.onCancel){
            this.props.onCancel();
        }
    }

    onConfirm=()=>{
        
        if(this.state.loading){return};

        if(this.props.onConfirm){
            this.props.onConfirm();
        }
    }
    
    render(){

        let d = this.props.data;
        let title = "آیا می خواهید آیتم صفحه اول سایت با عنوان \" " +d.title+" \" را حذف کنید؟";

        return(
            <YesNoModalLayout className={styles.con+" bgw tbc2 lg_card_shd"}
            closable={false}
            positiveClassName={"tbgcerr flc1i"}
            positiveTitle={"حذف"}
            onPositive={this.onConfirm}
            positiveLoading={this.state.loading}
            negativeTitle={"انصراف"}
            onNegative={this.onCancel}
            negativeBorderMode={true}>

                <div className={styles.title+" tilt"}>{title}</div>

            </YesNoModalLayout>
        )
    }
}