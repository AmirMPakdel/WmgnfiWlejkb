import EditCourseHoldingStatusModel from "@/models/components/editCourse/EditCourseHoldingStatusModel";
import chest from "@/utils/chest";
import { getUrlPart } from "@/utils/helpers";
import EditCourseHoldingStatus from "@/views/components/editCourse/EditCourseHoldingStatus";

export default class EditCourseHoldingStatusController{
    
    /**@param {EditCourseHoldingStatus} view*/
    constructor(view){
        this.view = view;
        this.model = new EditCourseHoldingStatusModel();
    }
    
    onEdit(){
        let status = this.view.props.parent.state.status;
        status.holding_status = "edit";
        this.view.props.parent.setState(status);
    }
    
    onSubmit(){

        let p = this.view.props.parent;
        let ps = p.state;
        let status = ps.status;
        
        if(ps.new_values.holding_status === ps.old_values.holding_status){

            status.holding_status = "idle";
            p.setState({status});

        }else{
            
            status.holding_status = "loading";
            p.setState({status});

            let params = {
                course_id : getUrlPart(3),
                status: ps.new_values.holding_status,
            }

            this.model.save(params, (err, data)=>{

                if(data.result_code === env.SC.SUCCESS){

                    chest.openNotification("وضعیت انتشار دوره با موفقیت ویرایش شد.", "success");
                    
                    status.holding_status = "idle";
                    let old_values = ps.old_values;
                    old_values.holding_status = params.holding_status;
                    p.setState({status, old_values});
                }

            });
        }
    }

    onCancel(){

        let p = this.view.props.parent;
        let ps = p.state;
        let status = ps.status;
        status.holding_status = "idle";
        ps.new_values.holding_status = ps.old_values.holding_status;
        p.setState({status});
    }

    onChange(t){

        let newVal = this.view.props.parent.state.new_values;

        newVal.holding_status = t;

        this.view.props.parent.setState(newVal)
    }
    
}