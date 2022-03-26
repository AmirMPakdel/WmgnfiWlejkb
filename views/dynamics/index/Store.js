import React, { Component } from "react";
import styles from "./Store.module.css";
import IndexLayout from "@/views/layouts/IndexLayout";
import CourseCard from "@/views/components/global/CourseCard";
import RightSideFilter from "@/views/components/store/RightSideFilter";
import { Breadcrumb, ConfigProvider } from "node_modules/antd/lib/index";
import StoreBreadcrumb from "@/views/components/store/StoreBreadcrumb";
import SortBar from "@/views/components/store/SortBar";

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
        //this.controller = new StoreController(this);
        this.state = {
        
        }
    }
    
    componentDidMount(){
    }
    
    render(){
        return(
            <IndexLayout>
                
                <div className={styles.con}>

                    <div className={styles.filter_bar_con}>

                        <RightSideFilter/>

                    </div>

                    <div className={styles.main_sec_wrapper}>

                        <div className={styles.breadcrum_con}>

                            <StoreBreadcrumb/>

                        </div>

                        <div className={styles.sort_bar_con}>

                            <SortBar className={styles.sort_bar}/>

                        </div>

                        <div className={styles.mobile_filter_sort_bar}>

                        </div>

                        <div className={styles.stor_card_wrapper}>

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

                        </div>

                    </div>

                </div>
                
            </IndexLayout>
        )
    }
}