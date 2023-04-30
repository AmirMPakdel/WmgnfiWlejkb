import React, { Component } from "react";
import styles from "./MinfoFooter.module.css";

/**
* Props of MinfoFooter Component
* @typedef Props
* @property {string} className
* @property {React.CSSProperties} style
* 
* @extends {Component<Props>}
*/
export default class MinfoFooter extends Component {
    
    constructor(props){
        super(props);
        //this.controller = new MinfoFooterController(this);
        this.state = {
        
        }
    }
    
    componentDidMount(){
    }
    
    render(){
        return(
            <div className={styles.con}>

                <div className={styles.sec} style={{backgroundImage:`url('/statics/svg/minfo-footer-pattern.svg')`}}>

                    <div className={styles.sec1}>

                        <img className={styles.logo} src={"/statics/svg/minfo-footer-logo.svg"}/>

                        <div className={styles.text1}>{"توضیحات توضیحات توضیحات توضیحات توضیحات توضیحات توضیحات توضیحات توضیحات توضیحات توضیحات توضیحات توضیحات توضیحات توضیحات"}</div>

                    </div>

                    <div className={styles.sec2}>

                        <img className={styles.link} src="/statics/svg/minfo-footer-instagram.svg"/>

                        <img className={styles.link} src="/statics/svg/minfo-footer-telegram.svg"/>

                    </div>

                </div>

                <div className={styles.rights+" bgtc1"}>
                    {"کلیه حقوق برای مینفو محفوظ می باشد."}
                </div>
                
            </div>
        )
    }
}