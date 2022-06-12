import EditCourseDiscountPriceController from "@/controllers/components/editCourse/EditCourseDiscountPriceController";
import { InputFilter } from "@/utils/validation";
import React, { Component } from "react";
import EditableTitle from "../editable/EditableTitle";
import EditableText from "@/views/components/editable/EditableText";
import styles from "./EditCourseDiscountPrice.module.css";

/**
* Props of EditCourseDiscountPrice Component
* @typedef Props
* @property {string} className
* @property {React.CSSProperties} style
* 
* @extends {Component<Props>}
*/
export default class EditCourseDiscountPrice extends Component {
    
    constructor(props){
        super(props);
        this.controller = new EditCourseDiscountPriceController(this);
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
                title={"قیمت دوره با تخفیف"}
                status={st.discount_price}
                onEdit={this.onEdit}
                onSubmit={this.onSubmit}
                onCancel={this.onCancel}/>

                <ul className={styles.info_sec}>

                    <li>{"برای اعمال تخفیف روی دوره مبلغ موردنظرتان را با احتساب تخفیف در این اینجا وارد نمایید."}</li>
                    
                    <li>{"برای حذف تخفیف ، مقدار صفر وارد نمایید."}</li>

                </ul>

                <EditableText
                className={styles.edit_text}
                inpuClassName={styles.edit_text_input}
                ref={r=>this.EditableText=r}
                maxLength={12}
                value={nw.discount_price}
                oldValue={od.discount_price}
                inputFilter={InputFilter.integer}
                onChange={this.onChange}/>

            </div>
        )
    }
}