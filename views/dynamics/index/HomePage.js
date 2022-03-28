import HomePageController from "@/controllers/dynamics/index/HomePageController";
import Loading from "@/views/components/global/Loading";
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
            loading:true,
            elements:[],
            intro: {},
            footer: {},
            hierarchy: [],
        }
    }
    
    componentDidMount(){

        this.controller.loadElements();

    }
    
    render(){

        let index = 0;

        return(
            <IndexLayout>

                {
                    this.state.loading?
                    <Loading className={styles.loading}/>
                    :
                    <div className={styles.con+" bgw"}>

                        <Intro data={this.state.intro}/>

                        {
                            this.state.elements.map((e, i)=>{

                                if(e.el_type == 3){
                                    return <CourseList key={i} data={e}/>;
                                }

                                if(e.el_type == 4){
                                    index++;
                                    return <InfoBox key={i} index={index} data={e}/>;
                                }

                                return null;
                            })
                        }

                        {/* 
                        <CourseList data={{}}/>
                        <InfoBox data={{template:1}}/>
                        <InfoBox index={0} data={{template:2}}/>
                        <CourseList data={{}}/>
                        <InfoBox index={1} data={{template:2, has_link:1}}/> 
                        */}

                    </div>
                }
                
            </IndexLayout>
        )
    }
}