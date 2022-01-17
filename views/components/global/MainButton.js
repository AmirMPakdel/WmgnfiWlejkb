import React, { Component } from "react";
import Loading from "./Loading";
import styles from "./MainButton.module.css";

/**
 * Props of MainButton Component
 * @typedef Props
 * @property {string} className
 * @property {string} titleClassName
 * @property {React.CSSProperties} style
 * @property {string} title
 * @property {boolean} disabled
 * @property {boolean} borderMode
 * @property {boolean} whiteBorder
 * @property {boolean} rightArrow
 * @property {boolean} leftArrow
 * @property {function} onClick
 * @property {boolean} loading
 * 
 * @extends {Component<Props>}
 */
export default class MainButton extends Component {

    onClick=(e)=>{

        if(this.props.loading)return;

        this.props.onClick && this.props.onClick(e);
    }
    
    render(){

        let add_class = "";

        if(this.props.className){
            add_class += this.props.className+" ";
        }

        if(this.props.borderMode){

            add_class += styles.border_mode+" btc1 ";

        }else if(this.props.whiteBorder){

            add_class += styles.white_border+" blc1 ";
        
        }else{

            add_class += "bgtc1 ";
        }

        if(!this.props.rightArrow && !this.props.leftArrow){
            add_class += styles.more_padding+" ";
        }

        if(this.props.disabled){
            add_class += " bgdc2 "
        }

        if(this.props.loading){

            add_class += " bdc2 bglc1 "+styles.border_mode;

        }

        return(
            <div className={styles.mbtn_con+" bdyt "+add_class+" amp_btn"} onClick={this.onClick} style={this.props.style}>
                {
                    this.props.loading?
                    <Loading scale={0.3}/>:
                    <>
                        {
                            this.props.rightArrow?
                            <img className={styles.rightArrow} src="/svg/btn_rightArrow.svg"/>:
                            null
                        }
                        {
                            this.props.whiteBorder?
                            <div className={styles.title+" "+this.props.titleClassName+" flc1"}>{this.props.title}</div>:
                            <div className={styles.title+" "+this.props.titleClassName+" fdc1"}>{this.props.title}</div>
                        }
                        {
                            this.props.leftArrow?
                            <img className={styles.leftArrow} src="/svg/btn_leftArrow.svg"/>:
                            null
                        }
                    </>
                }
                
            </div>
        )
    }
}