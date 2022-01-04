import EditCourseDuration from "@/views/components/editCourse/EditCourseDuration";
import EditCourseDurationModel from "@/models/components/editCourse/EditCourseDurationModel";
import { getUrlPart } from "@/utils/helpers";
import chest from "@/utils/chest";

export default class EditCourseDurationController{
    
    /**@param {EditCourseDuration} view*/
    constructor(view){
        this.view = view;
        this.model = new EditCourseDurationModel();
    }
    
    onEdit(){
        this.view.EditableText.onEdit();
        let status = this.view.props.parent.state.status;
        status.duration = "edit";
        this.view.props.parent.setState(status);
    }
    
    onSubmit(){

        this.view.EditableText.onSubmit();

        let p = this.view.props.parent;
        let ps = p.state;
        let status = ps.status;
        
        if(ps.new_values.duration === ps.old_values.duration){

            status.duration = "idle";
            p.setState({status});

        }else{
            
            status.duration = "loading";
            p.setState({status});

            let params = {
                course_id : getUrlPart(3),
                duration: ps.new_values.duration,
            }

            this.model.saveDuration(params, (err, data)=>{

                if(data.result_code === env.SC.SUCCESS){

                    chest.openNotification("مدت زمان دوره با موفقیت ویرایش شد.", "success");
                    
                    status.duration = "idle";
                    let old_values = ps.old_values;
                    old_values.duration = params.duration;
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
        status.duration = "idle";
        p.setState({status});
    }

    onChange(t){

        let newVal = this.view.props.parent.state.new_values;

        newVal.duration = t;

        this.view.props.parent.setState(newVal)
    }
}