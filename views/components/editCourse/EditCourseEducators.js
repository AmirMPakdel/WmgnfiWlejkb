import React, { Component } from "react";
import EditCourseEducatorsController from "@/controllers/components/editCourse/EditCourseEducatorsController";
import EditableTitle from "@/views/components/editable/EditableTitle";
import SelectBox from "@/views/components/global/SelectBox";
import styles from "./EditCourseEducators.module.css";
import EditCourse from "@/views/dynamics/dashboard/EditCourse";

/**
* Props of EditCourseEducators Component
* @typedef Props
* @property {string} className
* @property {React.CSSProperties} style
* @property {EditCourse} parent
* 
* @extends {Component<Props>}
*/
export default class EditCourseEducators extends Component {
    
    constructor(props){
        super(props);
        this.controller = new EditCourseEducatorsController(this);
        this.state = {
            selected_edu_keys : this.controller.apiEducators2IdArray(props.parent.state.new_values.educators),
            selected_edus: props.parent.state.new_values.educators,
            educators: props.parent.state.new_values.educators,
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
    
    onAddEducator=()=>{
        this.controller.onAddEducator();
    }

    onRemoveEducator=(obj)=>{
        this.controller.onRemoveEducator(obj);
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
                title={"دبیر (یا دبیران) دوره"}
                status={st.educators}
                onEdit={this.onEdit}
                onSubmit={this.onSubmit}
                onCancel={this.onCancel}/>

                <SelectBox className={styles.select_box}
                data={this.controller.apiEducators2SelectBoxData(nw.educators)}
                editable={st.educators==="edit"?true:false}
                emptyText={"دبیری انتخاب نشده است"}
                onAdd={this.onAddEducator}
                onRemove={this.onRemoveEducator}/>

            </div>
        )
    }
}
