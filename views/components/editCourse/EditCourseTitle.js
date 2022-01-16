import React, { Component } from "react";
import EditCourseTitleController from "@/controllers/components/editCourse/EditCourseTitleController";
import EditableText from "@/views/components/editable/EditableText";
import EditableTitle from "@/views/components/editable/EditableTitle";
import styles from "./EditCourseTitle.module.css";
import EditCourse from "@/views/dynamics/dashboard/EditCourse";

/**
* Props of EditCourseTitle Component
* @typedef Props
* @property {string} className
* @property {React.CSSProperties} style
* @property {EditCourse} parent
* 
* @extends {Component<Props>}
*/
export default class EditCourseTitle extends Component {
    
    constructor(props){
        super(props);
        this.controller = new EditCourseTitleController(this);
        this.state = {
            submint_disabled:false
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
                title={"عنوان دوره"}
                status={st.title}
                onEdit={this.onEdit}
                onSubmit={this.onSubmit}
                onCancel={this.onCancel}
                submintDisabled={this.state.submint_disabled}/>

                <EditableText
                className={styles.edit_text}
                ref={r=>this.EditableText=r}
                maxLength={64}
                value={nw.title}
                oldValue={od.title}
                onChange={this.onChange}/>

            </div>
        )
    }
}