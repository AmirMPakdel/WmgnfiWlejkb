import AddStudentConfirmModel from "@/models/components/modals/studentManagement/AddStudentConfirmModel";
import chest from "@/utils/chest";
import AddStudentConfirmModal from "@/views/components/modal/manageStudents/AddStudentConfirmModal";

export default class AddStudentConfirmController{
    
    /**@param {AddStudentConfirmModal} view*/
    constructor(view){
        this.view = view;
        this.model = new AddStudentConfirmModel();
    }
    
    
    onConfirm=()=>{

        this.view.setState({loading:true});

        let params = {
            course_id:this.view.props.courseId,
            student_ids:this.view.selectedKeys,
        }

        this.model.addStudents(params, (err, data)=>{

            if(data.result_code == env.SC.SUCCESS){
                
                this.view.setState({loading:false});
                chest.openNotification("دانش آموزان با موفقیت به دوره مورد نظر اضافه شدند", "success");
                chest.ModalLayout.closeAndDelete(2);
                chest.ModalLayout.closeAndDelete(1);
                this.view.props.updateList();
            }else{
                this.view.setState({loading:false});
                chest.openNotification("خطا در هنگام اضافه کردن دانش آموزان به دوره", "error");
            }
        });
    }
}