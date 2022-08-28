import React, { Component } from "react";
import styles from "./ViewHelp.module.css";

/**
* Props of ViewHelp Component
* @typedef Props
* @property {string} className
* @property {React.CSSProperties} style
* 
* @extends {Component<Props>}
*/
export default class ViewHelp extends Component {
    
    constructor(props){
        super(props);
        //this.controller = new ViewHelpController(this);
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