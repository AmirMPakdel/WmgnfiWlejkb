import MyRecieptsController from "@/controllers/dynamics/stdPanel/MyRecieptsController";
import React, { Component } from "react";
import styles from "./MyReciepts.module.css";

/**
* Props of MyReciepts Component
* @typedef Props
* @property {string} className
* @property {React.CSSProperties} style
* 
* @extends {Component<Props>}
*/
export default class MyReciepts extends Component {
    
    constructor(props){
        super(props);
        this.controller = new MyRecieptsController(this);
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