import React, { Component } from "react";
import EditableTitle from "@/views/components/editable/EditableTitle";
import styles from "./EditCourseBackground.module.css";
import EditCourseBackgroundController from "@/controllers/components/editCourse/EditCourseBackgroundController"
import EditableImage from "@/views/components/editable/EditableImage";
import EditCourse from "@/views/dynamics/dashboard/EditCourse";

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
                status={st.cover}
                onEdit={this.onEdit}
                onSubmit={this.onSubmit}
                onCancel={this.onCancel}/>

                <EditableImage
                ref={r=>this.EditableImage=r}
                onSelect={this.onSelect}
                className={styles.image}
                defaultSrc={"/default_img/default_cover.png"}
                uploadKey={nw.cover}
                oldUploadKey={od.cover}/>
                
            </div>
        )
    }
}