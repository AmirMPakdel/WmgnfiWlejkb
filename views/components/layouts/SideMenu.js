import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import styles from "./SideMenu.module.css";
import chest from '@/utils/chest';
import Observer from '@/utils/observer';


export default class SideMenu extends Component {

    constructor(props){
        super(props);
        this.state = {
            active_page : "dashboard",
            showBackdrop:false
        }
    }

    componentDidMount(){

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
        if(name === "dashboard"){
            prefix = "/";
        }
        window.location.href = prefix + name;
    }

    render() {
        return (
            <div ref={r=>this.SideMenu=r} className={styles.sidemenu_con}>

                <div className={styles.sidemenu_title+" ftc2i"}>{"Minfo"}</div>

                <SideMenuBtn title="داشبورد" icon={"/svg/ed_dbrd_dashboard.svg"}
                onClick={this.onSelect} active_page={this.state.active_page} name="dashboard"/>

                <SideMenuBtn title="دوره های من" icon={"/svg/ed_dbrd_mycourses.svg"}
                onClick={this.onSelect} active_page={this.state.active_page} name="myCourses"/>

                <SideMenuBtn title="مقالات" icon={"/svg/ed_dbrd_articles.svg"}
                onClick={this.onSelect} active_page={this.state.active_page} name="myArticles"/>

                <SideMenuBtn title="ایجاد دوره" icon={"/svg/ed_dbrd_addcourses.svg"}
                onClick={this.onSelect} active_page={this.state.active_page} name="newCourse"/>

                {/* <SideMenuBtn title="تالار گفتگو" icon={"/svg/ed_dbrd_forum.svg"}
                onClick={this.onSelect} active_page={this.state.active_page} name="forum"/> */}

                <SideMenuBtn title="تنظیمات" icon={"/svg/ed_dbrd_services.svg"}
                onClick={this.onSelect} active_page={this.state.active_page} name="settings"/>

                <SideMenuBtn title="گزارش‌های مالی" icon={"/svg/ed_dbrd_finance.svg"}
                onClick={this.onSelect} active_page={this.state.active_page} name="finances"/>

                <SideMenuBtn title="افزایش اعتبار" icon={"/svg/ed_dbrd_increase_credit.svg"}
                onClick={this.onSelect} active_page={this.state.active_page} name="increaseCredit"/>

                <div className={styles.sidemenu_wrapper1}>

                    <SideMenuBtn title="امیرمحمد پاکدل" icon={"/svg/ed_dbrd_user.svg"}
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
                <img src={props.icon}/>
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