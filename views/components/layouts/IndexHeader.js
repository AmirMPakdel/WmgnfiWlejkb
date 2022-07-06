import React, { Component } from "react";
import styles from "./IndexHeader.module.css";
import chest from "@/utils/chest";
import StudentAuthModal from "@/views/components/modal/global/StudentAuthModal";
import Observer from "@/utils/observer";
import { getStudent } from "@/controllers/layouts/AccessLayoutController";
import { deleteCookie, getCookie } from "@/utils/cookie";
import myServer from "@/utils/myServer";
import Storage from "@/utils/storage";

/**
* Props of IndexHeader Component
* @typedef Props
* @property {string} className
* @property {React.CSSProperties} style
* 
* @extends {Component<Props>}
*/
export default class IndexHeader extends Component {
    
    constructor(props){
        super(props);
        //this.controller = new IndexHeaderController(this);
        this.state = {
            logedin: 0,
            username: "",
            logo:null,
        }

        let site_info = Storage.get("site_info");
        if(site_info){ 
            this.state.logo = myServer.MediaFiles.publicImage(site_info.page_logo, "header_logo");
        }

        Observer.add("onAuthenticate", this.changeInfo);
        Observer.add("onStudentChange", this.changeInfo);
        Observer.add("onSiteInfoChange", this.onSiteInfoChange);
    }
    
    componentDidMount(){

        if(getCookie(env.STUDENT_TOKEN_KEY)){
            getStudent(this.getStudent);
        }
    }

    getStudent=(err, data)=>{

        if(data.result_code === env.SC.SUCCESS){

            let student = data.data;
            this.changeInfo(student);
        
        }else{

            deleteCookie(env.STUDENT_TOKEN_KEY);
        }
    }

    changeInfo=(student)=>{

        this.setState({
            logedin:1,
            username: student.first_name+" "+student.last_name,
        });
    }

    onStudentAuthModal=()=>{

        Observer.add("onStudentChange", this.onStudentLogin);

        chest.ModalLayout.setModal(1, <StudentAuthModal/>, ()=>{
            chest.ModalLayout.visibleToggle(1, true);
        });
    }

    onStudentLogin = (student)=>{

        this.setState({
            logedin: 1,
            username: student.first_name+" "+student.last_name
        });
    }

    onSiteInfoChange=(site_info)=>{

        this.setState({logo: myServer.MediaFiles.publicImage(site_info.page_logo, "header_logo")});
    }

    onStudentDashboard=()=>{

        window.location.href = env.PATHS.STUDENT_COURSES;
    }

    openSideMenu=()=>{

        this.SideMenu.style.transform = "translateX(-16rem)";
    }

    closeSideMenu=()=>{

        this.SideMenu.style.transform = "translateX(0)";
    }
    
    render(){
        return(
            <>
            <div className={styles.plchldr_con}/>
            <div className={styles.header_con+" bgw sm_card_shd"}>

                <div className={styles.desktop_con}>

                    <div className={styles.dt_wrapper1}>

                        <div className={styles.dt_logo_con}>

                            <img className={styles.dt_logo_img} onClick={()=>window.location.href=env.PATHS.HOMEPAGE}
                            src={this.state.logo}/>

                        </div>

                        <div className={styles.dt_links_con}>

                            <a className={styles.dt_link+" fdc1i bdyt"} href={"/store"}>{"فروشگاه"}</a>

                            <a className={styles.dt_link+" fdc1i bdyt"} href={"/comments"}>{"نظرات و پیشنهادات"}</a>

                            <a className={styles.dt_link+" fdc1i bdyt"} href={"/help"}>{"راهنما"}</a>

                        </div>

                    </div>

                    <div className={styles.dt_login_sec}>

                        {
                            !this.state.logedin?
                            <div className={styles.dt_login_btn+" amp_btn bdc2"}
                            onClick={this.onStudentAuthModal}>
                                <img className={styles.dt_login_user_icon} src={"/statics/svg2/user.svg"}/>
                                <div className={styles.dt_login_t+" fdc1"}>{"ورود / ثبت نام"}</div>
                            </div>
                            :
                            <div className={styles.dt_logedin_btn+" amp_btn bgtc1"}
                            onClick={this.onStudentDashboard}>
                                <img className={styles.dt_login_user_icon} src={"/statics/svg2/user.svg"}/>
                                <div className={styles.dt_login_t+" fdc1"}>{this.state.username}</div>
                            </div>
                        }

                    </div>

                </div>

                <div className={styles.mobile_con}>

                    <img className={styles.mob_menu_btn} onClick={this.openSideMenu}
                    src={"/statics/svg2/menu.svg"}/>

                    <img className={styles.mob_logo_img}
                    src={this.state.logo}/>

                </div>

                <div ref={r=>this.SideMenu=r} className={styles.side_menu_con+" md_card_shd"}>

                    <img className={styles.sm_close_btn} onClick={this.closeSideMenu}
                    src={"/statics/svg2/close.svg"}/>

                    <div className={styles.sm_divider+" bgtc1"}/>

                    {
                        !this.state.logedin?
                        <div className={styles.sm_login_btn+" amp_btn bdc2"}
                        onClick={this.onStudentAuthModal}>
                            <img className={styles.dt_login_user_icon} src={"/statics/svg2/user.svg"}/>
                            <div className={styles.dt_login_t}>{"ورود / ثبت نام"}</div>
                        </div>
                        :
                        <div className={styles.sm_logedin_btn+" amp_btn bgtc1"}
                            onClick={this.onStudentDashboard}>
                                <img className={styles.dt_login_user_icon} src={"/statics/svg2/user.svg"}/>
                                <div className={styles.dt_login_t+" fdc1"}>{this.state.username}</div>
                        </div>
                    }

                    <div className={styles.sm_divider+" bgtc1"}/>

                    <a className={styles.sm_link+" fdc1i bdyt"} href={"/store"}>{"فروشگاه"}</a>

                    <a className={styles.sm_link+" fdc1i bdyt"} href={"/comments"}>{"نظرات و پیشنهادات"}</a>

                    <a className={styles.sm_link+" fdc1i bdyt"} href={"/help"}>{"راهنما"}</a>

                    <div className={styles.sm_divider+" bgtc1"}/>

                </div>
                
            </div>
            </>
        )
    }
}