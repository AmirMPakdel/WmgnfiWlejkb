import HomePageController from "@/controllers/dynamics/dashboard/HomePageController";
import EditHomePageSecCard from "@/views/components/editHomePage/EditHomePageSecCard";
import Loading from "@/views/components/global/Loading";
import MainButton from "@/views/components/global/MainButton";
import EducatorDashboardLayout from "@/views/layouts/EducatorDashboardLayout";
import React, { Component } from "react";
import styles from "./HomePage.module.css";

/**
* Props of HomePage Component
* @typedef Props
* @property {string} className
* @property {React.CSSProperties} style
* 
* @extends {Component<Props>}
*/
export default class HomePage extends Component {
    
    constructor(props){
        super(props);
        this.controller = new HomePageController(this);
        this.state = {
            loading: true,
            sortMode: false,
            elements: [],
            hierarchy: [],
        }
    }
    
    componentDidMount(){
        this.controller.getElements();
    }

    onAddNewSection=()=>{

    }

    onSortElements=()=>{
        this.controller.onSortElements();
    }

    onCancelSortElements=()=>{
        this.controller.onCancelSortElements();
    }

    onConfirmSortElements=()=>{
        this.controller.onConfirmSortElements();
    }

    openHomePage=()=>{
        if(this.hompPageWin){
            this.hompPageWin.location.reload();
            this.hompPageWin.focus();
        }else{
            this.hompPageWin = window.open(env.PATHS.HOMEPAGE);
        }
    }
    
    render(){
        return(
            <EducatorDashboardLayout>

                <div className={styles.top_sec}>
                    {
                        !this.state.sortMode?
                        
                        <div className={styles.control_bar_sec}>

                            <MainButton
                            className={styles.new_element_btn}
                            title={"ایجاد آیتم جدید"}
                            onClick={this.onAddNewSection}/>

                            <MainButton
                            className={styles.sort_btn}
                            title={"ویرایش ترتیب نمایش"}
                            onClick={this.onSortElements}/>

                        </div>:
                        <div className={styles.control_bar_sec}>

                            <MainButton
                            className={styles.confirm_sort+" bgsc"}
                            title={"ثبت"}
                            onClick={this.onConfirmSortElements}/>

                            <MainButton
                            className={styles.cancel_sort}
                            borderMode
                            title={"انصراف"}
                            onClick={this.onCancelSortElements}/>

                        </div>
                    }
                    {
                        !this.state.sortMode?
                        <MainButton
                        className={styles.open_homePage_btn}
                        title={"نمایش صفحه اصلی وبسایت"}
                        onClick={this.openHomePage}/>
                        :null
                    }
                    
                </div>

                <div className={styles.sec_list+" bdc2"}>

                {
                    this.state.loading?
                    <Loading style={{minHeight:"70vh"}}/>:
                    <>
                        {
                            !this.state.sortMode?
                            <>
                            {
                                this.state.elements.map((v,i)=>(
                                    <EditHomePageSecCard
                                    key={i}
                                    data={v}/>
                                ))
                            }
                            </>:
                            <>
                            {
                                <div>SORT MODE</div>
                            }
                            </>
                        }
                    </>
                }
                
                </div>

            </EducatorDashboardLayout>
        )
    }
}