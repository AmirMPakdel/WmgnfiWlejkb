import React, { Component } from "react";
import styles from "./SelectStudentsModal.module.css";
import MainButton from "@/views/components/global/MainButton";
import { Table, Input, Button, Space, ConfigProvider } from 'antd';
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';
import chest from "@/utils/chest";
import Loading from "@/views/components/global/Loading";
import CrossSvg from "@/views/svgs/Cross";
import SelectStudentsController from "@/controllers/components/modals/studentManagement/SelectStudentsController";

/**
 * Props of SelectStudentsModal Component
 * @typedef Props
 * @property {string} className
 * @property {boolean} selectable
 * @property {boolean} editable
 * @property {"checkbox" | "radio"} selectionType
 * @property {()=>{}} onCancel
 * @property {(selectedRowKeys, selectedRows)=>{}} onConfirm
 * 
 * @extends {Component<Props>}
 */
export default class SelectStudentsModal extends Component {

    constructor(props){
        super(props);

        this.controller = new SelectStudentsController(this);

        this.state = {
            loading:true,

            list:[],

            selected_row_keys:[],
            selected_rows:[],

            searchText: '',
            searchedColumn: '',
        }
    }

    componentDidMount(){
        this.controller.loadStudents();
    }

    getColumnSearchProps = (dataIndex) => {
        return(
            {
                filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
                <div style={{ padding: 8 }}>
                    <Input
                    ref={node => {
                        this.searchInput = node;
                    }}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{ marginBottom: 8, display: 'block' }}
                    />
                    <Space>
                    <Button
                        type="primary"
                        onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{ width: 90 }}
                    >
                        Search
                    </Button>
                    <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
                        Reset
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                        confirm({ closeDropdown: false });
                        this.setState({
                            searchText: selectedKeys[0],
                            searchedColumn: dataIndex,
                        })}}
                    >
                        Filter
                    </Button>
                    </Space>
                </div>
                ),
                filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
                onFilter: (value, record) =>
                record[dataIndex]
                    ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
                    : '',
                onFilterDropdownVisibleChange: visible => {
                if (visible) {
                    setTimeout(() => this.searchInput.select(), 100);
                }
                },
                render: text =>
                this.state.searchedColumn === dataIndex ? (
                    <Highlighter
                    highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
                    searchWords={[this.state.searchText]}
                    autoEscape
                    textToHighlight={text ? text.toString() : ''}
                    />
                ) : (
                    text
                ),
            }
        );
    }
    
    handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        this.setState({
          searchText: selectedKeys[0],
          searchedColumn: dataIndex,
        });
    }
    
    handleReset = clearFilters => {
        clearFilters();
        this.setState({ searchText: '' });
    }

    onCancel = ()=>{

        if(this.props.onCancel){
            this.props.onCancel();
        }else{
            chest.ModalLayout.visibleToggle(1, false);
        }
    }

    onConfirm = ()=>{

        this.controller.onConfirm(this.state.selected_row_keys, this.state.selected_rows);
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
              ...this.getColumnSearchProps('last_name'),
            },
            {
              title: 'نام',
              dataIndex: 'first_name',
              key: 'first_name',
              width: '25%',
              sorter: (a, b) => compare(a.first_name, b.first_name),
              sortDirections:["descend","ascend"],
              ...this.getColumnSearchProps('first_name'),
            },
            {
                title: 'کد ملی',
                dataIndex: 'national_code',
                key: 'national_code',
                width: '25%',
                sorter: (a, b) => compare(a.national_code, b.national_code),
                sortDirections:["descend","ascend"],
                ...this.getColumnSearchProps('national_code'),
            },
            {
                title: 'موبایل',
                dataIndex: 'phone_number',
                key: 'phone_number',
                width: '25%',
                sorter: (a, b) => compare(a.phone_number, b.phone_number),
                sortDirections:["descend","ascend"],
                ...this.getColumnSearchProps('phone_number'),
            },
            
        ];

        let rowSelection = {
                
            type :this.props.selectionType,

            selectedRowKeys:this.state.selected_row_keys,

            onChange: (selectedRowKeys, selectedRows) => {
                this.setState({
                    selected_row_keys : selectedRowKeys,
                    selected_rows : selectedRows,
                });
            }
        }

        return(
            <div className={styles.con+" bglc1 btc2 xl_card_shd"}>

                <CrossSvg className={styles.close_btn + " bglc1 amp_btn md_card_shd"}
                stroke={env.THEME.dc1}
                onClick={this.onCancel}/>

                {
                    this.state.loading?
                    <Loading/>:null
                }
                {
                    !this.state.loading?
                    <>

                        <div className={styles.title+" tilt "}>
                            {"اضافه کردن دانش آموز به "+this.props.title}
                        </div>

                        <div className={styles.table_con}>
                        
                            <div className={styles.table_wrapper}>

                            <ConfigProvider direction={"rtl"}>

                                <Table
                                scroll={{ y: "calc(80vh - 14rem)" }}
                                rowSelection={rowSelection}
                                columns={columns} 
                                dataSource={this.state.list}
                                pagination={false}/>

                            </ConfigProvider>

                            </div>

                        </div>

                        <div className={styles.sec1}>
                                
                            <MainButton className={styles.confirm_btn}
                            title={"تایید"}
                            onClick={this.onConfirm}/>

                        </div>

                    </>:null
                }
                
            </div>
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