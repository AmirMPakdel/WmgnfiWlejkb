import EditCourseSuggestedCoursesModel from "@/models/components/editCourse/EditCourseSuggestedCoursesModel";
import EditCourseSuggestedCourses from "@/views/components/editCourse/EditCourseSuggestedCourses";

export default class EditCourseSuggestedCoursesController{
    
    /**@param {EditCourseSuggestedCourses} view*/
    constructor(view){
        this.view = view;
        this.model = new EditCourseSuggestedCoursesModel();
    }
    
    
    
}