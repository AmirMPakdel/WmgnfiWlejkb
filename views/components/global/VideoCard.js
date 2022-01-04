import React, { Component } from "react";
import myServer from "@/utils/myServer";
import styles from "./VideoCard.module.css";

/**
 * 
 * @typedef Props
 * @property {string} className
 * @property {string} thumbnail
 * @property {string} playBtnClassName
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

        return(
            <div className={styles.con+" "+this.props.className+" "+addClass}
            // style={{backgroundImage:`url(${this.props.thumbnail})`}}
            >

                <video className={styles.video} 
                ref={r=>this.video=r}
                src={myServer.MediaFiles.publicVideo(this.props.uploadKey)}
                controls={this.state.controls}/>

                {
                    !this.state.is_playing?
                    <img className={styles.play_btn+" "+this.props.playBtnClassName+" amp_btn"} 
                    src={"/svg/video_play_big.svg"}
                    onClick={this.onPlay}/>:null
                }
                
                
            </div>
        )
    }
}