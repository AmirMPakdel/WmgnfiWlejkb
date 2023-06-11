import React, { Component } from "react";
import styles from "./EditCourseSubjects.module.css";
import EditCourseSubjectsController from "@/controllers/components/editCourse/EditCourseSubjectsController";
import EditableTitle from "@/views/components/editable/EditableTitle";
import MainButton from "@/views/components/global/MainButton";
import EditCourse from "@/views/dynamics/dashboard/EditCourse";
import TextInput from "@/views/components/global/TextInput";
import { Container, Draggable } from "react-smooth-dnd";
import VeggieBurgerSvg from "@/views/svgs/VeggieBurger";
import DeleteSvg from "@/views/svgs/Delete";
import TextArea from "../global/TextArea";

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

    onInputChange=(text, index)=>{

        let p = this.props.parent;
        let ps = p.state;
        let nw = ps.new_values;
        nw.subjects[index] = text
        p.setState({new_values: nw});
    }

    onDelete=(item)=>{
        let p = this.props.parent;
        let ps = p.state;
        let nw = ps.new_values;
        nw.subjects.splice(item.index, 1);
        p.setState({new_values: nw});
    }

    getCardPayload=(index)=>{
        let p = this.props.parent;
        let ps = p.state;
        let nw = ps.new_values;
        return nw.subjects[index];
    }

    onCardDrop=(dropResult)=>{

        let p = this.props.parent;
        let ps = p.state;
        let nw = ps.new_values;

        if (dropResult.removedIndex !== null || dropResult.addedIndex !== null) {

            let new_arr = Object.assign([], nw.subjects);
            new_arr = applyDrag(new_arr, dropResult);
    
            ps.new_values.subjects = new_arr;
            p.setState(ps);
        }
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

                <Container
                    dragHandleSelector={st.subjects == "edit"?undefined:"null"}
                    groupName="subject_group"
                    onDrop={e => this.onCardDrop(e)}
                    getChildPayload={index =>this.getCardPayload(index)}
                    dropPlaceholder={{                      
                        animationDuration: 150,
                        showOnTop: true,
                        className: styles.content_card_preview+" tbc2 tbgc1"
                    }}>
                    {
                    nw.subjects.map((v, i)=>(
                        <Draggable key={i}>
                            {
                                st.subjects == "edit"?
                                <>
                                <div className={styles.input_con} key={i}>

                                    <VeggieBurgerSvg className={styles.drag_handler+" tc2"}
                                    stroke={env.THEME.tc2}/>

                                    <TextInput className={styles.input+" bgwc"}
                                    value={v}
                                    onChange={(t)=>this.onInputChange(t, i)}/>

                                    <DeleteSvg className={styles.delete_btn+" tbgcerr amp_btn"}
                                    onClick={()=>this.onDelete(v)}/>

                                </div>
                                </>
                                :
                                <div className={styles.input_con}>

                                    <TextInput className={styles.input_show}
                                    value={v}
                                    disabled={true}/>

                                </div>
                            }
                        </Draggable>
                    ))
                    }
                </Container>

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

const applyDrag = (arr, dragResult) => {
    const { removedIndex, addedIndex, payload } = dragResult;
    if (removedIndex === null && addedIndex === null) return arr;
  
    const result = [...arr];
    let itemToAdd = payload;
  
    if (removedIndex !== null) {
      itemToAdd = result.splice(removedIndex, 1)[0];
    }
  
    if (addedIndex !== null) {
      result.splice(addedIndex, 0, itemToAdd);
    }
  
    return result;
};