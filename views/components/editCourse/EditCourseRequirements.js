import React, { Component } from "react";
import styles from "./EditCourseRequirements.module.css";
import EditCourseRequirementsController from "@/controllers/components/editCourse/EditCourseRequirementsController";
import EditableTitle from "@/views/components/editable/EditableTitle";
import TextInput from "@/views/components/global/TextInput";
import Nestable from "react-nestable";
import MainButton from "@/views/components/global/MainButton";

/**
* Props of EditCourseRequirements Component
* @typedef Props
* @property {string} className
* @property {React.CSSProperties} style
* 
* @extends {Component<Props>}
*/
export default class EditCourseRequirements extends Component {
    
    constructor(props){
        super(props);
        this.controller = new EditCourseRequirementsController(this);
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

    onAddSubject=()=>{
        this.controller.onAddSubject();
    }

    renderNestableItem=(item)=>{

        return (
            <div className={styles.nestable_card}>

                {item.handler}

                <TextInput className={styles.nestable_inputs}
                value={item.item.text}
                onChange={(t)=>this.onNestableInputChange(t, item)}/>

                <div className={styles.nestable_row_delete+" bgec amp_btn"}
                onClick={()=>this.deleteNestableRow(item)}/>

            </div>
        )
    }

    onNestableInputChange=(text, item)=>{

        let p = this.props.parent;
        let ps = p.state;
        let nw = ps.new_values;
        nw.requirements[item.index] = text
        p.setState({new_values: nw});
    }

    onNesableChange=({items, dragItem, targetPath})=>{

        let p = this.props.parent;
        let ps = p.state;
        let nw = ps.new_values;
        let requirements = items.map(i=>i.text);
        nw.requirements = requirements;
        p.setState({new_values: nw});
    }

    deleteNestableRow=(item)=>{

        let p = this.props.parent;
        let ps = p.state;
        let nw = ps.new_values;
        nw.requirements.splice(item.index, 1);
        p.setState({new_values: nw});
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
                title={"پیش نیاز های دوره"}
                status={st.requirements}
                onEdit={this.onEdit}
                onSubmit={this.onSubmit}
                onCancel={this.onCancel}/>
                
                {
                    st.requirements === "edit"?
                    <Nestable className={styles.nestable}
                    ref={r=>this.Nestable=r}
                    items={apiRequirements2NestableItem(nw.requirements)}
                    renderItem={this.renderNestableItem}
                    onChange={this.onNesableChange}
                    handler={<div className={styles.nestable_handler+" bgtc2"}/>}/>
                    :
                    <div className={styles.nestable}>
                    {
                        nw.requirements.map((v,i)=>(
                            <div className={styles.nestable_card} key={i}>
                                <TextInput className={styles.nestable_inputs}
                                value={v}
                                disabled={true}
                                onChange={t=>t}/>
                            </div>
                        ))
                    }
                    </div>
                }

                {
                    st.requirements === "edit" && nw.requirements.length < env.LIMITS.MAX_COURSE_REQUIREMENTS?
                    <MainButton className={styles.add_req_btn}
                    onClick={this.onAddSubject}
                    title={"ایجاد پیش نیاز جدید"}/>:null
                }

            </div>
        )
    }
}

function apiRequirements2NestableItem(sub) {

    if(!sub){
        return [];
    }

    let items = [];

    sub.forEach((e, i) => {
        items.push({id:i+1, text:e});
    });

    return items
}