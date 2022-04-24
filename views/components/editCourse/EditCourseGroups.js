import React, { Component } from "react";
import styles from "./EditCourseGroups.module.css";
import EditCourseGroupsController from "@/controllers/components/editCourse/EditCourseGroupsController";
import EditableTitle from "@/views/components/editable/EditableTitle";
import EditCourse from "@/views/dynamics/dashboard/EditCourse";
import Loading from "../global/Loading";

/**
* Props of EditCourseGroups Component
* @typedef Props
* @property {string} className
* @property {React.CSSProperties} style
* @property {EditCourse} parent
* 
* @extends {Component<Props>}
*/
export default class EditCourseGroups extends Component {
    
    constructor(props){
        super(props);
        this.controller = new EditCourseGroupsController(this);
        this.state = {
            loading: true,
            selected: null,
            old_titles: null,
            new_titles: null,
        }
    }
    
    componentDidMount(){
        this.controller.loadTitles();
    }
    
    onEdit=()=>{
        this.controller.onEdit();
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

                {
                    this.state.loading?
                    <Loading style={{minHeight:"8rem", width:"16rem"}}/>:
                    <>
                    <EditableTitle
                    title={"دسته بندی این دوره"}
                    status={st.groups}
                    onEdit={this.onEdit}
                    onSubmit={this.onSubmit}
                    onCancel={this.onCancel}/>
                    
                    {
                        this.state.new_titles?
                        <div className={styles.group_sec}>
                            {
                                this.state.new_titles.map((v,i,a)=>(
                                    <>
                                        <span key={i+"-1"}>{v}</span>
                                        {
                                            i!=(a.length-1)?
                                            <span key={i+"-2"}>{" > "}</span>:null
                                        }
                                    </>
                                ))
                            }
                        </div>
                        :null
                    }
                    </>
                }

            </div>
        )
    }
}