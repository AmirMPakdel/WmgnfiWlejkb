import MyCoursesController from "@/controllers/dynamics/stdPanel/MyCoursesController";
import React, { Component } from "react";
import StudentPanelLayout from "@/views/layouts/StudentPanelLayout";
import styles from "./MyCourses.module.css";
import Loading from "@/views/components/global/Loading";
import EmptyList from "@/views/components/global/EmptyList";
import MainButton from "@/views/components/global/MainButton";
import myServer from "@/utils/myServer";
import Pagination from "@/views/components/global/Pagination";
import WrapperT1 from "@/views/layouts/WrapperT1";
import Observer from "@/utils/observer";
import chest from "@/utils/chest";
import CourseLicenseModal from "@/views/components/modal/stdPanel/CourseLicenseModal";

/**
* Props of MyCourses Component
* @typedef Props
* @property {string} className
* @property {React.CSSProperties} style
* 
* @extends {Component<Props>}
*/
export default class MyCourses extends Component {
    
    constructor(props){
        super(props);
        this.controller = new MyCoursesController(this);
        this.state = {
            loading:true,
            list:[],
            pageSize:10,
            currentPage:0,
            total:0,
        }

        Observer.add("onAuthenticate", ()=>{
            this.controller.loadCoursePage(1);
        });
    }
    
    componentDidMount(){
    }

    onChangePage=(page)=>{
        this.controller.loadCoursePage(page);
    }
    
    render(){
        return(
            <StudentPanelLayout accessType="student"
            showWithoutAuth={false}>

                <WrapperT1>

                    <div className={styles.list_con}>
                    {
                        this.state.loading?
                        <Loading style={{minHeight:"16rem"}}/>:
                        <>
                        {
                            this.state.list.length?
                            this.state.list.map((v,i)=>(
                                <MyCourseCard key={i}
                                data={v}/>
                            )):
                            <EmptyList style={{minHeight:"16rem"}}/>
                        }

                        <div className={styles.pagination_con}>
                            <Pagination 
                            onPageChange={this.onChangePage}
                            currentPage={this.state.currentPage}
                            total={this.state.total}
                            pageSize={this.state.pageSize}/>
                        </div>
                        </>
                    }
                    </div>

                </WrapperT1>

            </StudentPanelLayout>
        )
    }
}

class MyCourseCard extends Component{

    onShow=()=>{

        window.location.href = env.PATHS.COURSE+ this.props.data.id;
    }

    onLicense=()=>{
        
        chest.ModalLayout.setAndShowModal(1, <CourseLicenseModal data={this.props.data}/>);
    }

    render(){
        let d = this.props.data;
        return(
            <div className={styles.mcc_con+" bgw"}>

                <div className={styles.mcc_icon}
                style={{ backgroundImage:`url("${myServer.MediaFiles.publicImage(d.logo)}")`}}/>

                <div className={styles.mcc_title+" bdyt"}>{d.title}</div>
                
                <div className={styles.mcc_sec1}>

                    <MainButton className={styles.mcc_show_btn}
                    title={"نمایش"}
                    onClick={this.onShow}/>

                    <MainButton className={styles.mcc_license_btn}
                    style={{whiteSpace:"nowrap"}}
                    title={"کد‌ خرید"}
                    borderMode={1}
                    onClick={this.onLicense}/>

                </div>

            </div>
        )
    }
}