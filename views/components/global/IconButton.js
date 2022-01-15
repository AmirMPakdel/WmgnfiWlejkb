import React, { Component } from "react";
import styles from "./IconButton.module.css";

/**
* Props of IconButton Component
* @typedef Props
* @property {string} className
* @property {React.CSSProperties} style
* @property {string} title
* @property {boolean} disabled
* @property {boolean} borderMode
* @property {(event:Event)=>{}} onClick
* 
* @extends {Component<Props>}
*/
export default class IconButton extends Component {
    
    render(){

        let p = this.props;
        let add_class = "";

        if(p.borderMode){

            add_class+= styles.border_mode+" flc1 ";

        }else{

            add_class += "bgtc1 fdc1 ";
        }

        if(p.disabled){

            add_class += "bgdc2 ";
        }

        return(
            <div className={styles.con+" bdyt "+add_class+" amp_btn "+this.props.className} style={this.props.style}
            onClick={this.props.onClick}>

                <img className={styles.icon} src={this.props.icon}/>

                {
                    this.props.title?
                    <div className={styles.title} >{this.props.title}</div>:null
                }
                
            </div>
        )
    }
}