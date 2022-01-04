import React, { Component } from "react";
import styles from "./EditCourseHoldingStatus.module.css";
import EditCourseHoldingStatusController from "@/controllers/components/editCourse/EditCourseHoldingStatusController";
import EditableTitle from "@/views/components/editable/EditableTitle";
import SelectSearch from "@/views/components/global/SelectSearch";
import EditCourse from "@/views/dynamics/dashboard/EditCourse";

/**
* Props of EditCourseHoldingStatus Component
* @typedef Props
* @property {string} className
* @property {React.CSSProperties} style
* @property {EditCourse} parent
* 
* @extends {Component<Props>}
*/
export default class EditCourseHoldingStatus extends Component {
    
    constructor(props){
        super(props);
        this.controller = new EditCourseHoldingStatusController(this);
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
                title={"وضعیت انتشار دوره"}
                status={st.holding_status}
                onEdit={this.onEdit}
                onSubmit={this.onSubmit}
                onCancel={this.onCancel}/>

                <SelectSearch className={styles.select_con}
                options={HoldingStatus}
                disabled={st.holding_status != "edit"}
                placeholder={"انتخاب وضعیت انتشار"}
                value={nw.holding_status}
                onChange={this.onChange}/>

            </div>
        )
    }
}

const HoldingStatus = [
    {
        title:"به زودی",
        id: "coming_soon"
    },
    {
        title:"در حال انتشار",
        id: "is_holding"
    },
    {
        title:"اتمام دوره",
        id: "finished"
    },
]