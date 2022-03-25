import EditFooterElementModel from "@/models/components/modals/editHomePage/EditFooterElementModel";
import chest from "@/utils/chest";
import EditFooterElementModal from "@/views/components/modal/editHomePage/EditFooterElementModal";

export default class EditFooterElementController{
    
    /**@param {EditFooterElementModal} view*/
    constructor(view){
        this.view = view;
        this.model = new EditFooterElementModel();
    }

    onCancel(){

        chest.ModalLayout.closeAndDelete(1);
    }
    
    onConfirm(){
        
        let v = this.view;
        let vs = v.state;

        v.setState({confirm_loading:true});

        let params = {
            links:{
                email:vs.email,
                telegram:vs.telegram,
                instagram:vs.instagram,
                whatsapp:vs.whatsapp,
                linkedin:vs.linkedin,
            },
            telephones:{
                telephone1:vs.telephone1,
                telephone2:vs.telephone2,
                mobile1:vs.mobile1,
                mobile2:vs.mobile2,
            }
        }

        this.model.save(params, (err, data)=>{

            if(data.result_code === env.SC.SUCCESS){

                this.onCancel();
                v.props.parent.reload();
            }

            v.setState({confirm_loading:false});
        })
    }
}