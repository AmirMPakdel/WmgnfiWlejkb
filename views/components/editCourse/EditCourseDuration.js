import React, { Component } from "react";
import styles from "./EditCourseDuration.module.css";
import EditCourseDurationController from "@/controllers/components/editCourse/EditCourseDurationController";
import EditableTitle from "@/views/components/editable/EditableTitle";
import EditableText from "@/views/components/editable/EditableText";
import EditCourse from "@/views/dynamics/dashboard/EditCourse";

/**
* Props of EditCourseDuration Component
* @typedef Props
* @property {string} className
* @property {React.CSSProperties} style
* @property {EditCourse} parent
* 
* @extends {Component<Props>}
*/
export default class EditCourseDuration extends Component {
    
    constructor(props){
        super(props);
        this.controller = new EditCourseDurationController(this);
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
                title={"مدت زمان آموزش"}
                status={st.duration}
                onEdit={this.onEdit}
                onSubmit={this.onSubmit}
                onCancel={this.onCancel}/>

                <EditableText
                className={styles.edit_text}
                ref={r=>this.EditableText=r}
                maxLength={4}
                value={nw.duration}
                oldValue={od.duration}
                onChange={this.onChange}/>

            </div>
        )
    }
}