import EditFooterElementModel from "@/models/components/modals/editHomePage/EditFooterElementModel";
import EditFooterElementModal from "@/views/components/modal/editHomePage/EditFooterElementModal";

export default class EditFooterElementController{
    
    /**@param {EditFooterElementModal} view*/
    constructor(view){
        this.view = view;
        this.model = new EditFooterElementModel();
    }
    
    
    
}