import React, { Component } from "react";
import styles from "./ContentCard.module.css";
import {Collapse} from "react-collapse";
import IconLine from "./IconLine";
import Course from "@/views/dynamics/index/Course";

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
                            <ContentRow key={i} data={v}/>
                        ))
                    }
                </Collapse>
            </div>
        )
    }
}

class ContentRow extends Component{
    
    render(){
        return(
            <div className={styles.crow_con}>
                <IconLine key={i} className={styles.crow_icon_line+" cpnti"}
                icon="/statics/svg/crs_play_icn.svg" 
                text={v.title}/>
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