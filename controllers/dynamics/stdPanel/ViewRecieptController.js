import ViewRecieptModel from "@/models/dynamics/stdPanel/ViewRecieptModel";
import ViewReciept from "@/views/dynamics/stdPanel/ViewReciept";

export default class ViewRecieptController{
    
    /**@param {ViewReciept} view*/
    constructor(view){
        this.view = view;
        this.model = new ViewRecieptModel();
    }
    
    
}