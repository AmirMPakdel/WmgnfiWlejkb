import React, { Component } from "react";
import styles from "./Minfo.module.css";
import MinfoHeader from "@/views/components/minfo/MinfoHeader";
import MinfoHero from "@/views/components/minfo/MinfoHero";
import MinfoFeatures from "@/views/components/minfo/MinfoFeatures";
import MinfoPricing from "@/views/components/minfo/MinfoPricing";
import MinfoSendMessage from "@/views/components/minfo/MinfoSendMessage";
import MinfoFooter from "@/views/components/minfo/MinfoFooter";
import { BackTop } from "node_modules/antd/lib/index";

/**
* Props of Minfo Component
* @typedef Props
* @property {string} className
* @property {React.CSSProperties} style
* 
* @extends {Component<Props>}
*/
export default class Minfo extends Component {

    constructor(props){
        super(props);
        
    }
    
    render(){
        return(
            <div className={styles.con}>
                
                <MinfoHeader/>

                <MinfoHero/>

                <MinfoFeatures/>

                <MinfoPricing/>

                <MinfoSendMessage/>

                <MinfoFooter/>

                <BackTop>
                    <img src="/statics/svg/minfo-backtop.svg"/>
                </BackTop>

            </div>
        )
    }
}