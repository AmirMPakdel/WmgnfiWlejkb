import CourseInvoiceModel from "@/models/dynamics/index/CourseInvoiceModel";
import CourseInvoice from "@/views/dynamics/index/CourseInvoice";

export default class CourseInvoiceController{
    
    /**@param {CourseInvoice} view*/
    constructor(view){
        this.view = view;
        this.model = new CourseInvoiceModel();
    }
    
    initialize(){
        let params = {};
        this.model.getBaseData(params, (error, data)=>{

            if(data.result_code === env.SC.SUCCESS){

                let d = data.data;
                this.view.setState({
                    loading:false,
                    portals:d.portals,
                })
            }
        });
    }
    
}