import EditableElementCardModel from "@/models/components/editHomePage/EditableElementCardModel";
import EditIntroElementModal from "@/views/components/modal/editHomePage/EditIntroElementModal";

export default class EditIntroElementController{
    
    /**@param {EditIntroElementModal} view*/
    constructor(view){
        this.view = view;
        this.model = new EditableElementCardModel();
    }
    
    
    
}