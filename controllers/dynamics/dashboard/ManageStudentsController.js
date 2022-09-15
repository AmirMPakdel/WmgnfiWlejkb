import ManageStudentsModel from "@/models/dynamics/dashboard/ManageStudentsModel";
import chest from "@/utils/chest";
import SelectStudentsModal from "@/views/components/modal/manageStudents/SelectStudentsModal";
import ManageStudents from "@/views/dynamics/dashboard/ManageStudents";
import { Input, Button, Space } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';

const PAGE_SIZE = 100;

export default class ManageStudentsController{
    
    /**@param {ManageStudents} view*/
    constructor(view){
        this.view = view;
        this.model = new ManageStudentsModel();

        this.allStudentsList = [];
        this.selectedCourseStudentList = [];
    }

    getCourseList=(cb)=>{

        this.model.getCourses(null, (err, data)=>{

            if(data.result_code == env.SC.SUCCESS){

                let list = data.data.list;
                let courseList = [{id: null, title:"همه"}];
                list.forEach(e=>{
                    courseList.push({id:e.id, title:e.title})
                });

                cb(courseList);
            }
        });
    }
    
    loadData=(course_id=null, page=1)=>{

        this.view.setState({loading:true});

        let params = {
            course_id,
            page,
            chunk: PAGE_SIZE,
        };

        this.model.getCourseStudents(params, (err, data)=>{

            if(data.result_code == env.SC.SUCCESS){

                let d = data.data;

                if(!course_id){
                    this.allStudentsList = d.list;
                }else{
                    this.selectedCourseStudentList = d.list;
                }

                d.list.forEach(e=>{
                    e.key = e.id
                });

                this.view.setState({
                    loading:false,
                    data:d.list,
                    total: d.total_size,
                    current_page:page,
                });
            }
        });
    }

    onCourseSelect=(obj)=>{

        if(this.view.state.selected_course.id == obj.id){
            return;
        }

        this.view.setState({
            selected_course:obj
        });

        this.loadData(obj.id);
    }

    onAddStudent=()=>{

        if(this.view.state.loading){
            return;
        }

        if(!this.view.state.selected_course.id){
            chest.openNotification("برای اضافه کردن دانش آموز ابتدا دوره مورد نظرتان را انتخاب کنید.", "alert");
            return;
        }

        chest.ModalLayout.setAndShowModal(1, 
        <SelectStudentsModal 
        title={this.view.state.selected_course.title}
        allStudents={this.allStudentsList}
        courseStudents={this.selectedCourseStudentList}
        courseId={this.view.state.selected_course.id}
        updateList={this.updateList}/>);
        
    }

    updateList=()=>{

        this.loadData(this.view.state.selected_course.id);
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
                        this.view.setState({
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
                this.view.state.searchedColumn === dataIndex ? (
                    <Highlighter
                    highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
                    searchWords={[this.view.state.searchText]}
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
        this.view.setState({
          searchText: selectedKeys[0],
          searchedColumn: dataIndex,
        });
    }
    
    handleReset = clearFilters => {
        clearFilters();
        this.view.setState({ searchText: '' });
    }
}