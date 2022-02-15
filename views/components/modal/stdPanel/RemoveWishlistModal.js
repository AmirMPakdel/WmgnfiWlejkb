import RemoveWishlistController from "@/controllers/components/modals/stdPanel/RemoveWishlistController";
import chest from "@/utils/chest";
import React, { Component } from "react";
import Loading from "../../global/Loading";
import MainButton from "../../global/MainButton";
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
        chest.ModalLayout.closeAndDelete(1);
    }

    onDelete=()=>{
        this.controller.confirmDelete();
    }
    
    render(){

        let title = "آیا می خواهید دوره مورد نظر را از لیست علاقه مندی خود حذف کنید؟";

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