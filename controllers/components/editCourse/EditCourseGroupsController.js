import EditCourseGroupsModel from "@/models/components/editCourse/EditCourseGroupsModel";
import EditCourseGroups from "@/views/components/editCourse/EditCourseGroups";

export default class EditCourseGroupsController{
    
    /**@param {EditCourseGroups} view*/
    constructor(view){
        this.view = view;
        this.model = new EditCourseGroupsModel();
    }
    
    
    
}