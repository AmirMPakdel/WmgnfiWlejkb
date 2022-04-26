import chest from "@/utils/chest";
import React, { Component } from "react";
import styles from "./SortBar.module.css";
import CrossSvg from "@/views/svgs/Cross";
import MainButton from "../global/MainButton";
import { getParamByName } from "@/utils/helpers";

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
        let sort = getParamByName("sort");
        let sort_mode = "sm_newest";
        if(sort){
            sort_mode = sort;
        } 
        this.state = {
            selected: sort_mode,
        }
    }
    
    componentDidMount(){
    }

    onSelect=(key)=>{
        
        this.setState({selected:key});
        this.props.onSortSelect(key);
    }

    openModal=()=>{

        let modal = 
        <SortModal onCancel={this.onModalCancel}
        onSubmit={this.onModalSubmit}
        selected={this.state.selected}/>;
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
                selected={this.state.selected==="sm_newest"}
                onSelect={()=>this.onSelect("sm_newest")}/>

                <Button name={"پرفروش ترین"}
                selected={this.state.selected==="sm_most_sells"}
                onSelect={()=>this.onSelect("sm_most_sells")}/>

                <Button name={"ارزان ترین"}
                selected={this.state.selected==="sm_lowest_price"}
                onSelect={()=>this.onSelect("sm_lowest_price")}/>

                <Button name={"گران ترین"}
                selected={this.state.selected==="sm_highest_price"}
                onSelect={()=>this.onSelect("sm_highest_price")}/>

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
        let sort = getParamByName("sort");
        let sort_mode = "sm_newest";
        if(sort){
            sort_mode = sort;
        } 
        this.state = {
            selected: sort_mode,
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
                    selected={this.state.selected==="sm_newest"}
                    onSelect={()=>this.onSelect("sm_newest")}/>

                    <Button name={"پرفروش ترین"}
                    className={styles.smodal_btn+" bdc2"}
                    selected={this.state.selected==="sm_most_sells"}
                    onSelect={()=>this.onSelect("sm_most_sells")}/>

                    <Button name={"ارزان ترین"}
                    className={styles.smodal_btn+" bdc2"}
                    selected={this.state.selected==="sm_lowest_price"}
                    onSelect={()=>this.onSelect("sm_lowest_price")}/>

                    <Button name={"گران ترین"}
                    className={styles.smodal_btn+" bdc2"}
                    selected={this.state.selected==="sm_highest_price"}
                    onSelect={()=>this.onSelect("sm_highest_price")}/>

                </div>

                <MainButton className={styles.smodal_submit}
                title={"تایید"}
                onClick={this.onSubmit}/>

            </div>
        )
    }
}