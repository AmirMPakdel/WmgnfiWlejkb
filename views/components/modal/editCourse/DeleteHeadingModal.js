import React, { Component } from "react";
import DeleteHeadingController from "@/controllers/components/modals/editCourse/DeleteHeadingController";
import MainButton from "@/views/components/global/MainButton";
import styles from "./DeleteHeadingModal.module.css";
import CloseModalLayout from "../CloseModalLayout";

/**
* Props of DeleteHeadingModal Component
* @typedef Props
* @property {string} className
* @property {React.CSSProperties} style
* @property {EditCourseContents} parent
* 
* @extends {Component<Props>}
*/
export default class DeleteHeadingModal extends Component {
    
    constructor(props){
        super(props);
        this.controller = new DeleteHeadingController(this);
        this.state = {
            delete_loading:false,
        }
    }
    
    componentDidMount(){
    }

    onCancel=()=>{
        this.controller.onCancel();
    }
    
    onDelete=()=>{
        this.controller.onDelete();
    }
    
    render(){
        let heading = this.props.heading;
        return(
            <CloseModalLayout className={styles.con+" bgw"}
            wrapperClass={styles.wrapper}
            onClose={this.onCancel}>

                {
                    heading.children.length?
                    <>
                    <div className={styles.title+" tilt"}>{"برای حذف این سرفصل ابتدا آن را خالی از محتویات کنید."}</div>

                    <div className={styles.sec1}>

                        <MainButton className={styles.back_btn}
                        title={"متوجه شدم"}
                        borderMode
                        onClick={this.onCancel}/>

                    </div>
                    </>
                    :
                    <>
                    <div className={styles.title+" tilt"}>{"سرفصل "+heading.title+" حذف شود؟"}</div>

                    <div className={styles.sec1}>

                        <MainButton className={styles.submit_btn+" fw bgec"}
                        title={"حذف"}
                        onClick={this.onDelete}
                        loading={this.state.delete_loading}/>

                        <MainButton className={styles.cancel_btn}
                        title={"انصراف"}
                        borderMode
                        onClick={this.onCancel}/>

                    </div>
                    </>
                }
            </CloseModalLayout>
        )
    }
}