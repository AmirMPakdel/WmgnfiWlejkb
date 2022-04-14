import React, { Component } from "react";
import styles from "./NewCourse.module.css";
import NewCourseStep1 from "@/views/components/newCourse/NewCourseStep1";
import NewCourseStep2 from "@/views/components/newCourse/NewCourseStep2";
import NewCourseStep3 from "@/views/components/newCourse/NewCourseStep3";
import ZNewCourseSteps from "@/views/components/newCourse/ZNewCourseSteps";
import WrapperT1 from "@/views/layouts/WrapperT1";
import Loading from "@/views/components/global/Loading";
import EducatorDashboardLayout from "@/views/layouts/EducatorDashboardLayout";
import NewCourseController from "@/controllers/dynamics/dashboard/NewCourseController";

export default class NewCourse extends Component {
    
    constructor(props){
        super(props);

        this.conroller = new NewCourseController(this);

        this.state={

            step: "loading",

            categories:[],
    
            title: "",
            price: "",
            category: null,
            is_encrypted: 1,
        }
    }
    

    componentDidMount(){

        this.conroller.getInitialData();
    }

    render(){
        return(
            <EducatorDashboardLayout accessType="userL1"
            showWithoutAuth={false}>
                
                <WrapperT1>
                
                    <ZNewCourseSteps step={this.state.step}/>
                    
                    {
                        this.state.step==="loading"?
                        <Loading style={{minHeight:"24rem"}}/>:
                        null
                    }
                    {
                        this.state.step===1?
                        <NewCourseStep1
                        parent={this}/>
                        :null
                    }
                    {
                        this.state.step===2?
                        <NewCourseStep2
                        parent={this}/>
                        :null
                    }
                    {
                        this.state.step===3?
                        <NewCourseStep3
                        parent={this}/>
                        :null
                    }

                </WrapperT1>
            </EducatorDashboardLayout>
        )
    }
}