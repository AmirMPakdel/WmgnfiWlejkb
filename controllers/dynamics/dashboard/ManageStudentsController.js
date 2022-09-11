import ManageStudentsModel from "@/models/dynamics/dashboard/ManageStudentsModel";
import ManageStudents from "@/views/dynamics/dashboard/ManageStudents";

export default class ManageStudentsController{
    
    /**@param {ManageStudents} view*/
    constructor(view){
        this.view = view;
        this.model = new ManageStudentsModel();
    }
    
    load=()=>{
        
    }
    
}