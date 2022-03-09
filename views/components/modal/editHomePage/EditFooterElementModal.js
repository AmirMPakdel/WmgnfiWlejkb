import EditFooterElementController from "@/controllers/components/modals/editHomePage/EditFooterElementController";
import React, { Component } from "react";
import styles from "./EditFooterElementModal.module.css";

/**
* Props of EditFooterElementModal Component
* @typedef Props
* @property {string} className
* @property {React.CSSProperties} style
* 
* @extends {Component<Props>}
*/
export default class EditFooterElementModal extends Component {
    
    constructor(props){
        super(props);
        this.controller = new EditFooterElementController(this);
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