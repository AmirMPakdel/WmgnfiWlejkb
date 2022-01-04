import React, { Component } from "react";
import styles from "./EditCourseLongDesc.module.css";
import EditCourseLongDescController from "@/controllers/components/editCourse/EditCourseLongDescController";
import EditableTitle from "@/views/components/editable/EditableTitle";
import EditableTextArea from "@/views/components/editable/EditableTextArea";

/**
* Props of EditCourseLongDesc Component
* @typedef Props
* @property {string} className
* @property {React.CSSProperties} style
* 
* @extends {Component<Props>}
*/
export default class EditCourseLongDesc extends Component {
    
    constructor(props){
        super(props);
        this.controller = new EditCourseLongDescController(this);
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
                title={"توضیحات کامل دوره"}
                status={st.long_desc}
                onEdit={this.onEdit}
                onSubmit={this.onSubmit}
                onCancel={this.onCancel}/>

                <EditableTextArea
                className={styles.edit_text}
                ref={r=>this.EditableText=r}
                maxLength={2000}
                placeholder="توضیحات کامل دوره"
                value={nw.long_desc}
                oldValue={od.long_desc}
                onChange={this.onChange}/>

            </div>
        )
    }
}