import IndexFooterModel from "@/models/components/layouts/IndexFooterModel";
import IndexFooter from "@/views/components/layouts/IndexFooter";

export default class IndexFooterController{
    
    /**@param {IndexFooter}} view*/
    constructor(view){
        this.view = view;
        this.model = new IndexFooterModel();
    }
    
    fetchData(){

        
    }
    
}