
import React, { Component } from "react";
import { getTenant } from "@/utils/helpers";
import UserHomePage from "./UserHomePage";
import Minfo from "../minfo/Minfo";

/**
* Props of HomePage Component
* @typedef Props
* @property {string} className
* @property {React.CSSProperties} style
* 
* @extends {Component<Props>}
*/
export default class HomePage extends Component {
    
    constructor(props){
        super(props);
    }
    
    componentDidMount(){
    }
    
    render(){

        if(getTenant()){
            return(
                <UserHomePage/>
            )
        }else{
            return(
                <Minfo/>
            )
        }
    }
}