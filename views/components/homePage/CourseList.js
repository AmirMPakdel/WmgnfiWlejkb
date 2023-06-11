import CourseListController from "@/controllers/components/homePage/CourseListController";
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
        this.controller = new CourseListController(this);
        this.state = {
            list:[],
        }
    }
    
    componentDidMount(){

        setTimeout(this.loadCourses, 500);
    }

    loadCourses=()=>{

        this.controller.loadCourses();
    }
    
    render(){
        return(
            <div className={styles.con+" bgw sm_card_shd"}>

                <div className={styles.title_sec+" fdc2 tilt"}>
                    <span className={styles.left_dashes+" tc1"}>&#8211; &#8211; &#8212;</span>
                    <span>{this.props.data.title}</span>
                    <span className={styles.right_dashes+" tc1"}>&#8212; &#8211; &#8211;</span>
                </div>

                <div className={styles.wrapper}>

                <Carousel>
                {
                    this.state.list.map((cw, cwi)=>{

                        if(cwi%4 === 0){
                            return(<div key={cwi} className={styles.card_wrapper}>

                                <div className={styles.card_wrapper_desktop}>

                                    {
                                        this.state.list.map((c, i)=>{
                                            if(i>=cwi && i<cwi+4){
                                                if(i%4 === 3){
                                                    return <CourseCard key={i} hideRating={true} className={styles.fourth_card} data={c}/>;
                                                }else{
                                                    return <CourseCard key={i} hideRating={true} className={styles.first_card} data={c}/>;
                                                }
                                            }
                                        })
                                    }

                                </div>

                                <div className={styles.card_wrapper_tablet}>

                                    {
                                        this.state.list.map((c, i)=>{
                                            if(i>=cwi && i<cwi+4){
                                                if(i%4 === 0 || i%4 === 1){
                                                    return <CourseCard key={i} hideRating={true} className={styles.first_card} data={c}/>;
                                                }else{
                                                    return null;
                                                }
                                            }
                                        })
                                    }

                                </div>
                                
                                <div className={styles.card_wrapper_tablet}>

                                    {
                                        this.state.list.map((c, i)=>{
                                            if(i>=cwi && i<cwi+4){
                                                if(i%4 === 2){
                                                    return <CourseCard key={i} hideRating={true} className={styles.first_card} data={c}/>;
                                                }else if(i%4 === 3){
                                                    return <CourseCard key={i} hideRating={true} className={styles.fourth_card} data={c}/>;
                                                }
                                            }
                                        })
                                    }
                                    
                                </div>

                            </div>)
                        }else{
                            return null;
                        }
                    })
                }
                </Carousel>

                </div>
                
            </div>
        )
    }
}