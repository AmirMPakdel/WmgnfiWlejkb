import React, { Component } from "react";
import styles from "./MainHelpSection.module.css";

/**
* Props of MainHelpSection Component
* @typedef Props
* @property {string} className
* @property {React.CSSProperties} style
* 
* @extends {Component<Props>}
*/
export default class MainHelpSection extends Component {
    
    constructor(props){
        super(props);
        //this.controller = new MainHelpSectionController(this);
        this.state = {
            
        }
    }
    
    componentDidMount(){
    }

    viewHelp=(data, sub)=>{

    }
    
    render(){
        let data = this.props.data || {};
        return(
            <div className={styles.con}>

                <div className={styles.sec_title+" fdc2 sm_card_shd"}
                onClick={()=>this.viewHelp(data)}>{data.title}</div>

                <div className={styles.flex_wrapper}>

                    {
                        data.sub.map((v,i)=>(
                            <div className={styles.card_con+" sm_card_shd"} key={i} onClick={()=>this.viewHelp(data, v)}>

                                <div className={styles.card_title+" fdc1"}>{v.title}</div>

                                <div className={styles.card_info+" fdc2"}>{v.info}</div>

                            </div>
                        ))
                    }

                </div>
                
            </div>
        )
    }
}