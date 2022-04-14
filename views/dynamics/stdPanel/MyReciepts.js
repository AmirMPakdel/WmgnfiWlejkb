import MyRecieptsController from "@/controllers/dynamics/stdPanel/MyRecieptsController";
import React, { Component } from "react";
import styles from "./MyReciepts.module.css";
import EmptyList from "@/views/components/global/EmptyList";
import Loading from "@/views/components/global/Loading";
import MainButton from "@/views/components/global/MainButton";
import StudentPanelLayout from "@/views/layouts/StudentPanelLayout";
import WrapperT1 from "@/views/layouts/WrapperT1";
import Pagination from "@/views/components/global/Pagination";
import {sqlTimeStamp2ShamsiDateTime} from "@/utils/time";
import {priceFormat} from "@/utils/price";

/**
* Props of MyReciepts Component
* @typedef Props
* @property {string} className
* @property {React.CSSProperties} style
* 
* @extends {Component<Props>}
*/
export default class MyReciepts extends Component {
    
    constructor(props){
        super(props);
        this.controller = new MyRecieptsController(this);
        this.state = {
            loading:true,
            list:[],
            pageSize:10,
            currentPage:0,
            total:0,
        }
    }
    
    componentDidMount(){
        this.controller.loadMyRecieptPage(1);
    }

    onChangePage=(page)=>{
        this.controller.loadMyRecieptPage(page);
    }
    
    render(){
        return(
            <StudentPanelLayout accessType="student"
            showWithoutAuth={false}>

                <WrapperT1>

                    <div className={styles.list_con}>
                    {
                        this.state.loading?
                        <Loading style={{minHeight:"16rem"}}/>:
                        <>
                        {
                            this.state.list.length?
                            this.state.list.map((v,i)=>(
                                <MyRecieptItem key={i}
                                data={v}/>
                            )):
                            <EmptyList style={{minHeight:"16rem"}}/>
                        }

                        <div className={styles.pagination_con}>
                            <Pagination 
                            onPageChange={this.onChangePage}
                            currentPage={this.state.currentPage}
                            total={this.state.total}
                            pageSize={this.state.pageSize}/>
                        </div>
                        </>
                    }
                    </div>

                </WrapperT1>

            </StudentPanelLayout>
        )
    }
}

class MyRecieptItem extends Component{

    onShow=()=>{
        window.location.href = env.PATHS.STUDENT_VIEW_RECIEPT+ this.props.data.id;
    }

    render(){
        let d = this.props.data;
        return(
            <div className={styles.itm_con+" bgw"}>

                <div className={styles.itm_right_sec}>

                    <div className={styles.itm_title+" bdyt"}>{d.title}</div>

                    <div className={styles.itm_row}>

                        <div className={styles.itm_success+(d.success?" fsc":" fec")}>{d.success?"موفق":"ناموفق"}</div>

                        <div className={styles.itm_date}>{sqlTimeStamp2ShamsiDateTime(d.date)}</div>

                    </div>

                    <div className={styles.itm_row}>

                        <div className={styles.itm_order_no}>{"#" + d.order_no}</div>

                        <div className={styles.itm_price}>{priceFormat(d.price)+" تومان"}</div>

                    </div>
                    
                </div>

                <div className={styles.itm_left_sec}>

                    <MainButton className={styles.itm_show_btn}
                    title={"نمایش"}
                    onClick={this.onShow}/>

                </div>
                
            </div>
        )
    }
}