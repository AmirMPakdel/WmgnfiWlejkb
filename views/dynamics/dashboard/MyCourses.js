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

export default class MyCourses extends Component {

    constructor(props){
        super(props);
        this.controller = new MyCoursesController(this);
        this.state = {
            loading:true,
            list:[]
        }
    }
    
    componentDidMount(){
        document.title="دوره های من";
        this.controller.load();
    }

    render(){
        return(
            <EducatorDashboardLayout>

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
        window.location.href = "/dashboard/editCourse/"+this.props.data.id;
    }

    preview=()=>{
        window.location.href = "/course/"+this.props.data.id;
    }

    render(){
        let d = this.props.data;
        return(
            <div className={styles.cc_con}>

                <div className={styles.cc_sec1}>

                    <div className={styles.cc_img}
                    style={{backgroundImage:`url(${myServer.MediaFiles.publicImage(d.logo, "logo")})`}}/>

                    <div className={styles.cc_title}>{d.title}</div>

                </div>

                <div className={styles.cc_sec2}>

                    {
                        d.validation_status === "valid"?
                        <>
                        <div className={styles.cc_number}>

                            {priceFormat(d.sells)}

                            <div className={styles.cc_number_tag}>{"عدد"}</div>

                        </div>

                        <div className={styles.cc_num_title}>{"دوره فروش رفته"}</div>
                        </>
                        :
                        <>
                        {
                            
                            <>
                            <div className={styles.cc_num_title}>{"وضعیت انتشار"}</div>

                            <div className={styles.cc_number}>
                                {
                                    d.validation_status === "not_valid"?

                                    <div className={styles.cc_number_tag}>{"تایید نشده"}</div>:null
                                }
                                {
                                    d.validation_status === "is_checking"?

                                    <div className={styles.cc_number_tag}>{"درحال بررسی"}</div>:null
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