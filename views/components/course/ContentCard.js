import React, { Component } from "react";
import styles from "./ContentCard.module.css";
import {Collapse} from "react-collapse";
import IconLine from "./IconLine";
import Course from "@/views/dynamics/index/Course";
import MainButton from "../global/MainButton";
import { getTenant, getUrlPart } from "@/utils/helpers";
import myServer from "@/utils/myServer";
import chest from "@/utils/chest";
import ViewFreeContentModal from "../modal/course/ViewFreeContentModal";

/**
* Props of ContentCard Component
* @typedef Props
* @property {string} className
* @property {React.CSSProperties} style
* @property {Course} parent
* @property {boolean} open
* 
* @extends {Component<Props>}
*/
export default class ContentCard extends Component {
    
    constructor(props){
        super(props);

        this.state={ 
            open:props.open
        }
    }
    

    toggle = ()=>{
        this.setState({open:!this.state.open})
    }

    render(){

        let c = this.props.parent.state.course;
        let heading = this.props.data;
        let contents = heading.contents;

        let src="/statics/svg/closed_ccard_icn.svg";
        if(this.state.open){src="/statics/svg/opened_ccard_icn.svg"}

        let tenant = getTenant();

        return(
            <div className={styles.ccard_con}>

                <div className={styles.iclne}>

                    <img className={styles.iclne_img+" amp_btn"} src={src}
                    onClick={this.toggle}/>

                    <div className={styles.iclne_txt+" bdyt fdc2 amp_btn"}
                    onClick={this.toggle}>
                        {this.props.data.title}
                    </div>

                </div>

                <Collapse className={styles.Collapse} isOpened={this.state.open}>

                    <div style={{height:"0.5rem"}}/>
                    {
                        contents.map((v,i)=>(
                            <ContentRow key={i} data={v} access={c.access_type}
                            tenant={tenant}/>
                        ))
                    }
                </Collapse>
            </div>
        )
    }
}

class ContentRow extends Component{

    onOpenContent=(data)=>{

        let modal = <ViewFreeContentModal
        onClose={()=>{chest.ModalLayout.closeAndDelete(1)}}
        data={data}/>
        chest.ModalLayout.setAndShowModal(1, modal);
    }

    /*
        access == "1" => need login
        access == "2" => needs to buy the course 
        access == "3" => bought the course but there is not access to it
        access == "4" => has access
    */
    render(){
        let d = this.props.data;
        let access = this.props.access;
        let title = d.title;
        if(d.is_free){
            title = <span>{d.title} <span className={styles.crow_free_t+" tc2"}>{"رایگان"}</span></span>
        }
        let download_href = createDownloadUrl(d, getUrlPart(2));

        let icon = "";
        if(d.type == "ct_video"){
            icon = "/statics/svg/crs_content_video.svg";
        }else if(d.type == "ct_document"){
            icon = "/statics/svg/crs_content_document.svg";
        }else if(d.type == "ct_voice"){
            icon = "/statics/svg/crs_content_audio.svg";
        }

        return(
            <div className={styles.crow_con}>

                <IconLine className={styles.crow_icon_line+" cpnti"} 
                icon={icon}
                text={title}/>

                {
                    d.is_free?
                    <>
                    <a className={styles.crow_icon_con} onClick={()=>this.onOpenContent(d)}>
                        <img className={styles.crow_icon} src={"/statics/svg/crs_content_play.svg"}/>
                        <a>{"نمایش"}</a>
                    </a>
                    </>
                    :
                    <>
                    {
                        access == "4"?
                        <a className={styles.crow_icon_con} href={download_href}>
                            <img className={styles.crow_icon} src={"/statics/svg/crs_content_download.svg"}/>
                            {"دانلود"}
                        </a>
                        :
                        <div className={styles.crow_icon_con}>
                            <img className={styles.crow_icon} src={"/statics/svg/crs_content_lock.svg"}/>
                            {"قفل"}
                        </div>
                    }
                    </>
                }

            </div>
        )
    }
}


function createDownloadUrl(data, course_id){

    if(!data){
        return null;
    }

    return myServer.MediaFiles.courseMedia(course_id, data.id, data.url);
}