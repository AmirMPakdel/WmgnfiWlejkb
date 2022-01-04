import React, { Component } from "react";
import styles from "./EditCourseReleaseDate.module.css";
import EditCourseReleaseDateController from "@/controllers/components/editCourse/EditCourseReleaseDateController";
import EditableTitle from "@/views/components/editable/EditableTitle";

/**
* Props of EditCourseReleaseDate Component
* @typedef Props
* @property {string} className
* @property {React.CSSProperties} style
* 
* @extends {Component<Props>}
*/
export default class EditCourseReleaseDate extends Component {
    
    constructor(props){
        super(props);
        this.controller = new EditCourseReleaseDateController(this);
        this.state = {
        
        }
    }
    
    componentDidMount(){
    }
    
    onEdit=()=>{
        this.controller.onEdit()
    }

    onSubmit=()=>{        
        this.controller.onSubmit();
    }

    onCancel=()=>{
        this.controller.onCancel();
    }
    
    onChange=(t)=>{
        this.controller.onChange(t);
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
                title={"تاریخ انتشار دوره"}
                status={st.duration}
                onEdit={this.onEdit}
                onSubmit={this.onSubmit}
                onCancel={this.onCancel}/>

            </div>
        )
    }
}