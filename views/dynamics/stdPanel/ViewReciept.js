import ViewRecieptController from "@/controllers/dynamics/stdPanel/ViewRecieptController";
import EmptyList from "@/views/components/global/EmptyList";
import Loading from "@/views/components/global/Loading";
import MainButton from "@/views/components/global/MainButton";
import StudentPanelLayout from "@/views/layouts/StudentPanelLayout";
import WrapperT1 from "@/views/layouts/WrapperT1";
import { Pagination } from "node_modules/antd/lib/index";
import React, { Component } from "react";
import styles from "./ViewReciept.module.css";

/**
* Props of ViewReciept Component
* @typedef Props
* @property {string} className
* @property {React.CSSProperties} style
* 
* @extends {Component<Props>}
*/
export default class ViewReciept extends Component {
    
    constructor(props){
        super(props);
        this.controller = new ViewRecieptController(this);
        this.state = {
            loading:true,
            list:[],
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
            <StudentPanelLayout>

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
                            currentPage={this.state.currentPage}
                            total={this.state.total}
                            pageSize={20}/>
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
            <div className={styles.mcc_con+" bgw"}>

                <div className={styles.mcc_title+" bdyt"}>{d.title}</div>

                <MainButton className={styles.mcc_show_btn}
                title={"نمایش"}
                onClick={this.onShow}/>

            </div>
        )
    }
}