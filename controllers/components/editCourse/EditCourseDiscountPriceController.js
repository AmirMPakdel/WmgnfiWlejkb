import EditCourseDiscountPriceModel from "@/models/components/editCourse/EditCourseDiscountPriceModel";
import chest from "@/utils/chest";
import { getUrlPart } from "@/utils/helpers";
import EditCourseDiscountPrice from "@/views/components/editCourse/EditCourseDiscountPrice";

export default class EditCourseDiscountPriceController{
    
    /**@param {EditCourseDiscountPrice} view*/
    constructor(view){
        this.view = view;
        this.model = new EditCourseDiscountPriceModel();
    }
    
    onEdit(){
        this.view.EditableText.onEdit();
        let status = this.view.props.parent.state.status;
        status.discount_price = "edit";
        this.view.props.parent.setState(status);
    }
    
    onSubmit(){

        this.view.EditableText.onSubmit();

        let p = this.view.props.parent;
        let ps = p.state;
        let status = ps.status;
        
        if(ps.new_values.discount_price === ps.old_values.discount_price){

            status.discount_price = "idle";
            p.setState({status});

        }else{
            
            status.discount_price = "loading";
            p.setState({status});

            let params = {
                course_id : getUrlPart(3),
                discount_price: ps.new_values.discount_price,
            }

            this.model.save(params, (err, data)=>{

                if(data.result_code === env.SC.SUCCESS){

                    chest.openNotification("قیمت دوره با احتساب تخفیف با موفقیت ویرایش شد.", "success");
                    
                    status.discount_price = "idle";
                    let old_values = ps.old_values;
                    old_values.discount_price = params.discount_price;
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
        status.discount_price = "idle";
        p.setState({status});
    }

    onChange(t){

        let newVal = this.view.props.parent.state.new_values;

        newVal.discount_price = t;

        this.view.props.parent.setState(newVal)
    }
    
}