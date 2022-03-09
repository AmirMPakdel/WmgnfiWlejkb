import AddEditInfoBoxElementModel from "@/models/components/modals/editHomePage/AddEditInfoBoxElementModel";
import AddEditInfoBoxElementModal from "@/views/components/modal/editHomePage/AddEditInfoBoxElementModal";

export default class AddEditInfoBoxElementController{
    
    /**@param {AddEditInfoBoxElementModal} view*/
    constructor(view){
        this.view = view;
        this.model = new AddEditInfoBoxElementModel();
    }
    
    
    
}