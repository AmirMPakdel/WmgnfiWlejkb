import EditCourseRequirementsModel from "@/models/components/editCourse/EditCourseRequirementsModel";
import chest from "@/utils/chest";
import { getUrlPart } from "@/utils/helpers";
import EditCourseRequirements from "@/views/components/editCourse/EditCourseRequirements";
import _ from "lodash";

export default class EditCourseRequirementsController{
    
    /**@param {EditCourseRequirements} view*/
    constructor(view){
        this.view = view;
        this.model = new EditCourseRequirementsModel();
    }
    
    onEdit(){
        let status = this.view.props.parent.state.status;
        status.requirements = "edit";
        this.view.props.parent.setState(status);
    }

    onAddSubject=()=>{

        let newVal = this.view.props.parent.state.new_values;

        if(!newVal.requirements){
            newVal.requirements = [];
        }

        newVal.requirements.push("");
        
        this.view.props.parent.setState(newVal)
    }
    
    onSubmit(){

        let p = this.view.props.parent;
        let ps = p.state;
        let status = ps.status;

        
        //validate the requirements
        ps.new_values.requirements = ps.new_values.requirements.filter((v,i)=>{
            if(v && v != " " && v != "0" && isNaN(Number(v))){
                return v;
            }
        });
        
        if(_.isEqual(ps.new_values.requirements, ps.old_values.requirements)){

            status.requirements = "idle";
            p.setState({status});

        }else{
            
            status.requirements = "loading";
            p.setState({status});

            let params = {
                course_id : getUrlPart(3),
                requirements: ps.new_values.requirements,
            }

            this.model.save(params, (err, data)=>{

                if(data.result_code === env.SC.SUCCESS){

                    chest.openNotification("موارد آموزشی این دوره با موفقیت ویرایش شد.", "success");
                    
                    status.requirements = "idle";
                    let old_values = ps.old_values;
                    old_values.requirements = params.requirements.map(e=>e);
                    p.setState({status, old_values});
                }
            });
        }
    }

    onCancel(){

        let p = this.view.props.parent;

        let ps = p.state;

        ps.status.requirements = "idle";

        ps.new_values.requirements = ps.old_values.requirements.map(e=>e);

        p.setState(ps);
    }
}