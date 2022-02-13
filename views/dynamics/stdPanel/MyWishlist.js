import MyWishlistController from "@/controllers/dynamics/stdPanel/MyWishlistController";
import React, { Component } from "react";
import styles from "./MyWishlist.module.css";

/**
* Props of MyWishlist Component
* @typedef Props
* @property {string} className
* @property {React.CSSProperties} style
* 
* @extends {Component<Props>}
*/
export default class MyWishlist extends Component {
    
    constructor(props){
        super(props);
        this.controller = new MyWishlistController(this);
        this.state = {
        
        }
    }
    
    componentDidMount(){
    }
    
    render(){
        return(
            <div>
                
            </div>
        )
    }
}