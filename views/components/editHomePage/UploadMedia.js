import React, { Component } from "react";
import styles from "./UploadMedia.module.css";
import UploadSVG from "@/views/svgs/Upload";

/**
* Props of UploadMedia Component
* @typedef Props
* @property {string} className
* @property {React.CSSProperties} style
* 
* @extends {Component<Props>}
*/
export default class UploadMedia extends Component {
    
    constructor(props){
        super(props);
        //this.controller = new UploadMediaController(this);
        this.state = {
            //src: "/statics/fake_img/15.jpg",
            src: null,
        }
    }
    
    componentDidMount(){
    }
    
    render(){
        let formats = "jpg, png";
        let maxSize = "5MB";
        let aspectRatio = "16:9";

        if(this.props.type==="video"){
            formats = "mp4";
            maxSize = "50MB";
        }

        return(
            <div className={styles.con+" "+this.props.className}>

                <div className={styles.wrapper+" blc2 bgw "}>

                    <div className={styles.upload_btn+" bgtc1 amp_btn"}>
                        
                        <UploadSVG className={styles.upload_svg}/>

                    </div>
                    
                    {
                        this.state.src && this.props.type==="image"?
                        <div className={styles.image}
                        style={{backgroundImage:`url("${this.state.src}")`}}/>
                        :null
                    }
                    {
                        this.state.src && this.props.type==="video"?
                        <video className={styles.video}
                        src={this.state.src}/>
                        :null
                    }
                    {
                        this.state.src?
                        <a className={styles.show_media}>{"مشاهده"}</a>
                        :null
                    }

                    <div className={styles.title+" fdc2 bdyt"}>{this.props.title}</div>
                
                </div>

                <div className={styles.caption+" eng_num fdc2"}>
                {"فرمت های مجاز :"+ formats + " - " + "حداکثر حجم مجاز : "+ maxSize + " - " + "نسبت ابعاد تصویر : "+ aspectRatio}
                </div>

            </div>
        )
    }
}