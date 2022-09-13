import React, { Component } from "react";
import styles from "./EducatorsCrudModal.module.css";
import MainButton from "@/views/components/global/MainButton";
import { Table, Input, Button, Space, ConfigProvider } from 'antd';
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';
import CreateEducatorModal from "@/views/components/modal/educators/CreateEducatorModal";
import chest from "@/utils/chest";
import Loading from "@/views/components/global/Loading";
import EducatorsCrudController from "@/controllers/components/modals/educators/EducatorsCrudController";
import AskDeleteEducatorModal from "@/views/components/modal/educators/AskDeleteEducatorModal";
import EditEducatorModal from "@/views/components/modal/educators/EditEducatorModal";
import CrossSvg from "@/views/svgs/Cross";

/**
 * Props of EducatorsCrudModal Component
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
export default class EducatorsCrudModal extends Component {

    constructor(props){
        super(props);

        this.controller = new EducatorsCrudController(this);
        chest.EducatorsCrudModal.controller = this.controller;

        this.state = {
            loading:true,

            list:[],

            selected_row_keys:[],
            selected_rows:[],

            searchText: '',
            searchedColumn: '',
        }

        if(this.props.selectedRowKeys && this.props.selectedRows){
            this.state.selected_row_keys = this.props.selectedRowKeys;
            this.state.selected_rows = this.props.selectedRows;
        }
    }

    componentDidMount(){
        this.controller.loadEducators();
    }

    onCreate=()=>{

        let modal = <CreateEducatorModal/>;
        chest.ModalLayout.setModal(2, modal, ()=>{
            chest.ModalLayout.visibleToggle(2, true);
        });
    }

    onEdit=(record)=>{

        let modal = <EditEducatorModal data={record}/>
        chest.ModalLayout.setModal(2, modal, ()=>{
            chest.ModalLayout.visibleToggle(2, true);
        });
    }

    onDelete=(record)=>{

        let modal = <AskDeleteEducatorModal data={record}/>
        chest.ModalLayout.setModal(2, modal, ()=>{
            chest.ModalLayout.visibleToggle(2, true);
        });
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

        this.props.onConfirm && this.props.onConfirm(this.state.selected_row_keys, this.state.selected_rows);
    }

    
    
    render(){
        const columns = [
            {
              title: 'نام خانوادگی',
              dataIndex: 'last_name',
              key: 'last_name',
              width: '35%',
              sorter: (a, b) => compare(a.last_name, b.last_name),
              defaultSortOrder:"descend",//start the table with last_name ordered descend
              sortDirections:["descend","ascend"],//first descend then ascend
              ...this.getColumnSearchProps('last_name'),
            },
            {
              title: 'نام',
              dataIndex: 'first_name',
              key: 'first_name',
              width: '30%',
              sorter: (a, b) => compare(a.first_name, b.first_name),
              sortDirections:["descend","ascend"],
              ...this.getColumnSearchProps('first_name'),
            },
            {
                title: 'عملیات',
                key: 'action',
                render: (text, record) => (
                  <Space size="middle">
                    <a onClick={()=>this.onEdit(record)}>ویرایش</a>
                    &emsp;
                    <a onClick={()=>this.onDelete(record)}>حذف</a>
                  </Space>
                ),
            },
            
        ];

        let rowSelection = false;

        if(this.props.selectable){
            rowSelection = {
                
                type :this.props.selectionType,

                selectedRowKeys:this.state.selected_row_keys,

                onChange: (selectedRowKeys, selectedRows) => {
                    this.setState({
                        selected_row_keys : selectedRowKeys,
                        selected_rows : selectedRows,
                    });
                },

            };
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
                            {
                                this.props.selectable?
                                "انتخاب دبیر":
                                "دبیران"
                            }

                            <MainButton className={styles.add_edu_btn}
                            title="ایجاد دبیر"
                            onClick={this.onCreate}/>

                        </div>

                        <ConfigProvider direction={"rtl"}>

                            <Table
                            scroll={{ y: "calc(80vh - 14rem)" }}
                            rowSelection={rowSelection}
                            columns={columns} 
                            dataSource={this.state.list}
                            pagination={false}/>

                        </ConfigProvider>

                        {
                            this.props.selectable?
                                <div className={styles.sec1}>
                                
                                    <MainButton className={styles.confirm_btn}
                                    title={"تایید"}
                                    onClick={this.onConfirm}/>

                                </div>
                                :null
                        }

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