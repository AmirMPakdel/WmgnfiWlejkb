import React, { Component } from "react";
import styles from "./MinfoSectionHeader.module.css";

/**
* Props of MinfoSectionHeader Component
* @typedef Props
* @property {string} className
* @property {React.CSSProperties} style
* 
* @extends {Component<Props>}
*/
export default class MinfoSectionHeader extends Component {
    
    constructor(props){
        super(props);
        //this.controller = new MinfoSectionHeaderController(this);
        this.state = {
        
        }
    }
    
    componentDidMount(){
    }
    
    render(){
        return(
            <div className={styles.con}>

                <img className={styles.right_img} src={"/statics/svg/minfo-title-right-wing.svg"}/>

                <div className={styles.title}>{this.props.title}</div>

                <img className={styles.left_img} src={"/statics/svg/minfo-title-left-wing.svg"}/>
                
            </div>
        )
    }
}