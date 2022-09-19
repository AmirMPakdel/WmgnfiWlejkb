import React, { Component } from "react";
import MainButton from "../global/MainButton";
import CloseModalLayout from "./CloseModalLayout";
import styles from "./YesNoModalLayout.module.css";

/**
* Props of YesNoModalLayout Component
* @typedef Props
* @property {string} className
* @property {string} wrapperClass 
* @property {boolean} closable
* @property {Function} onClose
* @property {string} positiveClassName
* @property {string} positiveTitle
* @property {Function} onPositive
* @property {boolean} positiveBorderMode
* @property {boolean} positiveLoading
* @property {string} negativeClassName
* @property {string} negativeTitle
* @property {boolean} negativeBorderMode
* @property {Function} onNegative
* 
* @extends {Component<Props>}
*/
export default class YesNoModalLayout extends Component {
    
    constructor(props){
        super(props);
        
    }
    
    componentDidMount(){
    }
    
    render(){
        return(
            <CloseModalLayout className={this.props.className}
            wrapperClass={this.props.wrapperClass}
            closable={this.props.closable}
            onClose={this.props.onClose}>

                {this.props.children}
            
                <div className={styles.btn_sec+" "}>

                    <MainButton className={styles.pos_btn+" "+this.props.positiveClassName}
                    title={this.props.positiveTitle}
                    onClick={this.props.onPositive}
                    borderMode={this.props.positiveBorderMode}
                    loading={this.state.positiveLoading}/>

                    <MainButton className={styles.neg_btn+" "+this.props.negativeClassName}
                    title={this.props.negativeTitle}
                    borderMode={this.props.negativeBorderMode}
                    onClick={this.onNegative}/>

                </div>

            </CloseModalLayout>
        )
    }
}