import AskDeleteEducatorModel from "@/models/components/modals/educators/AskDeleteEducatorModel";
import chest from "@/utils/chest";
import AskDeleteEducatorModal from "@/views/components/modal/educators/AskDeleteEducatorModal";

export default class AskDeleteEducatorController{
    
    /**@param {AskDeleteEducatorModal} view*/
    constructor(view){
        this.view = view;
        this.model = new AskDeleteEducatorModel();
    }
    
    confirmDelete(){

        this.view.setState({
            loading:true
        });

        let params = {
            educator_id: this.view.props.data.id,
        }

        this.model.deleteEducator(params, (err, data)=>{

            if(data.result_code === env.SC.SUCCESS){

                this.view.setState({
                    loading:false,
                });
                
                chest.openNotification("دبیر مورد نظر حذف شد", "success");

                if(chest.EducatorsCrudModal.controller && 
                    chest.EducatorsCrudModal.controller.loadEducators){

                    chest.EducatorsCrudModal.controller.loadEducators();
                }
                
                this.view.onCancel();
            }
        });
    }
    
    
}