import React, { Component } from "react";
import styles from "./ContentCard.module.css";
import {Collapse} from "react-collapse";
import IconLine from "./IconLine";
import Course from "@/views/dynamics/index/Course";
import MainButton from "../global/MainButton";
import { getTenant } from "@/utils/helpers";
import myServer from "@/utils/myServer";

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
        let contents = extractContents(heading, c);

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
            title = <span>{d.title} <span className={styles.crow_free_t}>{"رایگان"}</span></span>
        }
        let play_tab_href = createPlayUrl(d);
        let download_href = createDownloadUrl(d);
        return(
            <div className={styles.crow_con}>

                <IconLine className={styles.crow_icon_line+" cpnti"} 
                icon="/statics/svg/crs_play_icn.svg" 
                text={title}/>

                {
                    d.is_free?
                    <>
                    <a className={styles.crow_play} 
                    href={play_tab_href}
                    target="_blank" 
                    rel="noopener noreferrer">
                        {"نمایش"}
                    </a>
                    </>
                    :
                    <>
                    {
                        access == "4"?
                        <a className={styles.crow_dl} href={download_href}>{"دانلود"}</a>
                        :
                        <div className={styles.crow_locked}>{"قفل"}</div>
                    }
                    </>
                }

            </div>
        )
    }
}

function extractContents(heading, course){

    let ch = course.content_hierarchy;
    ch = JSON.parse(ch);

    let content_ids = [];

    ch.forEach((v)=>{
        if(v.h_id === heading.id){
            content_ids = v.content_ids;
        }
    });

    let heading_contents = [];
    course.contents.forEach((v1)=>{
        content_ids.forEach((v2)=>{
            if(v1.id == v2){
                heading_contents.push(v1);
            }
        });
    });

    return heading_contents;
}

function createPlayUrl(data){

    if(data.url && data.is_free){
        return myServer.MediaFiles.freeCourseMedia(data.url);
    }

    return null;
}

function createDownloadUrl(data){

    if(!data.url){
        return null;
    }

    return myServer.MediaFiles.freeCourseMedia(data.url);
}

function createDownloadName(url){

    if(!url){
        return null;
    }

    let url_array = url.split("/");
    return url_array[url_array.length-1];
}