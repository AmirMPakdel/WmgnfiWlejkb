import HomePageController from "@/controllers/dynamics/dashboard/HomePageController";
import CourseList from "@/views/components/homePage/CourseList";
import InfoBox from "@/views/components/homePage/InfoBox";
import Intro from "@/views/components/homePage/Intro";
import IndexLayout from "@/views/layouts/IndexLayout";
import React, { Component } from "react";
import styles from "./HomePage.module.css";

/**
* Props of HomePage Component
* @typedef Props
* @property {string} className
* @property {React.CSSProperties} style
* 
* @extends {Component<Props>}
*/
export default class HomePage extends Component {
    
    constructor(props){
        super(props);
        this.controller = new HomePageController(this);
        this.state = {
        
        }
    }
    
    componentDidMount(){
    }
    
    render(){
        return(
            <IndexLayout>

                <div className={styles.con+" bgw"}>

                    <Intro/>

                    <CourseList data={{}}/>

                    <InfoBox data={{template:1}}/>

                    <InfoBox index={0} data={{template:2}}/>

                    <CourseList data={{}}/>

                    <InfoBox index={1} data={{template:2, has_link:1}}/>

                </div>
                
            </IndexLayout>
        )
    }
}