import React, { Component } from "react";
import styles from "./UploadMedia.module.css";
import UploadSVG from "@/views/svgs/Upload";
import myServer from "@/utils/myServer";

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
        this.state = {
            src: null,
            file: null,
        }
        if(props.defaultUploadKey && props.type == "image" ){
            this.state.src = myServer.MediaFiles.publicImage(props.defaultUploadKey);
        }
        if(props.defaultUploadKey && props.type == "video"){
            this.state.src = myServer.MediaFiles.publicVideo(props.defaultUploadKey);
        }
        if(!props.defaultUploadKey){
            this.state.src = props.defaultSrc;
        }
    }
    
    componentDidMount(){

        this.file_input.onchange=this.onInputChange;
    }

    onSelect=()=>{

        this.file_input.click();
        this.file_input.onClick=this.onInputClick;
    }

    onInputClick=()=>{
        //!important - reset the values so selection same file would fire "onChange" event
        this.file_input.files = null;
        this.file_input.value = null;
    }

    onInputChange=(e)=>{

        let file = e.target.files[0];
        
        if(!file){
            return;
        }

        let maxSize = 5;
        if(this.props.type==="video"){
            maxSize = 50;
        }

        if(file.size < (maxSize*1024*1024)){

            this.setState({
                src : URL.createObjectURL(file),
                file: file,
            });

        }else{
            
            maxSize+="MB";
            chest.openNotification("فایل انتخابی حجم بالای "+maxSize+" مگابایت دارد", "error");
        }
    }

    onShowFile=()=>{
        
        window.open(this.state.src);
    }

    getFile=()=>{
        return this.state.file;
    }

    getFileUrl=()=>{
        return this.state.src;
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

                    <div className={styles.upload_btn+" tbgc1 amp_btn"}
                    onClick={this.onSelect}>
                        
                        <UploadSVG className={styles.upload_svg}/>

                    </div>

                    <input style={{display:"none"}}
                    ref={r=>this.file_input=r}
                    type={"file"}
                    accept={this.props.type==="video"?".mp4":".jpg, .png"}/>
                    
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
                        <a className={styles.show_media}
                        onClick={this.onShowFile}>{"مشاهده"}</a>
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