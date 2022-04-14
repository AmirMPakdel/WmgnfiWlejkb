import React, { Component } from "react";
// import NotificationsMenu from "@/views/components/educatorDashboard/NotificationsMenu";
import SideMenu from "@/views/components/layouts/SideMenu";
import chest from "@/utils/chest";
import styles from "./EducatorDashboardLayout.module.css";
import AccessLayout from "@/views/layouts/AccessLayout";
import ModalLayout from "@/views/layouts/ModalLayout";
import Observer from "@/utils/observer";
import LogoutSvg from "@/views/svgs/Logout";
import NotificationSvg from "@/views/svgs/Notification";
import HamburgerSvg from "@/views/svgs/Hamburger";
import CrossSvg from "@/views/svgs/Cross";
import { deleteCookie } from "@/utils/cookie";


/**
 * @typedef Props 
 * @property {"noAuth"|"student"|"userL1"|"userL2"} accessType
 * @property {boolean} showWithoutAuth
 * 
 * @extends {Component<Props>}
 */
export default class EducatorDashboardLayout extends Component {

    state={
        menu_is_open : false,
    }

    componentDidMount(){
        Observer.add("onSideMenuToggle", this.onSideMenuToggle);
    }

    componentWillUnmount(){
        Observer.remove("onSideMenuToggle", this.onSideMenuToggle);
    }

    onNitifications = ()=>{
        chest.NotificationsMenu_toggle();
    }

    onSideMenuToggle=(menu_is_open)=>{
        chest.SideMenu.menu_is_open = menu_is_open;
        this.setState({menu_is_open});
    }

    onToggleMenu=()=>{
        Observer.execute("onSideMenuToggle", !this.state.menu_is_open);
    }

    onLogout=()=>{
        deleteCookie(env.TENANT_KEY);
        deleteCookie(env.TOKEN_KEY);
        window.location.href = env.PATHS.USER_AUTHENTICATION;
    }
    
    render(){
        return(

            <AccessLayout accessType={this.props.accessType}
            showWithoutAuth={this.props.showWithoutAuth}>
                
                <ModalLayout>
                    <div className={styles.layout}>
                        
                        <div className={styles.header_bar+" bgwi"}>

                            <SideMenu/>

                            <div className={styles.header_right_sec}>

                                {
                                    this.state.menu_is_open?
                                    <CrossSvg className={styles.menu_btn+" amp_btn"}
                                    onClick={this.onToggleMenu}/>:
                                    <HamburgerSvg className={styles.menu_btn+" amp_btn"}
                                    onClick={this.onToggleMenu}/>
                                }

                            </div>

                            <div className={styles.header_left_sec}>

                                {/* <div>
                                    <NotificationSvg className={styles.notification_img+" amp_btn"} onClick={this.onNitifications}/>
                                    <div className={styles.badge}>{"21"}</div>
                                </div> */}

                                <LogoutSvg className={styles.logout_img+" amp_btn"}
                                onClick={this.onLogout}/>

                            </div>
                            
                        </div>
                        
                        <div className={styles.wrapper}>
                            {this.props.children}
                            {/* <NotificationsMenu/> */}
                        </div>

                    </div>
                </ModalLayout>
            </AccessLayout>
        )
    }
}