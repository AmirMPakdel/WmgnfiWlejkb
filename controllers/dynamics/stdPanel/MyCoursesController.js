import MyCoursesModel from "@/models/dynamics/stdPanel/MyCoursesModel";
import MyCourses from "@/views/dynamics/stdPanel/MyCourses";

export default class MyCoursesController{
    
    /**@param {MyCourses} view*/
    constructor(view){
        this.view = view;
        this.model = new MyCoursesModel();
    }
    
    
    
}