import MyCoursesController from "@/controllers/dynamics/stdPanel/MyCoursesController";
import React, { Component } from "react";
import styles from "./MyCourses.module.css";

/**
* Props of MyCourses Component
* @typedef Props
* @property {string} className
* @property {React.CSSProperties} style
* 
* @extends {Component<Props>}
*/
export default class MyCourses extends Component {
    
    constructor(props){
        super(props);
        this.controller = new MyCoursesController(this);
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