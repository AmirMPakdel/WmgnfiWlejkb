import DeleteHeadingModel from "@/models/components/modals/editCourse/DeleteHeadingModel";
import chest from "@/utils/chest";
import { getUrlPart } from "@/utils/helpers";
import DeleteHeadingModal from "@/views/components/modal/editCourse/DeleteHeadingModal";

export default class DeleteHeadingController{
    
    /**@param {DeleteHeadingModal} view*/
    constructor(view){
        this.view = view;
        this.model = new DeleteHeadingModel();
    }
    
    onCancel=()=>{
        chest.ModalLayout.closeAndDelete(1);
    }

    onDelete=()=>{

        let heading = this.view.props.heading;

        this.view.setState({delete_loading:true});

        let params = {
            course_id: getUrlPart(3),
            heading_id: heading.id,
        }

        this.model.delete(params, (err, data)=>{

            if(data.result_code === env.SC.SUCCESS){

                chest.openNotification("سرفصل مورد نظر حذف شد.", "success");
                
                let EditCourseContents = this.view.props.parent;

                let EditCourse = EditCourseContents.props.parent;

                EditCourse.state.new_values.headings = EditCourse.state.new_values.headings.filter((v,i)=>{

                    if(v.id === params.heading_id){
                        return false
                    }
                    return true;

                });

                EditCourse.state.new_values.content_hierarchy.children = EditCourse.state.new_values.content_hierarchy.children.filter((v,i)=>{

                    if(v.id === params.heading_id){
                        return false
                    }
                    return true;
                });

                EditCourse.state.old_values.headings = EditCourse.state.new_values.headings.map(e=>e);

                EditCourse.state.old_values.content_hierarchy.children = EditCourse.state.new_values.content_hierarchy.children.map(e=>e);

                //set EditContent status to idle
                EditCourse.state.status.content_hierarchy = "idle";

                EditCourse.setState(EditCourse.state, ()=>{

                    //save new content_hierarchy which includes new heading
                    let params = {
                        course_id : getUrlPart(3),
                        hierarchy: EditCourse.state.new_values.content_hierarchy,
                    }
        
                    EditCourseContents.controller.model.save(params, (err, data)=>{
        
                        if(data.result_code === env.SC.SUCCESS){

                            this.view.setState({delete_loading:false});
        
                            this.onCancel();
                        }
                    });
                });


            }
        })
    }
    
}