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
import EmptyList from "@/views/components/global/EmptyList";
import Observer from "@/utils/observer";
import { getParamByName } from "@/utils/helpers";

export const STORE_PAGE_SIZE = 12;

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
            course_loading: false,
            list:[],
            
            currentPage:1,
            total:0,
        }
    }
    
    componentDidMount(){

        Observer.add("onUrlStateChange", this.controller.loadCourses);

        window.onpopstate = this.onPopUrlState;

        this.controller.loadData();
    }

    componentWillUnmount(){

        Observer.remove("onUrlStateChange", this.controller.loadCourses);
    }

    onPopUrlState=()=>{

        Observer.execute("onUrlStateChange");
    }

    onPageChange=(page)=>{

        this.controller.onPageChange(page);
    }

    onSearch=(phrase)=>{

        this.controller.onSearch(phrase);
    }

    onGroupSelect=(groups)=>{
        
        this.controller.onGroupSelect(groups);
    }

    onSortSelect=(sort_mode)=>{

        this.controller.onSortSelect(sort_mode);
    }

    openSortModal=()=>{
        
        this.SortBar.openModal();
    }

    openFilterModal=()=>{

        this.RightSideFilter.openModal();
    }
    
    render(){
        console.log(this.state);
        return(
            <IndexLayout accessType="noAuth"
            showWithoutAuth={false}
            footerAutoLoad={true}>
            {
                this.state.loading?

                <Loading className={styles.loading}/>:

                <div className={styles.con}>

                    <div className={styles.filter_bar_con}>

                        <RightSideFilter
                        onSearch={this.onSearch}
                        onGroupSelect={this.onGroupSelect}
                        ref={r=>this.RightSideFilter=r}/>

                    </div>

                    <div className={styles.main_sec_wrapper}>

                        <div className={styles.breadcrum_con}>

                            <StoreBreadcrumb/>

                        </div>

                        <div className={styles.sort_bar_con}>

                            <SortBar className={styles.sort_bar}
                            onSortSelect={this.onSortSelect}
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

                        {
                            this.state.course_loading?
                            <Loading className={styles.course_loading}/>
                            :
                            <>
                            {
                                this.state.list.length?
                                <div className={styles.store_card_wrapper}>

                                    {
                                        this.state.list.map((v,i)=>(
                                            <CourseCard className={styles.card}
                                            hideRating={true}
                                            key={i} data={v}/>
                                        ))
                                    }

                                    <div className={styles.pagination_wrapper}>

                                        <Pagination className={styles.pagination}
                                        onPageChange={this.onPageChange}
                                        currentPage={this.state.currentPage}
                                        total={this.state.total}
                                        pageSize={STORE_PAGE_SIZE}/>

                                    </div>

                                </div>
                                :
                                <EmptyList className={styles.empty_list}/>
                            }
                            </>
                        }

                    </div>

                </div>
            }
            </IndexLayout>
        )
    }
}