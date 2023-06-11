import React, { Component } from "react";
import styles from "./MinfoHeader.module.css";
import IconButton from "../global/IconButton";
import MainButton from "../global/MainButton";

/**
* Props of MinfoHeader Component
* @typedef Props
* @property {string} className
* @property {React.CSSProperties} style
* 
* @extends {Component<Props>}
*/
export default class MinfoHeader extends Component {
    
    constructor(props){
        super(props);
        //this.controller = new MinfoHeaderController(this);
        this.state = {
            logedin: 0,
            username: "",
            logo:null,
        }

        this.links=[
            {
                label:"مینفو",
                href:"#minfo",
            },
            {
                label:"ویژگی ها",
                href:"#features",
            },
            {
                label:"تعرفه ها",
                href:"#pricing",
            }
        ]

        // let site_info = Storage.get("site_info");
        // if(site_info){ 
        //     this.state.logo = myServer.MediaFiles.publicImage(site_info.page_logo, "header_logo");
        // }

        // Observer.add("onAuthenticate", this.changeInfo);
        // Observer.add("onStudentChange", this.changeInfo);
        // Observer.add("onSiteInfoChange", this.onSiteInfoChange);
    }
    
    componentDidMount(){

        window.addEventListener("scroll", this.onScrollListener);

        /*  Tell me how is it feel sitting up there?
            Feeling so high but too far away to hold me
            You know im the one who put you up there
            Name in the sky, does it ever get lonely?
         */
    }

    componentWillUnmount(){

        window.removeEventListener("scroll", this.onScrollListener);
    }

    onScrollListener=(e)=>{

        console.log(window.scrollY);
        if(window.scrollY < 100 && this.shadow_is_visible){
            this.removeShadow();
        }else if(window.scrollY >= 100 && !this.shadow_is_visible){
            this.addShadow();
        }
    }

    addShadow=()=>{

        this.shadow_is_visible = true;
        this.con.style.boxShadow = "2px 4px 12px -2px rgba(0, 0, 0, 0.25)";
        this.mobile_con.style.boxShadow = "2px 4px 12px -2px rgba(0, 0, 0, 0.25)";
    }

    removeShadow=()=>{

        this.shadow_is_visible = false;
        this.con.style.boxShadow = "unset";
        this.mobile_con.style.boxShadow = "unset";
    }

    openSideMenu=()=>{

        this.SideMenu.style.transform = "translateX(-16rem)";
    }

    closeSideMenu=()=>{

        this.SideMenu.style.transform = "translateX(0)";
    }

    onLogin=()=>{
        
        window.location.href = "/minfo/auth";
    }
    
    render(){
        return(
            <div className={styles.wrapper}>

                <div className={styles.con}
                ref={r=>this.con=r}>

                    <div className={styles.right_side}>

                        <img className={styles.logo}
                        src={"/statics/svg/minfo-logo-main.svg"}/>

                        {
                            this.links.map((v,i)=>(
                                <a key={i} 
                                className={styles.links+" bdyti"} 
                                href={v.href}>
                                    {v.label}
                                </a>
                            ))
                        }

                    </div>
                    
                    <div className={styles.left_side}>

                        <IconButton className={styles.login_btn}
                        title="ورود"
                        icon={"/statics/svg/user-white.svg"}
                        iconClassName={styles.login_icon}
                        onClick={this.onLogin}/>

                        <IconButton className={styles.signup_btn}
                        title="ثبت نام"
                        icon={"/statics/svg/signup-black.svg"}
                        iconClassName={styles.login_icon}
                        onClick={this.onLogin}/>

                    </div>
                    
                </div>

                
                <div className={styles.mobile_con}
                ref={r=>this.mobile_con=r}>

                    <img className={styles.mob_menu_btn} onClick={this.openSideMenu}
                    src={"/statics/svg2/menu.svg"}/>

                    <img className={styles.mob_logo_img}
                    src={"/statics/svg/minfo-logo-main.svg"}/>

                    <IconButton className={styles.signup_btn}
                    title="ورود"
                    icon={"/statics/svg/user-black.svg"}
                    iconClassName={styles.login_icon}
                    onClick={this.onLogin}/>

                    <div ref={r=>this.SideMenu=r} className={styles.side_menu_con+" md_card_shd"}>

                        <img className={styles.sm_close_btn} onClick={this.closeSideMenu}
                        src={"/statics/svg2/close.svg"}/>

                        <div className={styles.sm_divider+" tbgc1"}/>

                        {
                            this.state.logedin?
                            <div className={styles.sm_login_btn+" amp_btn bdc2"}
                            onClick={this.onStudentAuthModal}>
                                <img className={styles.dt_login_user_icon} src={"/statics/svg2/user.svg"}/>
                                <div className={styles.dt_login_t}>{"ورود / ثبت نام"}</div>
                            </div>
                            :
                            <>
                            <MainButton className={styles.menu_signup_btn}
                            title="ثبت نام"
                            icon={"/statics/svg/signup-black.svg"}
                            iconClassName={styles.login_icon}
                            onClick={this.onLogin}/>
                            <MainButton className={styles.menu_signup_btn}
                            title="ورود"
                            icon={"/statics/svg/user-black.svg"}
                            iconClassName={styles.login_icon}
                            onClick={this.onLogin}/>
                            </>
                        }

                        <div className={styles.sm_divider+" tbgc1"}/>

                        {
                            this.links.map((v,i)=>(
                                <a key={i}
                                onClick={this.closeSideMenu}
                                className={styles.sm_link+" fdc1i bdyti"} 
                                href={v.href}>
                                    {v.label}
                                </a>
                            ))
                        }

                        <div className={styles.sm_divider+" tbgc1"}/>

                    </div>
                </div>
            </div>
        )
    }
}