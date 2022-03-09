import React, { Component } from "react";
import styles from "./EditIntroElementModal.module.css";

/**
* Props of EditIntroElementModal Component
* @typedef Props
* @property {string} className
* @property {React.CSSProperties} style
* 
* @extends {Component<Props>}
*/
export default class EditIntroElementModal extends Component {
    
    constructor(props){
        super(props);
        this.controller = new EditIntroElementModalController(this);
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