import EditCourseReleaseDateModel from "@/models/components/editCourse/EditCourseReleaseDateModel";
import EditCourseReleaseDate from "@/views/components/editCourse/EditCourseReleaseDate";

export default class EditCourseReleaseDateController{
    
    /**@param {EditCourseReleaseDate} view*/
    constructor(view){
        this.view = view;
        this.model = new EditCourseReleaseDateModel();
    }
    
    
    
}