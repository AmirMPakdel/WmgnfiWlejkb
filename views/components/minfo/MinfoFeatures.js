import React, { Component } from "react";
import styles from "./MinfoFeatures.module.css";
import MinfoSectionHeader from "./MinfoSectionHeader";

/**
* Props of MinfoFeatures Component
* @typedef Props
* @property {string} className
* @property {React.CSSProperties} style
* 
* @extends {Component<Props>}
*/
export default class MinfoFeatures extends Component {
    
    constructor(props){
        super(props);
        //this.controller = new MinfoFeaturesController(this);
        this.state = {
        
        }
    }
    
    componentDidMount(){
    }
    
    render(){
        return(
            <div className={styles.con}>

                <MinfoSectionHeader title="ویژگی ها"/>

                <div className={styles.wrapper}>

                    <div className={styles.right_side}>

                        <div className={styles.sec}>

                            <img className={styles.sec_icon} src={"/statics/svg/minfo-features-fast.svg"}/>

                            <div className={styles.sec_title}>{"سریع"}</div>

                            <div className={styles.sec_text}>
                                {text1}
                            </div>

                        </div>

                        <div className={styles.sec}>

                            <img className={styles.sec_icon} src={"/statics/svg/minfo-features-secure.svg"}/>

                            <div className={styles.sec_title}>{"ایمن"}</div>

                            <div className={styles.sec_text}>
                                {text1}
                            </div>

                        </div>

                        <div className={styles.sec}>

                            <img className={styles.sec_icon} src={"/statics/svg/minfo-features-easy.svg"}/>

                            <div className={styles.sec_title}>{"آسان"}</div>

                            <div className={styles.sec_text}>
                                {text1}
                            </div>

                        </div>

                    </div>

                    <img className={styles.left_img} 
                    src={"/statics/svg/minfo-features-image1.svg"}/>

                </div>
                
            </div>
        )
    }
}

const text1 = "متن توضیحات متن توضیحات متن توضیحات متن توضیحات متن توضیحات متن توضیحات متن توضیحامتن توضیحات متن توضیحات متن توضیحات متن توضیحات متن توضیحات متن توضیحات متن توضیحا";