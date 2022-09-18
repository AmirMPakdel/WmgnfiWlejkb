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

                    </div>
                }
                
            </IndexLayout>
        )
    }
}

const text1 = "در مینفو امکان ساخت جعبه‌های اطلاعاتی مختلفی وجود دارد. در"+
" این المان  می‌توان تصویر، ویدئو و متن توضیحات خودت رو قرار"+
"دهید و درصورت نیاز با یک دکمه، کاربران خود را به لینک"+
"مورد نظر ارجاع دهید. برای مثال دکمه‌ی مقابل شما را به بخش"+
"دوره های من در داشبورد هدایت میکند.";

const DEFAULT_INFOBOX1 = {
    title: "جعبه اطلاعاتی",
    text: text1,
    type: "ct_image",
    url: "/statics/default_img/default_info_box1.png",
    has_link: true,
    link_title: "لینک دلخواه",
    link: env.PATHS.USER_MYCOURSES,
}

const text2 = "بد نیست در جعبه های اطلاعاتی، خود، تیم خود، آموزشگاه یا کسب و کارتان را معرفی کنید."+
"می‌توانید ویدیویی از معرفی فروشگاه خود قرار دهید تا مخاطب‌هایی که برای اولین بار وارد سایتان شدند بیشتر با شما آشنا شوند ."+
"\n"+
"پس برای آنها از خودتان و هدفتان بگویید.";

const DEFAULT_INFOBOX2 = {
    title: "درباره ما",
    text: text2,
    type: "ct_image",
    url: "/statics/default_img/default_info_box2.jpg",
    has_link: false,
}