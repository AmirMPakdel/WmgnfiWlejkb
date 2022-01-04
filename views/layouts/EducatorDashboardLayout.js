import React, { Component } from "react";
// import NotificationsMenu from "@/views/components/educatorDashboard/NotificationsMenu";
import SideMenu from "@/views/components/layouts/SideMenu";
import chest from "@/utils/chest";
import styles from "./EducatorDashboardLayout.module.css";
import AccessLayout from "@/views/layouts/AccessLayout";
import ModalLayout from "@/views/layouts/ModalLayout";
import Observer from "@/utils/observer";

/**
 * @typedef Props 
 * @property {AccessLevel} accessLevel
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
    
    render(){
        return(

            <AccessLayout accessLevel={this.props.accessLevel}>
                <ModalLayout>
                    <div className={styles.layout}>
                        
                        <div className={styles.header_bar+" bgwi"}>

                            <SideMenu/>

                                <div className={styles.header_right_sec}>

                                {
                                    this.state.menu_is_open?
                                    <img className={styles.menu_btn+" amp_btn"} 
                                    src={"/svg/dashboard/menu_close.svg"}
                                    onClick={this.onToggleMenu}/>:
                                    <img className={styles.menu_btn+" amp_btn"} 
                                    src={"/svg/dashboard/menu_open.svg"}
                                    onClick={this.onToggleMenu}/>
                                }

                            </div>

                            <div className={styles.header_left_sec}>

                                <div>
                                    <img className={styles.notification_img+" amp_btn"} src={"/svg/edu_notification.svg"}
                                    onClick={this.onNitifications}/>
                                    <div className={styles.badge}>{"21"}</div>
                                </div>

                                
                                <img className={styles.logout_img+" amp_btn"} src={"/svg/edu_logout.svg"}/>

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