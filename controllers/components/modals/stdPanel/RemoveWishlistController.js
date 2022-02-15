import RemoveWishlistModel from "@/models/components/modals/stdPanel/RemoveWishlistModel";
import RemoveWishlistModal from "@/views/components/modal/stdPanel/RemoveWishlistModal";

export default class RemoveWishlistController{
    
    /**@param {RemoveWishlistModal} view*/
    constructor(view){
        this.view = view;
        this.model = new RemoveWishlistModel();
    }
    
    
    confirmDelete(){

        this.view.setState({
            loading:true
        });

        let params = {
            course_id: this.view.props.data.id,
        }

        this.model.removeFromWishlist(params, (err, data)=>{

            if(data.result_code === env.SC.SUCCESS){

                this.view.setState({
                    loading:false,
                });
                
                if(this.view.props.onDelete){
                    this.view.props.onDelete();
                }

                this.view.onCancel();
            }
        });
    }
}