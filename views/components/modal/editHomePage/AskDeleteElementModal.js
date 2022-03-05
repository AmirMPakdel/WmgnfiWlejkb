import React, { Component } from "react";
import Loading from "../../global/Loading";
import MainButton from "../../global/MainButton";
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
            <div className={styles.con+" bglc1 btc2 lg_card_shd"}>

                {
                    this.state.loading?
                    <Loading style={{minHeight:"12rem"}} scale={0.8}/>:null
                }
                {
                    !this.state.loading?
                    <>
                        <div className={styles.title+" tilt"}>{title}</div>

                        <div className={styles.sec1}>

                            <MainButton className={"bgec"}
                            titleClassName={"flc1i"}
                            title={"حذف"}
                            onClick={this.onConfirm}/>

                            <MainButton className={""} 
                            title={"انصراف"}
                            borderMode={true}
                            onClick={this.onCancel}/>

                        </div>
                    </>:null
                }

            </div>
        )
    }
}