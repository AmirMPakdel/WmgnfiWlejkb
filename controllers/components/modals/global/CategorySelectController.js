import CategorySelectModel from "@/models/components/modals/global/CategorySelectModel";
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
    
}