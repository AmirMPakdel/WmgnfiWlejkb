import React, { Component } from 'react';
import styles from "./SideMenu.module.css";
import chest from '@/utils/chest';
import Observer from '@/utils/observer';
import CategorySvg from "@/views/svgs/Category";
import ActivitySvg from "@/views/svgs/Activity";
import DocumentSvg from "@/views/svgs/Document";
import WorkSvg from "@/views/svgs/Work";
import PlusSqrSvg from "@/views/svgs/PlusSqr";
import SettingSvg from "@/views/svgs/Setting";
import ArrowUpSqrSvg from "@/views/svgs/ArrowUpSqr";
import ProfileSvg from "@/views/svgs/Profile";


export default class SideMenu extends Component {

    constructor(props){
        super(props);
        this.state = {
            active_page : "dashboard",
            showBackdrop:false,
            name: "",
        }
    }

    componentDidMount(){

        this.handleUser();

        let page = window.location.pathname.split("/")[2];
        if(!page){page = "dashboard"};
        this.setState({active_page:page});

        chest.openSideMenu = this.openSideMenu;
        chest.closeSideMenu = this.closeSideMenu;

        // chest.showBackdrop = this.showBackdrop;
        // chest.hideBackdrop = this.hideBackdrop;

        Observer.add("onResize", this.onResize);
        Observer.add("onSideMenuToggle", this.onSideMenuToggle);
    }

    componentWillUnmount(){
        Observer.remove("onResize", this.onResize);
        Observer.remove("onSideMenuToggle", this.onSideMenuToggle);
        Observer.remove("onUserChange", this.onUserChange)
    }

    handleUser=()=>{

        if(chest.user){
            this.setState({name:chest.user.first_name+" "+chest.user.last_name});
        }

        Observer.add("onUserChange", this.onUserChange);
    }

    onUserChange=(user)=>{
        this.setState({name:user.first_name+" "+user.last_name});
    }

    onResize=()=>{

        if(window.innerWidth > 1024 && !chest.SideMenu.menu_is_open){
            Observer.execute("onSideMenuToggle", !chest.SideMenu.menu_is_open);
        }else if(window.innerWidth <= 1024 && chest.SideMenu.menu_is_open){
            Observer.execute("onSideMenuToggle", !chest.SideMenu.menu_is_open);
        }   
    }

    onSideMenuToggle=(menu_is_open)=>{
        if(menu_is_open){
            this.openSideMenu();
        }else{
            this.closeSideMenu();
        }
    }

    openSideMenu = ()=>{
        this.SideMenu.style.transform = "translateX(0)";
        this.setState({showBackdrop:true})
    }

    closeSideMenu = ()=>{
        this.SideMenu.style.transform = "translateX(10rem)";
        this.setState({showBackdrop:false})
    }

    // showBackdrop = ()=>{}

    // hideBackdrop = ()=>{}

    onSelect = (name)=>{
        let prefix = "/dashboard/";
        window.location.href = prefix + name;
    }

    render() {
        return (
            <div ref={r=>this.SideMenu=r} className={styles.sidemenu_con}>

                <a className={styles.sidemenu_title+" ftc2i"} onClick={()=>window.location.href=env.PATHS.MINFO_HOMEPAGE}>
                    <img className={styles.menu_logo_img} src={"/statics/svg/dashboard/menu_minfo_logo.svg"}/>
                </a>

                <SideMenuBtn title="داشبورد" icon={"sidebar_overview.svg"}
                onClick={this.onSelect} active_page={this.state.active_page} name="overview"/>

                <SideMenuBtn title="دوره های من" icon={"sidebar_myCourses.svg"}
                onClick={this.onSelect} active_page={this.state.active_page} name="myCourses"/>

                {/* <SideMenuBtn title="مقالات" icon={DocumentSvg}
                onClick={this.onSelect} active_page={this.state.active_page} name="myArticles"/> */}

                <SideMenuBtn title="دانش آموزان" icon={"sidebar_studentManagement.svg"}
                onClick={this.onSelect} active_page={this.state.active_page} name="manageStudents"/>

                <SideMenuBtn title="صفحه اصلی" icon={"sidebar_mainPage.svg"}
                onClick={this.onSelect} active_page={this.state.active_page} name="homePage"/>

                <SideMenuBtn title="ایجاد دوره" icon={"sidebar_addCourse.svg"}
                onClick={this.onSelect} active_page={this.state.active_page} name="newCourse"/>

                {/* <SideMenuBtn title="تالار گفتگو" icon={"/svg/ed_dbrd_forum.svg"}
                onClick={this.onSelect} active_page={this.state.active_page} name="forum"/> */}

                <SideMenuBtn title="تنظیمات" icon={"sidebar_settings.svg"}
                onClick={this.onSelect} active_page={this.state.active_page} name="settings"/>

                <SideMenuBtn title="گزارش‌های مالی" icon={"sidebar_financials.svg"}
                onClick={this.onSelect} active_page={this.state.active_page} name="financialReports"/>

                <SideMenuBtn title="افزایش اعتبار" icon={"sidebar_buyCredit.svg"}
                onClick={this.onSelect} active_page={this.state.active_page} name="buyCredit"/>

                <div className={styles.sidemenu_wrapper1}>

                    <SideMenuBtn title={"ویرایش پروفایل"} icon={"sidebar_profile.svg"}
                    onClick={this.onSelect} active_page={this.state.active_page} name="profile" active/>

                </div>
                
                {/* <Backdrop show={this.state.showBackdrop} onClick={chest.onBackdropClicked}/> */}

            </div>
        )
    }
}

function SideMenuBtn(props){
    let s = props.style || {};
    let line_s = {};
    if(props.active_page !== props.name){
        if(!props.active)s.opacity = 0.5;
        line_s.opacity = 0;
    }
    
    return(
        <div className={styles.smbtn_con+" amp_btn"} style={s} onClick={()=>props.onClick(props.name)}>
            <div className={styles.smbtn_right_line} style={line_s}/>
            <img src={"/statics/svg/dashboard/"+props.icon} className={styles.smbtn_icon}/>
            <div className={styles.smbtn_title}>{props.title}</div>
        </div>
    )
}

// function Backdrop(props){
//     let jsx = null;
    
//     if(props.show){
//         jsx = (
//             <div className="nav_backdrop" onScroll={props.onClick} onTouchStart={props.onClick} onClick={props.onClick} 
//             style={{position:"fixed", zIndex:50,top:0, width:"100vw",
//             height:"100vh", backdropFilter:"blur(2px)"}}/>
//         )
//     }
//     return(
//         ReactDOM.createPortal(jsx, document.getElementById("backdrop_hook"))
//     )
// }