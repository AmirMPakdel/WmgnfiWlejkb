import EditCourseLongDescModel from "@/models/components/editCourse/EditCourseLongDescModel";
import chest from "@/utils/chest";
import { getUrlPart } from "@/utils/helpers";
import EditCourseLongDesc from "@/views/components/editCourse/EditCourseLongDesc";

export default class EditCourseLongDescController{
    
    /**@param {EditCourseLongDesc} view*/
    constructor(view){
        this.view = view;
        this.model = new EditCourseLongDescModel();
    }
    
    onEdit(){
        this.view.EditableText.onEdit();
        let status = this.view.props.parent.state.status;
        status.long_desc = "edit";
        this.view.props.parent.setState(status);
    }
    
    onSubmit(){

        this.view.EditableText.onSubmit();

        let p = this.view.props.parent;
        let ps = p.state;
        let status = ps.status;
        
        if(ps.new_values.long_desc === ps.old_values.long_desc){

            status.long_desc = "idle";
            p.setState({status});

        }else{
            
            status.long_desc = "loading";
            p.setState({status});

            let params = {
                course_id : getUrlPart(3),
                desc: ps.new_values.long_desc,
            }

            this.model.save(params, (err, data)=>{

                if(data.result_code === env.SC.SUCCESS){

                    chest.openNotification("معرفی دوره با موفقیت ویرایش شد.", "success");
                    
                    status.long_desc = "idle";
                    let old_values = ps.old_values;
                    old_values.long_desc = params.desc;
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
        status.long_desc = "idle";
        p.setState({status});
    }

    onChange(t){

        let newVal = this.view.props.parent.state.new_values;

        this.view.state.submint_disabled=false;
        if(t.length < 3){
            this.view.state.submint_disabled=true;
        }
        this.view.setState(this.view.state);

        newVal.long_desc = t;

        this.view.props.parent.setState(newVal)
    }
    
}