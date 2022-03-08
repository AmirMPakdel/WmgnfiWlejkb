import React, { Component } from "react";
import Loading from "../../global/Loading";
import MainButton from "../../global/MainButton";
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
        if(this.props.onCancel){
            this.props.onCancel();
        }
    }
    
    render(){
        let d = this.props.data;
        let title = "آیا از حذف دسته با عنوان \""+ d.title+"\" اطمینان دارید؟";

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