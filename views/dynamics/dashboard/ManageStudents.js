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


const PAGE_SIZE = 100;

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

            selected_row_keys:[],
            selected_rows:[],

            searchText: '',
            searchedColumn: '',
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
        const columns = [
            {
              title: 'نام خانوادگی',
              dataIndex: 'last_name',
              key: 'last_name',
              width: '25%',
              sorter: (a, b) => compare(a.last_name, b.last_name),
              defaultSortOrder:"descend",//start the table with last_name ordered descend
              sortDirections:["descend","ascend"],//first descend then ascend
              ...this.controller.getColumnSearchProps('last_name'),
            },
            {
              title: 'نام',
              dataIndex: 'first_name',
              key: 'first_name',
              width: '25%',
              sorter: (a, b) => compare(a.first_name, b.first_name),
              sortDirections:["descend","ascend"],
              ...this.controller.getColumnSearchProps('first_name'),
            },
            {
                title: 'کد ملی',
                dataIndex: 'national_code',
                key: 'national_code',
                width: '25%',
                sorter: (a, b) => compare(a.national_code, b.national_code),
                sortDirections:["descend","ascend"],
                ...this.controller.getColumnSearchProps('national_code'),
            },
            {
                title: 'موبایل',
                dataIndex: 'phone_number',
                key: 'phone_number',
                width: '25%',
                sorter: (a, b) => compare(a.phone_number, b.phone_number),
                sortDirections:["descend","ascend"],
                ...this.controller.getColumnSearchProps('phone_number'),
            },
            
        ];

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
                                <Table
                                dataSource={this.state.data}
                                columns={columns} 
                                rowClassName={(record,index)=>(index%2?styles.oddRow:styles.evenRow)}
                                pagination={false}/>:null
                            }
                            {
                                this.state.table=="2"?
                                <Table
                                dataSource={this.state.data}
                                columns={columns} 
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
                        pageSize={PAGE_SIZE}
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

const compareStrings = (a, b) => {
    if (a < b) return 1;
    if (a > b) return -1;
  
    return 0;
  }
  
const compare = (a, b) => {
    const splitA = a.split(" ");
    const splitB = b.split(" ");
    const lastA = splitA[splitA.length - 1];
    const lastB = splitB[splitB.length - 1];

    return lastA === lastB ?
    compareStrings(splitA[0], splitB[0]) :
    compareStrings(lastA, lastB);
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


