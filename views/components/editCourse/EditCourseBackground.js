import React, { Component } from "react";
import EditableTitle from "@/views/components/editable/EditableTitle";
import styles from "./EditCourseBackground.module.css";
import EditCourseBackgroundController from "@/controllers/components/editCourse/EditCourseBackgroundController"
import EditableImage from "@/views/components/editable/EditableImage";
import EditCourse from "@/views/dynamics/dashboard/EditCourse";
import UploadSvg from "@/views/svgs/Upload";

/**
* Props of EditCourseBackground Component
* @typedef Props
* @property {string} className
* @property {React.CSSProperties} style
* @property {EditCourse} parent
* 
* @extends {Component<Props>}
*/
export default class EditCourseBackground extends Component {
    
    constructor(props){
        super(props);
        this.controller = new EditCourseBackgroundController(this);
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

        this.controller.onSubmit(this.EditableImage.state.image_file);
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
                title={"عکس پس زمینه دوره"}
                editIcon={UploadSvg}
                status={st.cover}
                onEdit={this.onEdit}
                onSubmit={this.onSubmit}
                onCancel={this.onCancel}/>

                <ul className={styles.info_sec}>

                    <li className={"engNum"}>{"اندازه پیشنهادی برای عکس پس زمینه دوره 1600x720 پیکسل است."}</li>

                    <li className={"engNum"}>{"حداکثر سایز عکس 2MB است."}</li>

                </ul>

                <EditableImage
                ref={r=>this.EditableImage=r}
                onSelect={this.onSelect}
                className={styles.image}
                defaultSrc={"/statics/default_img/default_cover.png"}
                uploadKey={nw.cover}
                oldUploadKey={od.cover}/>
                
            </div>
        )
    }
}