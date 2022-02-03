import HomePageController from "@/controllers/dynamics/dashboard/HomePageController";
import EditHomePageSecCard from "@/views/components/editHomePage/EditHomePageSecCard";
import MainButton from "@/views/components/global/MainButton";
import EducatorDashboardLayout from "@/views/layouts/EducatorDashboardLayout";
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

    onAddNewSection=()=>{

    }
    
    render(){
        return(
            <EducatorDashboardLayout>

                <div className={styles.con}>

                    <div className={styles.control_bar_sec}>

                        <MainButton
                        className={styles.control_bar_btn}
                        title={"ایجاد بخش جدید"}
                        onClick={this.onAddNewSection}/>

                        <MainButton
                        className={styles.control_bar_btn}
                        title={"ویرایش ترتیب نمایش"}
                        onClick={this.onAddNewSection}/>

                    </div>

                </div>

                <div className={styles.sec_list+" bdc2"}>

                    <EditHomePageSecCard
                    title={"اسلایدر"}
                    type={"slider"}
                    visible={true}
                    icon={"/statics/svg2/slider_icon.svg"}/>

                    <EditHomePageSecCard
                    title={"جدیدترین دوره ها"}
                    type={"list"}
                    visible={true}
                    icon={"/statics/svg2/row_icon.svg"}/>

                    <EditHomePageSecCard
                    title={"بنر آموزشگاه"}
                    type={"image"}
                    visible={false}
                    icon={"/statics/svg2/image_icon.svg"}/>

                    <EditHomePageSecCard
                    title={"فروش ویژه دوره کنکور"}
                    type={"info-box"}
                    visible={true}
                    icon={"/statics/svg2/image_text_icon.svg"}/>

                    <EditHomePageSecCard
                    title={"پرفروش ترین دوره ها"}
                    type={"list"}
                    visible={true}
                    icon={"/statics/svg2/row_icon.svg"}/>

                    <EditHomePageSecCard
                    title={"فیلم آموزشگاه"}
                    type={"video"}
                    visible={true}
                    icon={"/statics/svg2/video_icon.svg"}/>

                    <EditHomePageSecCard
                    title={"درباره آموزشگاه"}
                    type={"info-box"}
                    visible={true}
                    icon={"/statics/svg2/image_text_icon.svg"}/>

                    <EditHomePageSecCard
                    title={"فوتر سایت"}
                    type={"footer"}
                    visible={true}
                    icon={"/statics/svg2/footer_icon.svg"}/>

                </div>

            </EducatorDashboardLayout>
        )
    }
}