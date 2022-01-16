import React, { Component } from "react";
import styles from "./EditCourseShortDesc.module.css";
import EditCourseShortDescController from "@/controllers/components/editCourse/EditCourseShortDescController";
import EditableTitle from "@/views/components/editable/EditableTitle";
import EditableTextArea from "@/views/components/editable/EditableTextArea";
import EditCourse from "@/views/dynamics/dashboard/EditCourse";

/**
* Props of EditCourseShortDesc Component
* @typedef Props
* @property {string} className
* @property {React.CSSProperties} style
* @property {EditCourse} parent
* 
* @extends {Component<Props>}
*/
export default class EditCourseShortDesc extends Component {
    
    constructor(props){
        super(props);
        this.controller = new EditCourseShortDescController(this);
        this.state = {
            submint_disabled:false,
        }
    }
    
    componentDidMount(){
        this.onChange(this.EditableText.input.value);
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
                title={"معرفی دوره"}
                status={st.short_desc}
                onEdit={this.onEdit}
                onSubmit={this.onSubmit}
                onCancel={this.onCancel}
                submintDisabled={this.state.submint_disabled}/>

                <EditableTextArea
                className={styles.edit_text}
                ref={r=>this.EditableText=r}
                maxLength={250}
                placeholder="معرفی دوره"
                value={nw.short_desc}
                oldValue={od.short_desc}
                onChange={this.onChange}/>

            </div>
        )
    }
}