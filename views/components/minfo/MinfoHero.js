import React, { Component } from "react";
import styles from "./MinfoHero.module.css";
import MainButton from "../global/MainButton";
import IconButton from "../global/IconButton";

/**
* Props of MinfoHero Component
* @typedef Props
* @property {string} className
* @property {React.CSSProperties} style
* 
* @extends {Component<Props>}
*/
export default class MinfoHero extends Component {
    
    constructor(props){
        super(props);
        //this.controller = new MinfoHeroController(this);
        this.state = {
        
        }
    }
    
    componentDidMount(){
    }
    
    render(){
        return(
            <div className={styles.con} id="minfo">

                <img className={styles.hero_img}
                src={"/statics/svg/minfo-intro-hero.svg"}/>

                <div className={styles.hero_left_side}>

                    <div className={styles.tx1+" tc2 tilt"}>{"مینفو؛ سریع، ایمن، آسان"}</div>
                    
                    <div className={styles.tx2}>{"بهترین مسیر برای فروش دوره‌های آموزشی"}</div>

                    <div className={styles.tx3}>{"مینفو تمامی ابزارهای مورد نیاز برای فروش دوره‌های آموزشی را در اختیار شما می‌گذارد."}</div>

                    <div className={styles.btn_con}>

                        <MainButton className={styles.free_btn+" fwi"}
                        title="شروع رایگان"/>

                        <IconButton className={styles.more_btn+" tbc2i tc2i"}
                        title="اطلاعات بیشتر"
                        icon={"/statics/svg/left-arrow-primary.svg"}
                        borderMode={true}/>

                    </div>

                </div>
                
            </div>
        )
    }
}