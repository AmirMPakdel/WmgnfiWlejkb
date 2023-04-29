import React, { Component } from "react";
import styles from "./Minfo.module.css";
import MinfoHeader from "@/views/components/minfo/MinfoHeader";
import MinfoHero from "@/views/components/minfo/MinfoHero";
import MinfoFeatures from "@/views/components/minfo/MinfoFeatures";

/**
* Props of Minfo Component
* @typedef Props
* @property {string} className
* @property {React.CSSProperties} style
* 
* @extends {Component<Props>}
*/
export default class Minfo extends Component {

    constructor(props){
        super(props);
        
    }
    
    render(){
        return(
            <div className={styles.con}>
                
                <MinfoHeader/>

                <MinfoHero/>

                <MinfoFeatures/>

            </div>
        )
    }
}