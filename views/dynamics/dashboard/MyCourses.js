import React, { Component } from "react";
import MyCoursesController from "@/controllers/dynamics/dashboard/MyCoursesController";
import Loading from "@/views/components/global/Loading";
import EmptyList from "@/views/components/global/EmptyList";
import MainButton from "@/views/components/global/MainButton";
import EducatorDashboardLayout from "@/views/layouts/EducatorDashboardLayout";
import WrapperT1 from "@/views/layouts/WrapperT1";
import styles from "./MyCourses.module.css";
import { priceFormat } from "@/utils/price";
import myServer from "@/utils/myServer";
import Pagination from "@/views/components/global/Pagination"

export default class MyCourses extends Component {

    constructor(props){
        super(props);
        this.controller = new MyCoursesController(this);
        this.state = {
            loading:true,
            list:[],
            pageSize:1,
            currentPage:1,
            total:0,
        }
    }
    
    componentDidMount(){
        document.title="دوره های من";
        this.controller.load();
    }

    onPageChange=(page)=>{
        this.state.currentPage = page;
        this.controller.load();
    }

    render(){
        return(
            <EducatorDashboardLayout accessType="userL1"
            showWithoutAuth={false}>

                <WrapperT1>

                    <div className={styles.mcrs_con}>

                        {
                            this.state.loading?
                            <Loading style={{minHeight:"75vh"}}/>:
                            <>
                            {
                                this.state.list.length?
                                this.state.list.map((v,i)=>(
                                    <CourseCard data={v} key={i}/>
                                )):
                                <EmptyList style={{minHeight:"75vh"}}/>
                            }

                            <Pagination
                            pageSize={this.state.pageSize}
                            currentPage={this.state.currentPage}
                            total={this.state.total}
                            onPageChange={this.onPageChange}/>
                            </>
                        }

                    </div>
                    
                </WrapperT1>

            </EducatorDashboardLayout>
        )
    }
}

class CourseCard extends Component{

    edit=()=>{
        window.location.href = env.PATHS.USER_EDIT_COURSE + this.props.data.id;
    }

    preview=()=>{
        window.location.href = env.PATHS.USER_PREVIEW_COURSE + this.props.data.id;
    }

    render(){
        let d = this.props.data;
        return(
            <div className={styles.cc_con}>

                <div className={styles.cc_sec1}>

                    <div className={styles.cc_img}
                    style={{backgroundImage:`url(${myServer.MediaFiles.publicImage(d.logo, "logo")})`}}/>

                    <div className={styles.cc_title+" bdyt"}>{d.title}</div>

                </div>

                <div className={styles.cc_sec2}>

                    {
                        d.validation_status === "valid"?
                        <>
                        <div className={styles.cc_number}>

                            {priceFormat(d.sells)}

                            <div className={styles.cc_number_tag+" cpnt"}>{"عدد"}</div>

                        </div>

                        <div className={styles.cc_num_title+" bdyt"}>{"دوره فروش رفته"}</div>
                        </>
                        :
                        <>
                        {
                            
                            <>
                            <div className={styles.cc_num_title+" bdyt"}>{"وضعیت انتشار"}</div>

                            <div className={styles.cc_number}>
                                {
                                    d.validation_status === "not_valid"?

                                    <div className={styles.cc_number_tag+" bdyt"}>{"تایید نشده"}</div>:null
                                }
                                {
                                    d.validation_status === "is_checking"?

                                    <div className={styles.cc_number_tag+" bdyt"}>{"درحال بررسی"}</div>:null
                                }
                            </div>
                            </>
                        }
                        </>
                    }
                    

                </div>

                <div className={styles.cc_sec2}>

                    <div className={styles.cc_number}>
                        {priceFormat(d.price)}
                        <div className={styles.cc_number_tag}>{"تومان"}</div>
                    </div>

                    <div className={styles.cc_num_title}>{"قیمت دوره"}</div>

                </div>

                <div className={styles.cc_sec3}>

                    {
                        //<MainButton className={styles.cc_btn} border_mode title={"مقالات"}/>
                    }
                    
                    <MainButton className={styles.cc_btn}title={"پیش نمایش"}
                    onClick={this.preview}/>

                    <MainButton className={styles.cc_btn}title={"ویرایش"}
                    onClick={this.edit}/>

                </div>

            </div>
        )
    }
}