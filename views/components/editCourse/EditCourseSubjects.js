import React, { Component } from "react";
import styles from "./EditCourseSubjects.module.css";
import EditCourseSubjectsController from "@/controllers/components/editCourse/EditCourseSubjectsController";
import EditableTitle from "@/views/components/editable/EditableTitle";
import MainButton from "@/views/components/global/MainButton";
import Nestable from "react-nestable";
import EditCourse from "@/views/dynamics/dashboard/EditCourse";
import TextInput from "@/views/components/global/TextInput";

/**
* Props of EditCourseSubjects Component
* @typedef Props
* @property {string} className
* @property {React.CSSProperties} style
* @property {EditCourse} parent 
* 
* @extends {Component<Props>}
*/
export default class EditCourseSubjects extends Component {
    
    constructor(props){
        super(props);
        this.controller = new EditCourseSubjectsController(this);
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
        nw.subjects[item.index] = text
        p.setState({new_values: nw});
    }

    onNesableChange=({items, dragItem, targetPath})=>{

        let p = this.props.parent;
        let ps = p.state;
        let nw = ps.new_values;
        let subjects = items.map(i=>i.text);
        nw.subjects = subjects;
        p.setState({new_values: nw});
    }

    deleteNestableRow=(item)=>{

        let p = this.props.parent;
        let ps = p.state;
        let nw = ps.new_values;
        nw.subjects.splice(item.index, 1);
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
                title={"مواردی که در این دوره آموزش داده خواهد شد"}
                status={st.subjects}
                onEdit={this.onEdit}
                onSubmit={this.onSubmit}
                onCancel={this.onCancel}/>
                
                {
                    st.subjects === "edit"?
                    <Nestable className={styles.nestable}
                    ref={r=>this.Nestable=r}
                    items={apiSubjects2NestableItem(nw.subjects)}
                    renderItem={this.renderNestableItem}
                    onChange={this.onNesableChange}
                    handler={<div className={styles.nestable_handler+" bgtc2"}/>}/>
                    :
                    <div className={styles.nestable}>
                    {
                        nw.subjects.map((v,i)=>(
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
                    st.subjects === "edit" && nw.subjects.length < env.LIMITS.MAX_COURSE_SUBJECTS?
                    <MainButton className={styles.add_sub_btn}
                    onClick={this.onAddSubject}
                    title={"ایجاد مورد جدید"}/>:null
                }

            </div>
        )
    }
}

function apiSubjects2NestableItem(sub) {

    if(!sub){
        return [];
    }

    let items = [];

    sub.forEach((e, i) => {
        items.push({id:i+1, text:e});
    });

    return items
}