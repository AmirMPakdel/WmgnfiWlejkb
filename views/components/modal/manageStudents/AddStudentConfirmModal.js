import React, { Component } from "react";
import styles from "./AddStudentConfirmModal.module.css";

/**
* Props of AddStudentConfirmModal Component
* @typedef Props
* @property {string} className
* @property {React.CSSProperties} style
* 
* @extends {Component<Props>}
*/
export default class AddStudentConfirmModal extends Component {
    
    constructor(props){
        super(props);
        this.controller = new AddStudentConfirmController(this);
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