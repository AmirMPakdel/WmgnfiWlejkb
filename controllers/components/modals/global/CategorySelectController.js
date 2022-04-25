import CategorySelectModel from "@/models/components/modals/global/CategorySelectModel";
import chest from "@/utils/chest";
import CategoryCrudModal from "@/views/components/modal/global/CategoryCrudModal";
import CategorySelectModal from "@/views/components/modal/global/CategorySelectModal";

export default class CategorySelectController{
    
    /**@param {CategorySelectModal} view*/
    constructor(view){
        this.view = view;
        this.model = new CategorySelectModel();
    }
    
    loadCategories(){

        let v = this.view;
        v.setState({loading:true});

        this.model.getCategories(null, (err, data)=>{

            if(data.result_code === env.SC.SUCCESS){

                v.setState({
                    loading:false,
                    list:data.data
                });

            }
        })
    }

    onCrud(){

        let modal = <CategoryCrudModal onCancel={this.onCrudClosed} onConfirm={this.onCrudClosed}/>;

        chest.ModalLayout.visibleToggle(1, false, ()=>{

            chest.ModalLayout.setAndShowModal(2, modal);
        });
    }

    onCrudClosed=()=>{

        chest.ModalLayout.closeAndDelete(2, ()=>{

            chest.ModalLayout.visibleToggle(1, true, ()=>{

                this.loadCategories();
            });
        });
    }
    
}