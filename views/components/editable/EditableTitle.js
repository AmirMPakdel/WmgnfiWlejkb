import React, { Component } from "react";
import IconButton from "@/views/components/global/IconButton";
import Loading from "@/views/components/global/Loading";
import styles from "./EditableTitle.module.css";
import EditSqrSvg from "@/views/svgs/EditSqr";
import CrossSvg from "@/views/svgs/Cross";
import TickSqrSvg from "@/views/svgs/TickSqr";

/**
* Props of EditableTitle Component
* @typedef Props
* @property {string} className
* @property {React.CSSProperties} style
* @property {string} title
* @property {class} editIcon
* @property {"idle"|"edit"|"loading"} status
* @property {()=>{}} onEdit
* @property {()=>{}} onSubmit
* @property {()=>{}} onCancel
* @property {boolean} submintDisabled
* 
* @extends {Component<Props>}
*/
export default class EditableTitle extends Component {

    onEdit=()=>{
        this.props.onEdit();
    }

    onSubmit=()=>{
        this.props.onSubmit();
    }

    onCancel=()=>{
        this.props.onCancel();
    }
    
    render(){

        let add_class = "";

        if(this.props.className){
            add_class += this.props.className+" ";
        }

        return(
            <div className={styles.con+" "+add_class} style={this.props.style}>

                <div className={styles.title_con}>

                    <div className={styles.title+" bgw tilt md_card_shd"}>
                        {this.props.title}
                    </div>

                </div>                
                
                <div className={styles.wrapper}>

                    {
                        this.props.children
                    }

                    {
                        this.props.status==="idle"?
                        <IconButton className={styles.edit+" bgtc1 "}
                        icon={this.props.editIcon || EditSqrSvg}
                        onClick={this.onEdit}/>
                        :null
                    }
                    {
                        this.props.status==="loading"?
                        <Loading className={styles.loading} scale={0.5}/>:null
                    }
                    {
                        this.props.status==="edit"?
                        <>
                        {
                            this.props.submintDisabled?
                            <IconButton className={styles.edit}
                            icon={TickSqrSvg}
                            iconClassName={styles.submit_icon}
                            disabled={true}/>
                            :
                            <IconButton className={styles.edit+" bgsc "}
                            icon={TickSqrSvg}
                            iconClassName={styles.submit_icon}
                            onClick={this.onSubmit}/>
                        }
                        

                        <IconButton className={styles.edit+" bgec "}
                        icon={CrossSvg}
                        iconClassName={styles.cancel_icon}
                        iconProps={{stroke:env.THEME.dc1}}
                        onClick={this.onCancel}/>
                        </>:null
                    }

                </div>
                
            </div>
        )
    }
}