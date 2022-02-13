import ViewRecieptController from "@/controllers/dynamics/stdPanel/ViewRecieptController";
import React, { Component } from "react";
import styles from "./ViewReciept.module.css";

/**
* Props of ViewReciept Component
* @typedef Props
* @property {string} className
* @property {React.CSSProperties} style
* 
* @extends {Component<Props>}
*/
export default class ViewReciept extends Component {
    
    constructor(props){
        super(props);
        this.controller = new ViewRecieptController(this);
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