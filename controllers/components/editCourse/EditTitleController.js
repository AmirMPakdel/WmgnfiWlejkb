import EditTitleModel from "@/models/components/editCourse/EditTitleModel";
import chest from "@/utils/chest";
import { getUrlPart } from "@/utils/helpers";
import EditCourseTitle from "@/views/components/editCourse/EditCourseTitle";

export default class EditTitleController{
    
    /**@param {EditCourseTitle} view*/
    constructor(view){
        this.view = view;
        this.model = new EditTitleModel();
    }
    
    onEdit(){
        this.view.EditableText.onEdit();
        let status = this.view.props.parent.state.status;
        status.title = "edit";
        this.view.props.parent.setState(status);
    }
    
    onSubmit(){

        this.view.EditableText.onSubmit();

        let p = this.view.props.parent;
        let ps = p.state;
        let status = ps.status;
        
        if(ps.new_values.title === ps.old_values.title){

            status.title = "idle";
            p.setState({status});

        }else{
            
            status.title = "loading";
            p.setState({status});

            let params = {
                course_id : getUrlPart(3),
                title: ps.new_values.title,
            }

            this.model.editTitle(params, (err, data)=>{

                if(data.result_code === env.SC.SUCCESS){

                    chest.openNotification("عنوان دوره با موفقیت ویرایش شد.", "success");
                    
                    status.title = "idle";
                    let old_values = ps.old_values;
                    old_values.title = params.title;
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
        status.title = "idle";
        p.setState({status});
    }

    onChange(t){

        let newVal = this.view.props.parent.state.new_values;

        newVal.title = t;

        this.view.props.parent.setState(newVal)
    }
}