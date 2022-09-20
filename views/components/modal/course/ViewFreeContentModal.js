import React, { Component } from "react";
import VideoCard from "../../global/VideoCard";
import styles from "./ViewFreeContentModal.module.css";
import myServer from "@/utils/myServer";
import Observer from "@/utils/observer";
import CloseModalLayout from "../CloseModalLayout";

/**
* Props of ViewFreeContentModal Component
* @typedef Props
* @property {string} className
* @property {React.CSSProperties} style
* 
* @extends {Component<Props>}
*/
export default class ViewFreeContentModal extends Component {
    
    constructor(props){
        super(props);
        //this.controller = new ViewFreeContentModalController(this);
        this.state = {
            doc_width: 0,
            doc_width: 0,
        }
    }
    
    componentDidMount(){
        
        if(this.props.data.type === "ct_document"){
            this.setup_doc_size();
            Observer.add("onResize", this.setup_doc_size)
        }
    }

    componentWillUnmount(){

        Observer.remove("onResize", this.setup_doc_size);
    }

    setup_doc_size=()=>{

        let w = window.innerWidth;

        if(w > 1024){

            this.setState({doc_width:920, doc_height: 518});

        }else if( w > 767){

            this.setState({doc_width:700, doc_height: 392});

        }else{

            this.setState({doc_width:300, doc_height: 168});
        }
    }

    onClose = ()=>{
        if(this.props.onClose){
            this.props.onClose();
        }
    }
    
    render(){
        let d = this.props.data;
        let title = "آیا از حذف دسته با عنوان \""+ d.title+"\" اطمینان دارید؟";

        return(
            
            <CloseModalLayout className={styles.con}
            wrapperClass={styles.wrapper}
            onClose={this.onClose}>

                <div className={styles.title+" tilt"}>{d.title}</div>


                {
                    d.type === "ct_voice"?
                    <audio className={styles.voice_con} controls 
                    src={myServer.MediaFiles.freeCourseMedia(this.props.data.url)}/>
                    :null
                }

                {
                    d.type === "ct_video"?
                    <VideoCard className={styles.video_con}
                    uploadKey={this.props.data.url}
                    is_free={true}/>
                    :null
                }

                {
                    d.type === "ct_document"?
                    <iframe src={"https://docs.google.com/gview?url="+myServer.MediaFiles.freeCourseMedia(this.props.data.url)+"&embedded=true"} 
                    frameborder="0" width={this.state.doc_width} height={this.state.doc_height} >
                    </iframe>
                    :null
                }

                
            </CloseModalLayout>
        )
    }
}