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
            <IndexLayout accessType="noAuth"
            showWithoutAuth={false}
            footerAutoLoad={true}>

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

                {
                    c.subjects?
                    <>
                    <SectionTitle title="چه چیزی در این دوره یاد خواهید گرفت؟"/>
                    <div className={styles.sec3+" bglc1i"}>
                        {
                            c.subjects.map((v,i)=>(
                                <IconLine key={i} className={styles.crs_points} 
                                icon_className={styles.crs_points_icn}
                                text_className={styles.crs_points_txt} 
                                icon={"/statics/svg/crs_row_icn.svg"} 
                                text={v}/>
                            ))
                        }
                    </div>
                    </>
                    :null
                }

                <div className={styles.space1}/>

                {
                    c.requirements?
                    <>
                    <SectionTitle title="پیش نیاز های دوره"/>
                    <div className={styles.req_sec+" bglc1i"}>
                        {
                            
                            c.requirements.map((v,i)=>(
                            <IconLine key={i} className={styles.crs_points} 
                            icon_className={styles.crs_points_icn}
                            text_className={styles.crs_points_txt} 
                            icon={"/statics/svg/crs_row_icn.svg"} 
                            text={v}/>
                            ))
                        }
                    </div>
                    </>
                    :null
                }

                <div className={styles.space1}/>

                {
                    c.headings?
                    <>
                    <SectionTitle title="محتوای دوره"/>
                    {
                        c.sorted_content.map((v,i)=>(
                            <ContentCard key={i}
                            open={true}
                            data={v}
                            parent={this}/>
                        ))
                    }
                    </>:
                    null
                }


                <div className={styles.space1}/>

                {
                    c.long_desc?
                    <>
                    <SectionTitle title="توضیحات دوره"/>
                    <CourseInfo parent={this}/>
                    </>
                    :null
                }

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