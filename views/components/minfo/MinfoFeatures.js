import React, { Component } from "react";
import styles from "./MinfoFeatures.module.css";
import MinfoSectionHeader from "./MinfoSectionHeader";

/**
* Props of MinfoFeatures Component
* @typedef Props
* @property {string} className
* @property {React.CSSProperties} style
* 
* @extends {Component<Props>}
*/
export default class MinfoFeatures extends Component {
    
    constructor(props){
        super(props);
        //this.controller = new MinfoFeaturesController(this);
        this.state = {
        
        }
    }
    
    componentDidMount(){
    }
    
    render(){
        return(
            <div className={styles.con}>

                <MinfoSectionHeader title="ویژگی ها"/>
                
            </div>
        )
    }
}