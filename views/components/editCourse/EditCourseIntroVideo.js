import React, { Component } from "react";
import EditCourseIntroVideoController from "@/controllers/components/editCourse/EditCourseIntroVideoController";
import EditCourse from "@/views/dynamics/dashboard/EditCourse";
import EditableTitle from "@/views/components/editable/EditableTitle";
import EditableVideo from "@/views/components/editable/EditableVideo";
import styles from "./EditCourseIntroVideo.module.css";
import UploadSvg from "@/views/svgs/Upload";

/**
* Props of EditCourseIntroVideo Component
* @typedef Props
* @property {string} className
* @property {React.CSSProperties} style
* @property {EditCourse} parent
* 
* @extends {Component<Props>}
*/
export default class EditCourseIntroVideo extends Component {
    
    constructor(props){
        super(props);
        this.controller = new EditCourseIntroVideoController(this);
        this.state = {
        
        }
    }
    
    componentDidMount(){
    }

    onEdit=()=>{

        this.controller.onEdit();
    }

    onSelect=()=>{
        
        this.controller.onSelect();
    }

    onSubmit=()=>{

        this.controller.onSubmit(this.EditableImage.state.file);
    }

    onCancel=()=>{

        this.controller.onCancel();
    }
    
    render(){
        
        let p = this.props.parent;
        let ps = p.state;
        let st = ps.status;
        let od = ps.old_values;
        let nw = ps.new_values;

        return(
            <div className={styles.con}>

                <EditableTitle
                title={"ویدیو معرفی دوره"}
                editIcon={UploadSvg}
                status={st.intro_video}
                onEdit={this.onEdit}
                onSubmit={this.onSubmit}
                onCancel={this.onCancel}/>

                <ul className={styles.info_sec}>

                    <li className={"engNum"}>{"ویدیویی کوتاه برای معرفی دوره خود بارگذاری نمایید."}</li>

                    <li className={"engNum"}>{"حداکثر سایز ویدیو 100MB است."}</li>

                </ul>

                <EditableVideo
                ref={r=>this.EditableImage=r}
                onSelect={this.onSelect}
                className={styles.video}
                defaultPoster={"/statics/default_img/default_intro_video.png"}
                uploadKey={nw.intro_video.url}
                oldUploadKey={od.intro_video.url}/>
                
            </div>
        )
    }
}