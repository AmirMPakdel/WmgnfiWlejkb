import AddEditCourseListElementModel from "@/models/components/modals/editHomePage/AddEditCourseListElementModel";
import AddEditCourseListElementModal from "@/views/components/modal/editHomePage/AddEditCourseListElementModal";

export default class AddEditCourseListElementController{
    
    /**@param {AddEditCourseListElementModal} view*/
    constructor(view){
        this.view = view;
        this.model = new AddEditCourseListElementModel();
    }
    
    onConfirm(){
        
    }
    
}