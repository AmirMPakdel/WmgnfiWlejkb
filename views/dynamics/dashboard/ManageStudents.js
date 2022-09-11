import React, { Component } from "react";
import styles from "./ManageStudents.module.css";

/**
* Props of ManageStudents Component
* @typedef Props
* @property {string} className
* @property {React.CSSProperties} style
* 
* @extends {Component<Props>}
*/
export default class ManageStudents extends Component {
    
    constructor(props){
        super(props);
        this.controller = new ManageStudentsController(this);
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