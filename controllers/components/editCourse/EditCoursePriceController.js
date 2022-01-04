import EditCoursePriceModel from "@/models/components/editCourse/EditCoursePriceModel";
import chest from "@/utils/chest";
import { getUrlPart } from "@/utils/helpers";
import EditCoursePrice from "@/views/components/editCourse/EditCoursePrice";

export default class EditCoursePriceController{
    
    /**@param {EditCoursePrice} view*/
    constructor(view){
        this.view = view;
        this.model = new EditCoursePriceModel();
    }
    
    onEdit(){
        this.view.EditableText.onEdit();
        let status = this.view.props.parent.state.status;
        status.price = "edit";
        this.view.props.parent.setState(status);
    }
    
    onSubmit(){

        this.view.EditableText.onSubmit();

        let p = this.view.props.parent;
        let ps = p.state;
        let status = ps.status;
        
        if(ps.new_values.price === ps.old_values.price){

            status.price = "idle";
            p.setState({status});

        }else{
            
            status.price = "loading";
            p.setState({status});

            let params = {
                course_id : getUrlPart(3),
                price: ps.new_values.price,
            }

            this.model.save(params, (err, data)=>{

                if(data.result_code === env.SC.SUCCESS){

                    chest.openNotification("قیمت دوره با موفقیت ویرایش شد.", "success");
                    
                    status.price = "idle";
                    let old_values = ps.old_values;
                    old_values.price = params.price;
                    p.setState({status, old_values});
                }

            });
        }
    }

    onCancel(){

        this.view.EditableText.onCancel();

        let p = this.view.props.parent;
        let ps = p.state;
        let status = ps.status;
        status.price = "idle";
        p.setState({status});
    }

    onChange(t){

        let newVal = this.view.props.parent.state.new_values;

        newVal.price = t;

        this.view.props.parent.setState(newVal)
    }
    
}