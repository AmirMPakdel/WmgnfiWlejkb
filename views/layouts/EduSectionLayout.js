import React, { Component } from "react";
import Header from "@/views/components/eduSection/Header";
import styles from "./EduSectionLayout.module.css";

export default class EduSectionLayout extends Component {
    
    render(){
        return(
            <div className={styles.con}>

                <Header/>

                {this.props.children}
                
            </div>
        )
    }
}