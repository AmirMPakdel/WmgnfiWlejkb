import MyRecieptsModel from "@/models/dynamics/stdPanel/MyRecieptsModel";
import MyReciepts from "@/views/dynamics/stdPanel/MyReciepts";

export default class MyRecieptsController{
    
    /**@param {MyReciepts} view*/
    constructor(view){
        this.view = view;
        this.model = new MyRecieptsModel();
    }
    
    
    
}