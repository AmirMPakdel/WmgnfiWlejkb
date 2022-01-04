import React, { Component } from "react";
import styles from "./Minfo.module.css";

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
            <div>
                <h1>MINFO website</h1>
                <br/>
                <button>Register</button>
                <br/>
                <button>Login</button>
            </div>
        )
    }
}