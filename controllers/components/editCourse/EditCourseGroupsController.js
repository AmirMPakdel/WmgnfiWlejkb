import EditCourseGroupsModel from "@/models/components/editCourse/EditCourseGroupsModel";
import chest from "@/utils/chest";
import EditCourseGroups from "@/views/components/editCourse/EditCourseGroups";
import CategorySelectModal from "@/views/components/modal/global/CategorySelectModal";

export default class EditCourseGroupsController{
    
    /**@param {EditCourseGroups} view*/
    constructor(view){
        this.view = view;
        this.model = new EditCourseGroupsModel();
    }
    
    
    onEdit(){

        let modal = 
        <CategorySelectModal onConfirm={this.onGroupSelect} 
        ref={r=>this.CategorySelectModal=r}/>;
        
        chest.ModalLayout.setAndShowModal(1, modal);
    }

    onGroupSelect=(key)=>{

        let list = this.CategorySelectModal.getList();
        //alert(key);
        console.log(list);
    }
}