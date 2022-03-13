import React, { Component } from "react";
import styles from "./EditableVideo.module.css";
import chest from "@/utils/chest";
import myServer from "@/utils/myServer";

/**
* Props of EditableVideo Component
* @typedef Props
* @property {string} className
* @property {React.CSSProperties} style
* 
* @extends {Component<Props>}
*/
export default class EditableVideo extends Component {
    
    constructor(props){
        super(props);
        this.state = {
            file: null,
            url: null
        }

        if(props.uploadKey){
            
            this.state.url = myServer.MediaFiles.publicVideo(props.uploadKey);

        }else{

            this.state.url = props.defaultSrc;
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

        if(file.size < (480*1024*1024)){

            this.setState({
                url : URL.createObjectURL(file),
                file: file,
            }, ()=>{
                this.props.onSelect();
            });

        }else{
            chest.openNotification("ویدیوی انتخابی حجم بالای 480 مگابایت دارد", "error");
        }
    }

    onEdit = ()=>{
        this.input.click();
    }

    onCancel = ()=>{
        let url = "";
        if(this.props.oldUploadKey){
            url = myServer.MediaFiles.publicVideo(this.props.oldUploadKey);
        }else{
            url = this.props.defaultSrc;
        }
        this.setState({url})
    }
    
    render(){
        return(
            <div className={styles.con+" bdc2 md_card_shd "+this.props.className}>

                {
                    this.state.url?
                    <video className={styles.video} 
                    ref={r=>this.video=r}
                    src={this.state.url}
                    controls={true} preload={false}/>
                    :
                    <img className={styles.video} src={this.props.defaultPoster}/>   
                }
                
                <input ref={r=>this.input=r} 
                onClick={this.onInputClick}
                onChange={this.onInputChange}
                type="file" accept=".mp4" 
                style={{display:"none"}}/>

            </div>
        )
    }
}