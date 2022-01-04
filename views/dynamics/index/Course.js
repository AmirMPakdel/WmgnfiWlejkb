import React, { Component } from "react";
import CourseController from "@/controllers/index/CourseController";
import CommentsSec from "@/views/components/course/CommentsSec";
import ContentCard from "@/views/components/course/view/ContentCard";
import CourseBanner from "@/views/components/course/view/CourseBanner";
import CourseInfo from "@/views/components/course/view/CourseInfo";
import FloatingCard from "@/views/components/course/view/FloatingCard";
import IconLine from "@/views/components/course/view/IconLine";
import RecommandedArticles from "@/views/components/course/view/RecommandedArticles";
import RecommandedCourses from "@/views/components/course/view/RecommandedCourses";
import SectionTitle from "@/views/components/course/view/SectionTitle";
import Loading from "@/views/components/global/Loading";
import IndexLayout from "@/views/layouts/IndexLayout";
import WrapperT1 from "@/views/layouts/WrapperT1";
import styles from "./Course.module.css";

export default class Course extends Component {

    constructor(props){
        super(props);

        this.controller = new CourseController(this);
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

                <div className={styles.sec3+" bglc1i"}>
                    {
                        c.subjects.map((v,i)=>(
                            <IconLine key={i} className={styles.crs_points} 
                            icon_className={styles.crs_points_icn}
                            text_className={styles.crs_points_txt} 
                            icon={"/svg/crs_point_icn.svg"} 
                            text={v}/>
                        ))
                    }
                </div>

                <div className={styles.space1}/>

                <SectionTitle title="محتوای دوره"/>
                {
                    c.headings.map((v,i)=>(
                        <ContentCard key={i} 
                        data={v}
                        parent={this}/>
                    ))
                }
                <div className={styles.space1}/>

                <SectionTitle title="پیش نیاز های دوره"/>

                <div className={styles.req_sec}>
                    {
                        c.requirements.map((v,i)=>(
                        <IconLine key={i} icon_className={styles.square_icon} 
                        icon={"/svg/crs_square_icn.svg"} 
                        text={v}/>
                        ))
                    }
                </div>

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

const arr1 = [
    "استادی در فیزیک کوانتوم در حد تنت",
    "پیش بینی در حد پیش بینی در حد پیش بینی در حد پیش بینی در حد پیش بینی در حد پیش بینی در حد پیش بینی در حد پیش بینی در حد پیش بینی در حد پیش بینی در حد پیش بینی در حد پیش بینی در حد پیش بینی در حد پیش بینی در حد نوستراداموس",
    "ساخت مدل های قوی ماشین زمان",
    "از ماشین زمان برای اهداف شخصی خودتان استفاده کنید",
    "از تکنیک‌های پیشرفته مانند افزایش یا کاهش ابعاد چهارگانه استفاده کنید",
    "نقل مکان در زمان در بعد پنجم",
]

const txt1="1. مقدمه ای بر درس فیزیک";
const txt2="2. نگاهی به هسته اتم"; 
const txt3="3. همه چیز در باره علم کوانتم";
const txt4="4. مبانی سینماتیک و نور";
const txt5="5. پادماده و خواص آن";

const txt6="فقط در حد دبستان بلد باشید کافیست";
const txt7="فرمول‌های دبیرستان هم بلد باشید، ممنون";

