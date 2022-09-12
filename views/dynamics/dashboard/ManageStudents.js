import ManageStudentsController from "@/controllers/dynamics/dashboard/ManageStudentsController";
import Dropdown from "@/views/components/global/Dropdown";
import Loading from "@/views/components/global/Loading";
import MainButton from "@/views/components/global/MainButton";
import Pagination from "@/views/components/global/Pagination";
import EducatorDashboardLayout from "@/views/layouts/EducatorDashboardLayout";
import WrapperT1 from "@/views/layouts/WrapperT1";
import { ConfigProvider, Table } from "node_modules/antd/lib/index";
import React, { Component } from "react";
import styles from "./ManageStudents.module.css";

const FINANCIAL_REPORTS_PAGE_SIZE = 20;

/**
* Props of ManageStudents Component
* @typedef Props
* @property {string} className
* @property {React.CSSProperties} style
* 
* @extends {Component<Props>}
*/
export default class ManageStudents extends Component {
    
    constructor(props){
        super(props);
        this.controller = new ManageStudentsController(this);
        this.state = {
            loading:true,
            table:"1",
            data:[],

            total:0,
            current_page:1,

            courseList:[
                {id: null, title:"همه"}
            ],
            selected_course:{id:null, title:"همه"},
        }
    }
    
    componentDidMount(){

        this.loadData();
    }

    loadData=()=>{

        this.controller.getCourseList((courseList)=>{
            this.state.courseList = courseList;
            this.controller.loadData();
        });
    }

    onPageChange=(page)=>{

        this.controller.loadData(page);
    }

    onAddStudent=()=>{

        this.controller.onAddStudent();
    }

    onCourseSelect=(obj)=>{

        this.controller.onCourseSelect(obj);
    }
    
    render(){
        return(
        <EducatorDashboardLayout accessType="userL1"
        showWithoutAuth={false}>
        <WrapperT1>

            <div className={styles.con}>

                <div className={styles.tbs_con}>
                    
                    <MainButton className={styles.sb_add_std}
                    title={"اضافه کردن دانش آموز"}
                    onClick={this.onAddStudent}/>
                    
                    <Dropdown className={styles.sb_select_course}
                    options={this.state.courseList}
                    onSelect={this.onCourseSelect}
                    disabled={this.state.loading}
                    placeholder={"انتخاب دوره"}/>

                </div>
                
                {
                    this.state.loading?
                    <Loading style={{minHeight:"calc(80vh - 6rem)"}}/>:
                    <>
                    <div className={styles.table_wrapper+" sm_card_shd"}>

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

                        </ConfigProvider>
                        </div>

                    </div>

                    <div className={styles.pagination_con}>

                        <Pagination className={styles.pagination}
                        onPageChange={this.onPageChange}
                        total={this.state.total}
                        pageSize={FINANCIAL_REPORTS_PAGE_SIZE}
                        currentPage={this.state.current_page}/>

                    </div>
                    </>
                }
            </div>

        </WrapperT1>
        </EducatorDashboardLayout>
        )
    }
}

const table1_columns = [
    {
        title: 'نام',
        dataIndex: 'first_name',
    },
    {
        title: 'نام خانوادگی',
        dataIndex: 'last_name',
    },
    {
        title: 'موبایل',
        dataIndex: 'phone_number',
    },
    {
        title: 'کد ملی',
        dataIndex: 'national_code',
    }
];

const table2_columns = [
    {
        title: 'شناسه',
        dataIndex: 'id',
    },
    {
        title: 'نام',
        dataIndex: 'first_name',
    },
    {
        title: 'نام خانوادگی',
        dataIndex: 'last_name',
    },
    {
        title: 'موبایل',
        dataIndex: 'phone_number',
    },
    {
        title: 'کد ملی',
        dataIndex: 'national_code',
    },
    {
        title: 'دسترسی',
        dataIndex: 'access',
        render: t=>(t?<div className="fsc cpt">فعال</div>:<div className="fec cpt">غیرفعال</div>),
    }
];


