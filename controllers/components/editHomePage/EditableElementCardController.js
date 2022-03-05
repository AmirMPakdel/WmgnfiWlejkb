import EditableElementCardModel from "@/models/components/editHomePage/EditableElementCardModel";
import chest from "@/utils/chest";
import EditableElementCard from "@/views/components/editHomePage/EditableElementCard";
import AskDeleteElementModal from "@/views/components/modal/editHomePage/AskDeleteElementModal";

export default class EditableElementCardController{
    
    /**@param {EditableElementCard} view*/
    constructor(view){
        this.view = view;
        this.model = new EditableElementCardModel();
    }
    
    onDelete(){
        
        let modal = <AskDeleteElementModal 
        data={this.view.props.data}
        ref={r=>this.AskDeleteElementModal=r}
        onCancel={this.onCancelDelete} 
        onConfirm={this.onConfirmDelete}/>;
        chest.ModalLayout.setAndShowModal(1, modal);
    }

    onCancelDelete=()=>{
        
        chest.ModalLayout.closeAndDelete(1);
    }

    onConfirmDelete=()=>{
        
        let v = this.view;
        let data = v.props.data;
        
        this.AskDeleteElementModal.setState({loading:true});

        let params = { element_id: data.id };

        this.model.Delete(params, (err, data)=>{

            if(data.result_code === env.SC.SUCCESS){

                chest.openNotification("آیتم موردنظر حذف شد.", "success");
                
                this.onCancelDelete();
            }

            this.AskDeleteElementModal.setState({loading:false});
        });
    }
    
}