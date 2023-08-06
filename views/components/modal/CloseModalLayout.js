import React, { Component } from "react";
import styles from "./CloseModalLayout.module.css";
import CrossSvg from "@/views/svgs/Cross";

/**
* Props of CloseModalLayout Component
* @typedef Props
* @property {string} className
* @property {string} wrapperClass 
* @property {boolean} closable
* @property {React.CSSProperties} style
* @property {Function} onClose
* 
* @extends {Component<Props>}
*/
export default class CloseModalLayout extends Component {
    
    constructor(props){
        super(props);
    }
    
    componentDidMount(){
    }
    
    render(){
        let className = "bgw ";
        if(this.props.className){
            className = "bgw "+this.props.className;
        }

        let wrapperClass = "bgw ";
        if(this.props.wrapperClass){
            wrapperClass = this.props.wrapperClass;
        }else{
            wrapperClass = styles.defaultWrapperClass;
        }

        return(
            <div className={styles.con+" "+className}>

                {
                    this.props.closable===false?
                    null:
                    <CrossSvg className={styles.close_btn + " bgw amp_btn md_card_shd"}
                    stroke={env.THEME.dc1}
                    onClick={this.props.onClose}/>
                }

                <div className={styles.wrapper+" "+wrapperClass}>

                    {this.props.children}

                </div>

            </div>
        )
    }
}