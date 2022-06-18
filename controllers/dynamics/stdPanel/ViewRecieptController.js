import ViewRecieptModel from "@/models/dynamics/stdPanel/ViewRecieptModel";
import { getUrlPart } from "@/utils/helpers";
import ViewReciept from "@/views/dynamics/stdPanel/ViewReciept";

export default class ViewRecieptController{
    
    /**@param {ViewReciept} view*/
    constructor(view){
        this.view = view;
        this.model = new ViewRecieptModel();
    }
    
    getReciept(){

        let params = {
            transaction_id: getUrlPart(3)
        }

        this.model.getReciept(params, (err, data)=>{

            if(data.result_code === env.SC.SUCCESS){

                this.view.setState({
                    loading: false,
                    details: data.data,
                });
                this.setupPageTitle(data.data);
            }
        });

    }

    setupPageTitle(course){

        document.title = "فاکتور خرید "+course.course_title+" | پنل دانش آموز "+" | مینفو";
    }
    
}