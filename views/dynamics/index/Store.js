import React, { Component } from "react";
import styles from "./Store.module.css";
import IndexLayout from "@/views/layouts/IndexLayout";
import CourseCard from "@/views/components/global/CourseCard";
import RightSideFilter from "@/views/components/store/RightSideFilter";
import StoreBreadcrumb from "@/views/components/store/StoreBreadcrumb";
import SortBar from "@/views/components/store/SortBar";
import MainButton from "@/views/components/global/MainButton";
import Pagination from "@/views/components/global/Pagination";
import StoreController from "@/controllers/dynamics/index/StoreController";
import Loading from "@/views/components/global/Loading";

const STORE_PAGE_SIZE = 20;

/**
* Props of Store Component
* @typedef Props
* @property {string} className
* @property {React.CSSProperties} style
* 
* @extends {Component<Props>}
*/
export default class Store extends Component {
    
    constructor(props){
        super(props);
        this.controller = new StoreController(this);
        this.state = {
            loading: true,
            currentPage:1,
            total:450,
        }
    }
    
    componentDidMount(){

        this.controller.loadCourses();
    }

    openSortModal=()=>{
        
        this.SortBar.openModal();
    }

    openFilterModal=()=>{

        this.RightSideFilter.openModal();
    }
    
    render(){
        return(
            <IndexLayout accessType="noAuth"
            showWithoutAuth={false}>
            {
                this.state.loading?

                <Loading className={styles.loading}/>:

                <div className={styles.con}>

                    <div className={styles.filter_bar_con}>

                        <RightSideFilter
                        ref={r=>this.RightSideFilter=r}/>

                    </div>

                    <div className={styles.main_sec_wrapper}>

                        <div className={styles.breadcrum_con}>

                            <StoreBreadcrumb/>

                        </div>

                        <div className={styles.sort_bar_con}>

                            <SortBar className={styles.sort_bar}
                            ref={r=>this.SortBar=r}/>

                        </div>

                        <div className={styles.mobile_filter_sort_bar}>

                            <MainButton className={styles.mob_filter_btn}
                            borderMode
                            onClick={this.openFilterModal}
                            title={"فیلتر"}/>

                            <MainButton className={styles.mob_sort_btn}
                            borderMode
                            onClick={this.openSortModal}
                            title={"مرتب سازی"}/>

                        </div>

                        <div className={styles.store_card_wrapper}>

                            <CourseCard className={styles.card}/>
                            <CourseCard className={styles.card}/>
                            <CourseCard className={styles.card}/>
                            <CourseCard className={styles.card}/>
                            <CourseCard className={styles.card}/>
                            <CourseCard className={styles.card}/>
                            <CourseCard className={styles.card}/>
                            <CourseCard className={styles.card}/>
                            <CourseCard className={styles.card}/>
                            <CourseCard className={styles.card}/>

                            <div className={styles.pagination_wrapper}>

                                <Pagination className={styles.pagination}
                                currentPage={this.state.currentPage}
                                total={this.state.total}
                                pageSize={STORE_PAGE_SIZE}/>

                            </div>
                            
                        </div>

                    </div>

                </div>
            }
            </IndexLayout>
        )
    }
}