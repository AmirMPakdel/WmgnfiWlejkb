import React, { Component } from "react";
import styles from "./ListRow.module.css";

/**
* Props of ListRow Component
* @typedef Props
* @property {string} className
* @property {React.CSSProperties} style
* @property {string} title
* @property {string} value
* 
* @extends {Component<Props>}
*/
export default class ListRow extends Component {
    
    constructor(props){
        super(props);
        this.state = {
        
        }
    }
    
    componentDidMount(){
    }
    
    render(){

        let vertical = this.props.vertical;
        let addConClass = "";
        let addTitleClass = "";
        let addValueClass = "";

        if(vertical){
            addConClass += styles.vertical_con+" ";
            addTitleClass += styles.vertical_title+" blc2 ";
            addValueClass += styles.vertical_value+" ";
        }

        return(
            <div className={styles.con+" "+addConClass+" blc2 fdc1 bdyt"}>

                <div className={styles.title+" "+addTitleClass+" "+this.props.titleClassName}>{this.props.title}</div>

                <div className={styles.value+" "+addValueClass+" "+this.props.valueClassName}>{this.props.value}</div>
                
            </div>
        )
    }
}