import AddEditCourseListElementController from "@/controllers/components/modals/editHomePage/AddEditCourseListElementController";
import React, { Component } from "react";
import styles from "./AddEditCourseListElementModal.module.css";

/**
* Props of AddEditCourseListElementModal Component
* @typedef Props
* @property {string} className
* @property {React.CSSProperties} style
* 
* @extends {Component<Props>}
*/
export default class AddEditCourseListElementModal extends Component {
    
    constructor(props){
        super(props);
        this.controller = new AddEditCourseListElementController(this);
        this.state = {
        
        }
    }
    
    componentDidMount(){
    }
    
    render(){
        return(
            <div>
                
            </div>
        )
    }
}