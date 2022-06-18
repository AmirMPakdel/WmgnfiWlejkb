import React, { Component } from "react";
import myServer from "@/utils/myServer";
import styles from "./VideoCard.module.css";

/**
 * 
 * @typedef Props
 * @property {string} className
 * @property {string} thumbnail
 * @property {string} playBtnClassName
 * @property {string} uploadKey
 * @property {boolean} is_free
 * 
 * @extends {Component<Props>}
 */
export default class VideoCard extends Component {

    state={
        controls:false,
        is_playing:false,
    }

    onPlay=()=>{
        if(!this.state.is_playing){
            this.video.play();
            this.setState({
                controls:true,
                is_playing:true,
            })
        }
    }
    
    render(){
        
        let addClass = "";

        let src = "";
        if(this.props.is_free){
            src = myServer.MediaFiles.freeCourseMedia(this.props.uploadKey);
        }else{
            src = myServer.MediaFiles.publicVideo(this.props.uploadKey);
        }

        return(
            <div className={styles.con+" "+this.props.className+" "+addClass}
            >

                <video className={styles.video} 
                ref={r=>this.video=r}
                src={src}
                controls={this.state.controls}/>

                {
                    !this.state.is_playing?
                    <img className={styles.play_btn+" "+this.props.playBtnClassName+" amp_btn"} 
                    src={"/statics/img/play_h.svg"}
                    onClick={this.onPlay}/>:null
                }
                
                
            </div>
        )
    }
}