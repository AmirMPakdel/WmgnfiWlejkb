import RemoveWishlistController from "@/controllers/components/modals/stdPanel/RemoveWishlistController";
import chest from "@/utils/chest";
import React, { Component } from "react";
import YesNoModalLayout from "../YesNoModalLayout";
import styles from "./RemoveWishlistModal.module.css";

/**
* Props of RemoveWishlistModal Component
* @typedef Props
* @property {string} className
* @property {React.CSSProperties} style
* @property {Objec} data
* @property {()=>{}} onDelete
* 
* @extends {Component<Props>}
*/
export default class RemoveWishlistModal extends Component {
    
    constructor(props){
        super(props);
        this.controller = new RemoveWishlistController(this);
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

        chest.ModalLayout.closeAndDelete(1);
    }

    onDelete=()=>{

        this.controller.confirmDelete();
    }
    
    render(){

        let title = "آیا می خواهید دوره مورد نظر را از لیست علاقه مندی خود حذف کنید؟";

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