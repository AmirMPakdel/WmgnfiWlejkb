import EditSitesIconModel from "@/models/components/modals/settings/EditSitesIconModel";
import EditSitesIconModal from "@/views/components/modal/settings/EditSitesIconModal";

export default class EditSitesIconController{
    
    /**@param {EditSitesIconModal} view*/
    constructor(view){
        this.view = view;
        this.model = new EditSitesIconModel();
    }
    
    
    
}