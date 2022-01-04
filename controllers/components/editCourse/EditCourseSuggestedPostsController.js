import EditCourseSuggestedPostsModel from "@/models/components/editCourse/EditCourseSuggestedPostsModel";
import EditCourseSuggestedPosts from "@/views/components/editCourse/EditCourseSuggestedPosts";

export default class EditCourseSuggestedPostsController{
    
    /**@param {EditCourseSuggestedPosts} view*/
    constructor(view){
        this.view = view;
        this.model = new EditCourseSuggestedPostsModel();
    }
    
    
    
}