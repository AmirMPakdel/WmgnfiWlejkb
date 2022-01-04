import React, { Component } from "react";
import UploadEducatorImageController from "@/controllers/components/educator/UploadEducatorImageController";
import styles from "./UploadEducatorImage.module.css";
import myServer from "@/utils/myServer";

/**
* Props of UploadEducatorImage Component
* @typedef Props
* @property {string} className
* @property {React.CSSProperties} style
* 
* @extends {Component<Props>}
*/
export default class UploadEducatorImage extends Component {
    
    constructor(props){
        super(props);
        this.controller = new UploadEducatorImageController(this);
        this.state = {
            file:null,
            image_src:null,
            upload_key:null,
            upload_id:null,
        }
    }
    
    componentDidMount(){
        this.input.onchange= this.onFile;
    }

    onFile=(event)=>{
        this.controller.onFile(event);
    }

    upload=(cb)=>{
        this.controller.upload(cb);
    }

    onClick=()=>{
        this.input.click();
    }

    render(){
        return(
            <div onClick={this.onClick}>

                <input style={{display:"none"}}
                type={"file"}
                accept=".jpg"
                ref={r=>this.input=r}/>

                <div className={styles.img_con+" btc1 amp_btn"}>
                                
                    {
                        this.state.image_src?
                        <img className={styles.img} src={this.state.image_src}/>:
                        <>
                            {
                                this.props.uploadKey?
                                <img className={styles.img} src={myServer.MediaFiles.publicImage(this.props.uploadKey)}/>:
                                <div className={styles.add_img+" ftc2"}>+</div>
                            }
                        </>    
                    }

                </div>

            </div>
        )
    }
}