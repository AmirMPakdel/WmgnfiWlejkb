import React, { Component } from "react";
import AskDeleteEducatorController from "@/controllers/components/modals/educators/AskDeleteEducatorController";
import chest from "@/utils/chest";
import Loading from "@/views/components/global/Loading";
import MainButton from "@/views/components/global/MainButton";
import styles from "./AskDeleteEducatorModal.module.css";

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
                            onClick={this.onDelete}/>

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