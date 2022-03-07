import CategoryCrudModel from "@/models/components/modals/global/CategoryCrudModel";
import CategoryCrudModal from "@/views/components/modal/global/CategoryCrudModal";

export default class CategoryCrudModalController{
    
    /**@param {CategoryCrudModal} view*/
    constructor(view){
        this.view = view;
        this.model = new CategoryCrudModel();
    }
    
    loadCategories(){

        let v = this.view;
        v.setState({loading:true});

        this.model.getCategories(null, (err, data)=>{

            if(data.result_code === env.SC.SUCCESS){

                v.setState({
                    loading:false,
                    list:data.data,
                });

            }
        })
    }
    
}