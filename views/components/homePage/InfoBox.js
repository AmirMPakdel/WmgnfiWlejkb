import React, { Component } from "react";
import styles from "./InfoBox.module.css";
import myServer from "@/utils/myServer";
import VideoCard from "@/views/components/global/VideoCard";

/**
* Props of InfoBox Component
* @typedef Props
* @property {string} className
* @property {React.CSSProperties} style
* @property {boolean} directUrl
* 
* @extends {Component<Props>}
*/
export default class InfoBox extends Component {
    
    constructor(props){
        super(props);
        //this.controller = new InfoBoxController(this);
        this.state = {
        
        }
    }
    
    componentDidMount(){
    }
    
    render(){
        
        if(this.props.data.type=="ct_none"){
            return <NoMedia data={this.props.data}/>
        }else{
            return <WithMedia index={this.props.index}
            data={this.props.data}
            directUrl={this.props.directUrl}/>
        }
        return null
    }
}

class NoMedia extends Component {

    render(){

        let d = this.props.data;

        return(
            <div className={styles.nmd_con+" bglc1"}>

                <div className={styles.nmd_title+" tilt"}>{d.title}</div>

                <div className={styles.nmd_text+" bdyt"}>{d.text}</div>

                <div className={styles.mnd_link_wrapper}>
                {
                    d.has_link?
                    <a className={styles.nmd_link+" bdyt bgtc1 fdc1"} 
                    href={d.link}>{d.link_title}</a>
                    :null
                }
                </div>

            </div>
        )
    }
}

class WithMedia extends Component {

    render(){

        let d = this.props.data;

        let card_con = styles.wm_card_left;
        let wm_wrapper = styles.wm_wrapper_left;
        if(this.props.index%2){
            card_con = styles.wm_card_right;
            wm_wrapper = styles.wm_wrapper_right
        }

        let url = "";
        if(this.props.directUrl){
            url = d.url;
        }else{
            url = myServer.MediaFiles.publicImage(d.url);
        }

        return(
        <div className={styles.wm_con}>

        <div className={card_con+" bglc1"}>

            <div className={wm_wrapper}>

                <div className={styles.wm_title_sec+" fdc2 tilt"}>
                    <span className={styles.wm_left_dashes+" ftc1"}>&#8211; &#8211; &#8212;</span>
                    <span>{d.title}</span>
                    <span className={styles.wm_right_dashes+" ftc1"}>&#8212; &#8211; &#8211;</span>
                </div>

                <div className={styles.wm_media_con}>

                {
                    d.type=="ct_image"?
                    <img className={styles.wm_media_pic} src={url}/>:
                    <VideoCard className={styles.wm_media_video}
                    uploadKey={d.url}/>
                }

                </div>

                <div className={styles.wm_sec1}>

                    <div className={styles.wm_text+" bdyt"}>{d.text}</div>

                    {
                        d.has_link?
                        <a className={styles.wm_link+" bdyt bgtc1 fdc1"} 
                        href={d.link}>{d.link_title}</a>
                        :null
                    }

                </div>
    
            </div>

        </div>

        </div>
        )
    }
}

const text1 = ` ???????? ???????????? ?????? ???????????? ???? ?????????? ?????????? ?????????????? ???? ???????? ?????? ?? ???? ?????????????? ???? ???????????? ???????????? ??????. ?????????????? ?? ???????? ???????? ?????????????? ?? ???????? ???? ???????? ?? ?????????????????? ????
???????? ?????? ?? ???????? ?????????? ???????? ???????????????? ???????? ???????? ?? ?????????????????? ?????????? ???? ?????? ?????????? ???????????????? ?????????????? ???? ????????. ?????????????? ?????????? ???? ?????? ?? ???? ???????? ???????????? ?????? ?? ??????????
?????????? ???????????? ?????????? ?? ?????????????? ???? ???? ???????? ???? ???? ?????? ?????????????? ?????????? ???????????? ???? ???????? ???????????? ???????????? ???? ?????? ???????????? ???????????? ?????????? ?? ?????????? ?????????? ???? ???????? ??????????
?????????? ??????. ???? ?????? ???????? ???? ???????? ???????? ???????? ???? ???????? ?? ???????????? ?????????? ???? ?????????? ???????????????? ?? ?????????? ?????? ???????? ???? ?????????? ?????? ?????????? ???????? ???????? ???????? ????????????????
.???????????????????? ???????? ?? ?????????????? ???????????? ???????????? ?????? ?????????? ?????????? ?????????? ?????????? ???????? ?????????????? ???????? ????????`