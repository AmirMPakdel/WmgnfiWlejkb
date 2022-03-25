import { Carousel } from "node_modules/antd/lib/index";
import React, { Component } from "react";
import CourseCard, { HallowCourseCard } from "../global/CourseCard";
import styles from "./CourseList.module.css";

/**
* Props of CourseList Component
* @typedef Props
* @property {string} className
* @property {React.CSSProperties} style
* 
* @extends {Component<Props>}
*/
export default class CourseList extends Component {
    
    constructor(props){
        super(props);
        //this.controller = new CourseListController(this);
        this.state = {
        
        }
    }
    
    componentDidMount(){
    }
    
    render(){
        return(
            <div className={styles.con+" bglc1"}>

                <div className={styles.title_sec+" fdc2 tilt"}>
                    <span className={styles.left_dashes+" ftc1"}>&#8211; &#8211; &#8212;</span>
                    <span>{"پرفروش ترین دوره ها"}</span>
                    <span className={styles.right_dashes+" ftc1"}>&#8212; &#8211; &#8211;</span>
                </div>

                <div className={styles.wrapper}>

                <Carousel>
                    
                    <div className={styles.card_wrapper}>

                        <div className={styles.card_wrapper_desktop}>

                            <CourseCard className={styles.first_card}/>
                            <CourseCard className={styles.first_card}/>
                            <CourseCard className={styles.first_card}/>
                            <CourseCard className={styles.fourth_card}/>

                        </div>

                        <div className={styles.card_wrapper_tablet}>

                            <CourseCard className={styles.first_card}/>
                            <CourseCard className={styles.first_card}/>
                            
                        </div>

                        <div className={styles.card_wrapper_tablet}>

                            <CourseCard className={styles.first_card}/>
                            <CourseCard className={styles.fourth_card}/>
                            
                        </div>

                    </div>

                    <div className={styles.card_wrapper}>

                    <div className={styles.card_wrapper_desktop}>

                        <CourseCard className={styles.first_card}/>
                        <CourseCard className={styles.first_card}/>
                        <CourseCard className={styles.first_card}/>
                        <CourseCard className={styles.fourth_card}/>

                        </div>

                        <div className={styles.card_wrapper_tablet}>

                        <CourseCard className={styles.first_card}/>
                        <CourseCard className={styles.first_card}/>

                        </div>

                        <div className={styles.card_wrapper_tablet}>

                        <CourseCard className={styles.first_card}/>
                        <CourseCard className={styles.fourth_card}/>

                        </div>

                    </div>

                    <div className={styles.card_wrapper}>

                    <div className={styles.card_wrapper_desktop}>

                        <CourseCard className={styles.first_card}/>
                        <CourseCard className={styles.first_card}/>
                        <CourseCard className={styles.first_card}/>
                        <HallowCourseCard className={styles.fourth_card}/>

                        </div>

                        <div className={styles.card_wrapper_tablet}>

                        <CourseCard className={styles.first_card}/>
                        <CourseCard className={styles.first_card}/>

                        </div>

                        <div className={styles.card_wrapper_tablet}>

                        <CourseCard className={styles.first_card}/>
                        <HallowCourseCard className={styles.fourth_card}/>

                        </div>

                    </div>

                </Carousel>

                </div>
                
            </div>
        )
    }
}