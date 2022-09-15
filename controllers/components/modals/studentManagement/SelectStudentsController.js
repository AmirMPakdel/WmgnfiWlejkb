import chest from "@/utils/chest";
import AddStudentConfirmModal from "@/views/components/modal/manageStudents/AddStudentConfirmModal";
import SelectStudentsModal from "@/views/components/modal/manageStudents/SelectStudentsModal";

export default class SelectStudentsController{
    
    /**@param {SelectStudentsModal} view*/
    constructor(view){
        this.view = view;
        //this.model = new ModelClassName();

        this.allStudentsList = this.view.props.allStudents;
        this.selectedCourseStudentList = this.view.props.courseStudents;
    }
    
    loadStudents=()=>{

        let showingStudnetList = [];

        filterStudents(this.allStudentsList, this.selectedCourseStudentList).then((list)=>{

            showingStudnetList = list;

            this.view.setState({
                loading:false,
                list:showingStudnetList,
            })

        }).catch(e=>{
            console.log(e);
        });
    }
    

    onConfirm=(selected_row_keys, selected_rows)=>{

        console.log(selected_row_keys);
        console.log(selected_rows);

        let jsx = 
        <AddStudentConfirmModal 
        courseTitle={this.view.props.title}
        selectedList={selected_rows}
        selectedKeys={selected_row_keys}
        courseId={this.view.props.courseId}
        updateList={this.view.props.updateList}/>

        chest.ModalLayout.setAndShowModal(2, jsx);

    }
}

const filterStudents = (all, course)=>new Promise((resolve, reject)=>{

    try{
        
        let showingStudnetList = [];

        all.forEach(e1=>{
            
            let exist = false;
            course.forEach(e2=>{

                if(e1.id == e2.id){
                    exist = true;
                }
            });
            if(!exist){
                showingStudnetList.push(e1);
            }
        });

        resolve(showingStudnetList);

    }catch(e){
        reject(e);
    }
});