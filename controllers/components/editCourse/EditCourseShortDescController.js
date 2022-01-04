import EditCourseShortDescModel from "@/models/components/editCourse/EditCourseShortDescModel";
import chest from "@/utils/chest";
import { getUrlPart } from "@/utils/helpers";
import EditCourseShortDesc from "@/views/components/editCourse/EditCourseShortDesc";

export default class EditCourseShortDescController{
    
    /**@param {EditCourseShortDesc} view*/
    constructor(view){
        this.view = view;
        this.model = new EditCourseShortDescModel();
    }
    
    onEdit(){
        this.view.EditableText.onEdit();
        let status = this.view.props.parent.state.status;
        status.short_desc = "edit";
        this.view.props.parent.setState(status);
    }
    
    onSubmit(){

        this.view.EditableText.onSubmit();

        let p = this.view.props.parent;
        let ps = p.state;
        let status = ps.status;
        
        if(ps.new_values.short_desc === ps.old_values.short_desc){

            status.short_desc = "idle";
            p.setState({status});

        }else{
            
            status.short_desc = "loading";
            p.setState({status});

            let params = {
                course_id : getUrlPart(3),
                desc: ps.new_values.short_desc,
            }

            this.model.save(params, (err, data)=>{

                if(data.result_code === env.SC.SUCCESS){

                    chest.openNotification("معرفی دوره با موفقیت ویرایش شد.", "success");
                    
                    status.short_desc = "idle";
                    let old_values = ps.old_values;
                    old_values.short_desc = params.short_desc;
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
        status.short_desc = "idle";
        p.setState({status});
    }

    onChange(t){

        let newVal = this.view.props.parent.state.new_values;

        newVal.short_desc = t;

        this.view.props.parent.setState(newVal)
    }
    
}