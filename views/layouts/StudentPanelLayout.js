import React, { Component } from "react";
import AccessLayout from "./AccessLayout";
import ModalLayout from "./ModalLayout";
import styles from "./StudentPanelLayout.module.css";
import Observer from "@/utils/observer";
import LogoutSvg from "@/views/svgs/Logout";
import ProfileSvg from "@/views/svgs/Profile";
import { deleteCookie } from "@/utils/cookie";
import { HomeOutlined } from "@ant-design/icons"
import IndexHeader from "../components/layouts/IndexHeader";
import IndexFooter from "../components/layouts/IndexFooter";

/**
* Props of StudentPanelLayout Component
* @typedef Props
* @property {string} className
* @property {React.CSSProperties} style
* @property {"noAuth"|"student"|"userL1"|"userL2"} accessType
* @property {boolean} showWithoutAuth
* 
* @extends {Component<Props>}
*/
export default class StudentPanelLayout extends Component {
    
    constructor(props){
        super(props);
        this.state = {
            username:"",
        }

        Observer.add("onAuthenticate", this.onStudentChange);
        Observer.add("onStudentChange", this.onStudentChange);
    }
    
    componentDidMount(){
        changeCSSVars(themes.userDefault);
    }

    onStudentChange=(student)=>{

        this.setState({
            username: student.first_name+" "+student.last_name,
        });
    }

    onLogout=()=>{

        deleteCookie(env.STUDENT_TOKEN_KEY);
        window.location.href = env.PATHS.HOMEPAGE;
    }
    
    render(){
        return(
            <ModalLayout>

                <AccessLayout accessType={this.props.accessType}
                showWithoutAuth={this.props.showWithoutAuth}>

                    <div className={styles.layout}>

                        <IndexHeader/>

                        <div className={styles.upper_sec}>

                            <div className={styles.username+" tbc1 tilt flc1"}>
                                <ProfileSvg className={styles.user_icon}
                                stroke={"#FFF"}/>
                                {this.state.username}
                            </div>

                            <div className={styles.tab_btn_wrapper}>

                                <TabBtn title={"دوره‌های من"}
                                href={env.PATHS.STUDENT_COURSES}/>

                                <TabBtn title={"علاقه‌مندی‌ها"}
                                href={env.PATHS.STUDENT_WISHLIST}/>

                                <TabBtn title={"سفارش‌های من"}
                                href={env.PATHS.STUDENT_RECIEPTS}/>

                                <TabBtn title={"اطلاعات کاربری"}
                                href={env.PATHS.STUDENT_EDIT_PROFILE}/>

                            </div>

                            <div className={styles.left_side}>

                                <div className={styles.link_con} onClick={this.onLogout}>

                                    <div className={styles.logout_text+" flc1 cpnt"}>{"خروج"}</div>

                                    <LogoutSvg className={styles.logout_img+" amp_btn"}
                                    stroke={"#FFF"}/>

                                </div>

                                {/* <a className={styles.link_con} href={env.PATHS.HOMEPAGE}>

                                    <div className={styles.logout_text+" flc1 cpnt"}>{"خانه"}</div>

                                    <HomeOutlined className={styles.home_icon}/>

                                </a> */}

                            </div>

                        </div>
                        
                        <div className={styles.wrapper}>
                            {this.props.children}
                        </div>

                        <IndexFooter/>

                    </div>
                
                </AccessLayout>
            </ModalLayout>
        )
    }
}

class TabBtn extends Component{

    componentDidMount(){
        this.con.onmouseenter=()=>{
            this.con.style.color="#f5df4d";
        }
        this.con.onmouseleave=()=>{
            this.con.style.color="#fff";
        }
    }

    render(){
        let add_class="";
        if(window.location.href.search(this.props.href) != -1){
            add_class=styles.tab_btn_border_selected;
        }
        return(
            <a className={styles.tab_btn+" flc1"}
            ref={r=>this.con=r}
            href={this.props.href}>
                {
                    this.props.title
                }
                <div className={styles.tab_btn_border+" bgw "+add_class}/>
            </a>
        )
    }
}