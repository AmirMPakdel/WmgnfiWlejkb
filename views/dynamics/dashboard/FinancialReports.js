import FinancialReportsController from "@/controllers/dynamics/dashboard/FinancialReportsController";
import Loading from "@/views/components/global/Loading";
import MainButton from "@/views/components/global/MainButton";
import Pagination from "@/views/components/global/Pagination";
import EducatorDashboardLayout from "@/views/layouts/EducatorDashboardLayout";
import WrapperT1 from "@/views/layouts/WrapperT1";
import { ConfigProvider, Table } from "node_modules/antd/lib/index";
import React, { Component } from "react";
import styles from "./FinancialReports.module.css";

const FINANCIAL_REPORTS_PAGE_SIZE = 20;

/**
* Props of FinancialReports Component
* @typedef Props
* @property {string} className
* @property {React.CSSProperties} style
* 
* @extends {Component<Props>}
*/
export default class FinancialReports extends Component {
    
    constructor(props){
        super(props);
        this.controller = new FinancialReportsController(this);
        this.state = {

            loading:true,

            data:[],
            total:60,
            currentPage:1,

            table:"1",
        }
    }
    
    componentDidMount(){

        this.controller.loadSellReportTable();
    }

    onTabSelect=(tab)=>{

        this.controller.onTabSelect(tab);
    }

    onPageChange=(page)=>{

        this.controller.onPageChange(page);
    }
    
    render(){
        return(
        <EducatorDashboardLayout>
        <WrapperT1>

            <div className={styles.con}>

                <TabSelectBar ref={r=>this.TabSelectBar=r}
                parent={this}/>
                {
                    this.state.loading?
                    <Loading style={{minHeight:"calc(80vh - 6rem)"}}/>:
                    <>
                    <div className={styles.table_wrapper}>

                        <div className={styles.table_scroller}>
                        <ConfigProvider direction={"rtl"}>

                            {
                                this.state.table=="1"?
                                <Table columns={table1_columns} 
                                dataSource={this.state.data}
                                rowClassName={(record,index)=>(index%2?styles.oddRow:styles.evenRow)}
                                pagination={false}/>:null
                            }
                            {
                                this.state.table=="2"?
                                <Table columns={table2_columns} 
                                dataSource={this.state.data}
                                rowClassName={(record,index)=>(index%2?styles.oddRow:styles.evenRow)}
                                pagination={false}/>:null
                            }
                            {
                                this.state.table=="3"?
                                <Table columns={table3_columns} 
                                dataSource={this.state.data}
                                rowClassName={(record,index)=>(index%2?styles.oddRow:styles.evenRow)}
                                pagination={false}/>:null
                            }

                        </ConfigProvider>
                        </div>

                    </div>

                    <div className={styles.pagination_con}>

                        <Pagination className={styles.pagination}
                        onPageChange={this.onPageChange}
                        total={this.state.total}
                        pageSize={FINANCIAL_REPORTS_PAGE_SIZE}
                        currentPage={this.state.currentPage}/>

                    </div>
                    </>
                }
            </div>

        </WrapperT1>
        </EducatorDashboardLayout>
        )
    }
}

class TabSelectBar extends Component{

    constructor(props){
        super(props);
        this.state = {
            selected: "1"
        }
    }

    onSelect=(key)=>{
        this.props.parent.onTabSelect(key);
        this.setState({selected:key});
    }

    render(){
        return(
            <div className={styles.tbs_con+" sm_card_shd "}>
                
                <TabButton name={"فروش دوره"}
                selected={this.state.selected==="1"}
                onSelect={()=>this.onSelect("1")}/>

                <TabButton name={"افزایش اعتبار"}
                selected={this.state.selected==="2"}
                onSelect={()=>this.onSelect("2")}/>

                <TabButton name={"مصرف اعتبار"}
                selected={this.state.selected==="3"}
                onSelect={()=>this.onSelect("3")}/>

            </div>
        )
    }
}

function TabButton(props){
    let addClass = "";
    if(props.selected){
        addClass += " bgtc1"
    }
    if(props.className){
        addClass += " "+props.className;
    }
    return(
        <div className={styles.tbs_btn+" amp_btn "+addClass} onClick={props.onSelect}>
            {props.name}
        </div>
    )
}

const table1_columns = [
    {
        title: 'شناسه',
        dataIndex: 'id',
    },
    {
        title: 'عنوان',
        dataIndex: 'title',
    },
    {
        title: 'تاریخ',
        dataIndex: 'date',
    },
    {
        title: 'قیمت (تومان)',
        dataIndex: 'amount',
    },
    {
        title: 'عملیات',
        dataIndex: 'action',
        render: (text, record, index)=>(<MainButton title={"نمایش"} onClick={()=>{window.location.href="/sellReceipt/"+record.id}}/>)
    },
];

const table2_columns = [
    {
        title: 'شناسه',
        dataIndex: 'id',
    },
    {
        title: 'نوع پرداخت',
        dataIndex: 'title',
    },
    {
        title: 'تاریخ',
        dataIndex: 'date',
    },
    {
        title: 'مبلغ (تومان)',
        dataIndex: 'amount',
    },
    {
        title: 'عملیات',
        dataIndex: 'action',
        render: (text, record, index)=>(<MainButton title={"نمایش"} onClick={()=>{window.location.href="/UserBuyCredit/"+record.id}}/>)
    },
];

const table3_columns = [
    {
        title: 'شناسه',
        dataIndex: 'id',
    },
    {
        title: 'عنوان',
        dataIndex: 'title',
    },
    {
        title: 'تاریخ',
        dataIndex: 'date',
    },
    {
        title: 'قیمت (تومان)',
        dataIndex: 'amount',
    }
];