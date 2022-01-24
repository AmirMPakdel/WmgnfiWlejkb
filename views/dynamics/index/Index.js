import IndexLayout from "@/views/layouts/IndexLayout";
import React, { Component } from "react";
import styles from "./Index.module.css";

/**
* Props of Index Component
* @typedef Props
* @property {string} className
* @property {React.CSSProperties} style
* 
* @extends {Component<Props>}
*/
export default class Index extends Component {
    
    constructor(props){
        super(props);
        //this.controller = new IndexController(this);
        this.state = {
        
        }
    }
    
    componentDidMount(){
    }
    
    render(){
        return(
            <IndexLayout>
                

            </IndexLayout>
        )
    }
}