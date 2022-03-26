import React, { Component } from "react";
import styles from "./SortBar.module.css";

/**
* Props of SortBar Component
* @typedef Props
* @property {string} className
* @property {React.CSSProperties} style
* 
* @extends {Component<Props>}
*/
export default class SortBar extends Component {
    
    constructor(props){
        super(props);
        //this.controller = new SortBarController(this);
        this.state = {
            selected: "1"
        }
    }
    
    componentDidMount(){
    }

    onSelect=(key)=>{
        this.setState({selected:key})
    }
    
    render(){
        return(
            <div className={styles.con+" md_card_shd "+this.props.className}>

                <div className={styles.text}>{"مرتب سازی بر اساس "}</div>
                
                <Button name={"جدید ترین"}
                selected={this.state.selected==="1"}
                onSelect={()=>this.onSelect("1")}/>

                <Button name={"پرفروش ترین"}
                selected={this.state.selected==="2"}
                onSelect={()=>this.onSelect("2")}/>

                <Button name={"بیشترین امتیاز"}
                selected={this.state.selected==="3"}
                onSelect={()=>this.onSelect("3")}/>



            </div>
        )
    }
}

function Button(props){
    let addClass = "";
    if(props.selected){
        addClass += " bgtc1"
    }
    return(
        <div className={styles.btn_con+" amp_btn "+addClass} onClick={props.onSelect}>
            {props.name}
        </div>
    )
}