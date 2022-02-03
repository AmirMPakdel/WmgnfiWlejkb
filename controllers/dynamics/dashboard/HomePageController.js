import HomePageModel from "@/models/dynamics/dashboard/HomePageModel";
import HomePage from "@/views/dynamics/dashboard/HomePage";

export default class HomePageController{
    
    /**@param {HomePage} view*/
    constructor(view){
        this.view = view;
        this.model = new HomePageModel();
    }
    
    
    
}