import React, { Component } from "react";
import styles from "./EditableImage.module.css";
import chest from "@/utils/chest";
import myServer from "@/utils/myServer";

/**
* Props of EditableImage Component
* @typedef Props
* @property {string} className
* @property {React.CSSProperties} style
* 
* @extends {Component<Props>}
*/
export default class EditableImage extends Component {
    
    constructor(props){
        super(props);

        this.state = {
            image_file: null,
            image_url: null,
        }

        if(props.uploadKey){
            
            this.state.image_url = myServer.MediaFiles.publicImage(props.uploadKey);

        }else{

            this.state.image_url = props.defaultSrc;
        }
    }
    
    componentDidMount(){
    }

    onInputClick=()=>{
        //!important - reset the values so selection same file would fire "onChange" event
        this.input.files = null;
        this.input.value = null;
    }

    onInputChange=(e)=>{

        let file = e.target.files[0];
        
        if(!file){
            return;
        }

        let url = URL.createObjectURL(file);
        let img = new Image();
        img.src = url;
        
        img.onload = ()=>{

            this.setState({
                image_url : img.src,
                image_file: file,
            }, ()=>{
                this.props.onSelect();
            });
        };
    }

    onEdit = ()=>{
        this.input.click();
    }

    onCancel = ()=>{
        let image_url = "";
        if(this.props.oldUploadKey){
            image_url = myServer.MediaFiles.publicImage(this.props.oldUploadKey);
        }else{
            image_url = this.props.defaultSrc;
        }
        this.setState({image_url})
    }
    
    render(){

        return(
            <div className={styles.con+" bdc2 md_card_shd "+this.props.className}
            style={{
                backgroundImage: `url(${this.state.image_url})`
            }}>

                <input ref={r=>this.input=r} 
                onClick={this.onInputClick}
                onChange={this.onInputChange}
                type="file" accept=".jpg, .png"
                style={{display:"none"}}/>

            </div>
        )
    }
}