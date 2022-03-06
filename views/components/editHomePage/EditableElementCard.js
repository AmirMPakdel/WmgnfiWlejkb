import EditableElementCardController from "@/controllers/components/editHomePage/EditableElementCardController";
import HomePage from "@/views/dynamics/dashboard/HomePage";
import Delete from "@/views/svgs/Delete";
import Setting from "@/views/svgs/Setting";
import VeggieBurger from "@/views/svgs/VeggieBurger";
import React, { Component } from "react";
import IconButton from "../global/IconButton";
import styles from "./EditableElementCard.module.css";

/**
* Props of EditableElementCard Component
* @typedef Props
* @property {string} className
* @property {React.CSSProperties} styles
* @property {HomePage} parent
* 
* @extends {Component<Props>}
*/
export default class EditableElementCard extends Component {
    
    constructor(props){
        super(props);
        this.controller = new EditableElementCardController(this);
        this.state = {
        
        }
    }
    
    componentDidMount(){
    }

    onDelete=()=>{
        this.controller.onDelete();
    }

    onToggleVisibility=()=>{
        this.controller.onToggleVisibility();
    }
    
    render(){
        let d = this.props.data;

        let control_sec = styles.control_sec;
        if(d.type==1 || d.type==2){
            control_sec = styles.control_sec2;
        }

        return(
            <div className={styles.con+" bgw md_card_shd"}>

                <div className={styles.visible_sec}>

                {
                    d.visible?
                    <img className={styles.visiblity+((d.type==1 || d.type==2)?"":" amp_btn")} 
                    src={"/statics/svg2/visible_icon.svg"} onClick={this.onToggleVisibility}/>
                    :
                    <img className={styles.visiblity+" amp_btn"} 
                    src={"/statics/svg2/visible_not_icon.svg"} onClick={this.onToggleVisibility}/>
                }

                </div>

                <div className={styles.wrapper1}>

                    <div className={styles.name_sec+" tilt bgtc1"}>
                        {
                            type2Name(d.type)
                        }
                    </div>

                    <div className={styles.title_sec+" bdyt"}>
                        {
                            d.title
                        }
                    </div>

                </div>

                <div className={control_sec+" bgtc1"}>

                    <img className={styles.edit_icon+" amp_btn"} 
                    src={"/statics/svg2/edit.svg"}
                    onClick={this.onEdit}/>

                    {
                        (d.type==1 || d.type==2)?
                        null:
                        <img className={styles.delete_icon+" amp_btn"} 
                        src={"/statics/svg2/delete.svg"}
                        onClick={this.onDelete}/>
                    }

                </div>
                
            </div>
        )
    }
}

function type2Name(type){

    let text = "";
    type = type.toString();
    switch(type){

        case "1":
            text="شروع سایت";
            break;
        
        case "2":
            text="فوتر";
            break;
        
        case "3":
            text="لیست دوره ها";
            break;

        case "4":
            text="جعبه اطلاعاتی";
            break;
    }

    return text
}