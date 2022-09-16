import HomePageController from "@/controllers/dynamics/index/HomePageController";
import { setSiteInfo } from "@/utils/helpers";
import Loading from "@/views/components/global/Loading";
import CourseList from "@/views/components/homePage/CourseList";
import DefaultCourseList from "@/views/components/homePage/DefaultCourseList";
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
            show_default:false,
            elements:[],
            intro: {},
            footer: {},
            hierarchy: [],
        }
    }
    
    componentDidMount(){

        this.controller.loadElements( this.onLoadSiteInfo );
    }

    onLoadSiteInfo=()=>{

        setSiteInfo(true);   
    }
    
    render(){

        let index = 0;

        return(
            <IndexLayout accessType="noAuth"
            showWithoutAuth={false}
            footerAutoLoad={false}>

                {
                    this.state.loading?
                    <Loading className={styles.loading}/>
                    :
                    <div className={styles.con+" bglc1"}>

                        <Intro data={this.state.intro}
                        show_default={this.state.show_default}/>

                        {
                            this.state.show_default?
                            <>
                            <DefaultCourseList/>

                            <InfoBox index={1} data={DEFAULT_INFOBOX1}
                            directUrl={true}/>

                            <InfoBox index={2} data={DEFAULT_INFOBOX2}
                            directUrl={true}/>
                            </>:
                            null
                        }

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

const text1 = "تو مینفو امکان ساخت جعبه‌های اطلاعاتی مختلفی هست؛ که با"+
" این المان  می‌تونی تصویر، ویدئو و متن توضیحات خودت رو قرار"+
"بدی و اگر خواستی با یک دکمه، کاربر خودت رو به لینک"+
"مورد نظر ارجاع بدی. برای مثال دکمه‌ی مقابل شما را به بخش"+
"دوره های من تو داشبورد هدایت میکنه.";

const DEFAULT_INFOBOX1 = {
    title: "جعبه اطلاعاتی",
    text: text1,
    type: "ct_image",
    url: "/statics/default_img/default_info_box1.png",
    has_link: true,
    link_title: "لینک دلخواه",
    link: env.PATHS.USER_MYCOURSES,
}

const text2 = "خوبه که تو جعبه های اطلاعاتی خودت، تیمت، آموزشگاه و کسب و کارت رو معرفی کنی."+
"می تونی ویدیویی از معرفی فروشگاهت قرار بدی تا مخاطب هایی که برای اولین بار وارد سایتت شدن بیشتر باهات آشنا بشن."+
"\n"+
"پس براشون از خودت و هدفت بگو.";

const DEFAULT_INFOBOX2 = {
    title: "درباره ما",
    text: text2,
    type: "ct_image",
    url: "/statics/default_img/default_info_box2.jpg",
    has_link: false,
}