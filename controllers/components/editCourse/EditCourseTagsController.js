import EditCourseTagsModel from "@/models/components/editCourse/EditCourseTagsModel";
import EditCourseTags from "@/views/components/editCourse/EditCourseTags";

export default class EditCourseTagsController{
    
    /**@param {EditCourseTags} view*/
    constructor(view){
        this.view = view;
        this.model = new EditCourseTagsModel();
    }
    
    
    
}