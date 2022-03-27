import chest from "@/utils/chest";
import React, { Component } from "react";
import styles from "./SortBar.module.css";
import CrossSvg from "@/views/svgs/Cross";
import MainButton from "../global/MainButton";

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

    openModal=()=>{

        let modal = 
        <SortModal onCancel={this.onModalCancel}
        onSubmit={this.onModalSubmit}
        selected={this.state.selected}/>

        chest.ModalLayout.setAndShowModal(1, modal);
    }

    onModalCancel=()=>{

        chest.ModalLayout.closeAndDelete(1);
    }

    onModalSubmit=(key)=>{

        this.onSelect(key);
        chest.ModalLayout.closeAndDelete(1);
    }
    
    render(){
        return(
            <div className={styles.con+" sm_card_shd "+this.props.className}>

                <div className={styles.text}>{"مرتب سازی بر اساس "}</div>
                
                <Button name={"جدیدترین"}
                selected={this.state.selected==="1"}
                onSelect={()=>this.onSelect("1")}/>

                <Button name={"پرفروش ترین"}
                selected={this.state.selected==="2"}
                onSelect={()=>this.onSelect("2")}/>

                <Button name={"بیشترین امتیاز"}
                selected={this.state.selected==="3"}
                onSelect={()=>this.onSelect("3")}/>

                <Button name={"پربازدید ترین"}
                selected={this.state.selected==="4"}
                onSelect={()=>this.onSelect("4")}/>

            </div>
        )
    }
}

function Button(props){
    let addClass = "";
    if(props.selected){
        addClass += " bgtc1"
    }
    if(props.className){
        addClass += " "+props.className;
    }
    return(
        <div className={styles.btn_con+" amp_btn "+addClass} onClick={props.onSelect}>
            {props.name}
        </div>
    )
}

class SortModal extends Component{

    constructor(props){
        super(props);
        this.state={
            selected:props.selected,
        }
    }

    onCancel=()=>{
        this.props.onCancel();
    }

    onSubmit=()=>{
        this.props.onSubmit(this.state.selected);
    }

    onSelect=(key)=>{
        this.setState({selected:key});
    }

    render(){
        return(
            <div className={styles.smodal_con+" bglc1 btc2 xl_card_shd"}>

                <CrossSvg className={styles.close_btn + " bglc1 amp_btn md_card_shd"}
                stroke={env.THEME.dc1}
                onClick={this.onCancel}/>

                <div className={styles.smodal_title+" tilt"}>{"مرتب سازی"}</div>

                <div className={styles.smodal_wrapper}>

                    <Button name={"جدیدترین"}
                    className={styles.smodal_btn+" bdc2"}
                    selected={this.state.selected==="1"}
                    onSelect={()=>this.onSelect("1")}/>

                    <Button name={"پرفروش ترین"}
                    className={styles.smodal_btn+" bdc2"}
                    selected={this.state.selected==="2"}
                    onSelect={()=>this.onSelect("2")}/>

                    <Button name={"بیشترین امتیاز"}
                    className={styles.smodal_btn+" bdc2"}
                    selected={this.state.selected==="3"}
                    onSelect={()=>this.onSelect("3")}/>

                    <Button name={"پربازدید ترین"}
                    className={styles.smodal_btn+" bdc2"}
                    selected={this.state.selected==="4"}
                    onSelect={()=>this.onSelect("4")}/>

                </div>

                <MainButton className={styles.smodal_submit}
                title={"تایید"}
                onClick={this.onSubmit}/>

            </div>
        )
    }
}