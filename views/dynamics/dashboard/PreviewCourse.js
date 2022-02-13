import React, { Component } from "react";
import CourseController from "@/controllers/dynamics/index/CourseController";
import CommentsSec from "@/views/components/course/CommentsSec";
import ContentCard from "@/views/components/course/ContentCard";
import CourseBanner from "@/views/components/course/CourseBanner";
import CourseInfo from "@/views/components/course/CourseInfo";
import FloatingCard from "@/views/components/course/FloatingCard";
import IconLine from "@/views/components/course/IconLine";
import RecommandedArticles from "@/views/components/course/RecommandedArticles";
import RecommandedCourses from "@/views/components/course/RecommandedCourses";
import SectionTitle from "@/views/components/course/SectionTitle";
import Loading from "@/views/components/global/Loading";
import IndexLayout from "@/views/layouts/IndexLayout";
import WrapperT1 from "@/views/layouts/WrapperT1";
import PreviewCourseController from "@/controllers/dynamics/dashboard/PreviewCourseController";
import styles from "./PreviewCourse.module.css";

/**
* Props of PreviewCourse Component
* @typedef Props
* @property {string} className
* @property {React.CSSProperties} style
* 
* @extends {Component<Props>}
*/
export default class PreviewCourse extends Component {
    
    constructor(props){
        super(props);
        this.controller = new PreviewCourseController(this);
        this.state={
            loading:true,
            course:{},
        }
    }
    
    componentDidMount(){
        
        this.controller.getCourse();
    }
    
    render(){
        let c = this.state.course;
        return(
            <IndexLayout>

            {
                this.state.loading?
                <Loading style={{minHeight:"75vh"}}/>
                :
                <>

                <WrapperT1 style={{minHeight:"auto"}}>

                <div className={styles.sec1}>

                    <CourseBanner parent={this}/>

                </div>

                <FloatingCard parent={this}/>

                </WrapperT1>

                <div className={styles.sec2}>

                <SectionTitle title="چه چیزی در این دوره یاد خواهید گرفت؟"/>

                {
                    c.subjects?
                    <div className={styles.sec3+" bglc1i"}>
                        {
                            c.subjects.map((v,i)=>(
                                <IconLine key={i} className={styles.crs_points} 
                                icon_className={styles.crs_points_icn}
                                text_className={styles.crs_points_txt} 
                                icon={"/statics/img/square_b.svg"} 
                                text={v}/>
                            ))
                        }
                    </div>
                    :null
                }

                <div className={styles.space1}/>

                <SectionTitle title="محتوای دوره"/>
                {
                    c.headings?
                    c.headings.map((v,i)=>(
                        <ContentCard key={i}
                        open={i===0}
                        data={v}
                        parent={this}/>
                    )):
                    null
                }
                <div className={styles.space1}/>

                <SectionTitle title="پیش نیاز های دوره"/>

                {
                    c.requirements?
                    <div className={styles.req_sec}>
                        {
                            
                            c.requirements.map((v,i)=>(
                            <IconLine key={i} icon_className={styles.square_icon} 
                            icon={"/statics/img/square_b.svg"} 
                            text={v}/>
                            ))
                        }
                    </div>
                    :null
                }

                <div className={styles.space1}/>

                <SectionTitle title="توضیحات دوره"/>

                <CourseInfo parent={this}/>

                {/* <div className={styles.space1}/>

                <SectionTitle title="نظرات کاربران"/>

                <CommentsSec/>

                <SectionTitle title="دوره های پیشنهادی"/>

                <RecommandedCourses/>

                <SectionTitle title="مقالات پیشنهادی"/>

                <RecommandedArticles/> */}


                </div>

                <div style={{height:"10rem"}}/>
                </>
            }
            </IndexLayout>
        )
    }
}