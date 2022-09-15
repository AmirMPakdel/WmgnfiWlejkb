import React, { Component } from "react";
import styles from "./SelectStudentsModal.module.css";

/**
* Props of SelectStudentsModal Component
* @typedef Props
* @property {string} className
* @property {React.CSSProperties} style
* 
* @extends {Component<Props>}
*/
export default class SelectStudentsModal extends Component {
    
    constructor(props){
        super(props);
        this.controller = new SelectStudentsController(this);
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