import React, { Component } from "react";
import styles from "./IconLine.module.css";

export default class IconLine extends Component {
    
    render(){

        let add_class = "";
        let icon_class = "";
        let text_class = "";

        if(this.props.className){
            add_class += this.props.className+" ";
        }

        if(this.props.icon_className){
            icon_class += this.props.icon_className+" ";
        }

        if(this.props.text_className){
            text_class += this.props.text_className+" ";
        }

        return(
            <div className={styles.iclne+" bdyt "+add_class}>

                <img className={styles.iclne_img+" "+icon_class} src={this.props.icon}/>

                <div className={styles.iclne_txt+" "+text_class}>{this.props.text}</div>
                
            </div>
        )
    }
}