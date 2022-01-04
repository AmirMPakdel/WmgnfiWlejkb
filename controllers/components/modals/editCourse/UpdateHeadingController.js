import UpdateHeadingModal from "@/views/components/modal/editCourse/UpdateHeadingModal";
import UpdateHeadingModel from "@/models/components/modals/editCourse/UpdateHeadingModel";
import chest from "@/utils/chest";
import { getUrlPart } from "@/utils/helpers";

export default class UpdateHeadingController{
    
    /**@param {UpdateHeadingModal} view*/
    constructor(view){
        this.view = view;
        this.model = new UpdateHeadingModel();
    }
    
    onCancel(){

        chest.ModalLayout.closeAndDelete(1);
    }

    onInput(t){

        this.view.setState({heading:t}, this.continueCheck);
    }

    continueCheck=()=>{

        let can = true;
        let s = this.view.state;
        
        if(s.heading.length < 4){
            can = false;
        }

        this.view.setState({can_continue:can});
    }

    update(){
        
        let s = this.view.state;

        if(!s.can_continue){return};

        this.view.setState({update_loading:true});

        let params = {
            course_id: getUrlPart(3),
            heading_id: this.view.props.heading.id,
            title: s.heading,
        }

        this.model.update(params, (err, data)=>{

            if(data.result_code === env.SC.SUCCESS){

                chest.openNotification("سرفصل موردنظر ویرایش شد.", "success");
                
                let EditCourseContents = this.view.props.parent;

                let EditCourse = EditCourseContents.props.parent;

                EditCourse.state.new_values.headings = EditCourse.state.new_values.headings.map((v,i)=>{

                    if(v.id === params.heading_id){
                        v.title = params.title;
                    }
                    return v;
                })

                EditCourse.state.new_values.content_hierarchy.children = EditCourse.state.new_values.content_hierarchy.children.map((v,i)=>{

                    if(v.id === params.heading_id){
                        v.title = params.title;
                    }
                    return v;
                })

                EditCourse.state.old_values.headings = EditCourse.state.new_values.headings.map(e=>e);

                EditCourse.state.old_values.content_hierarchy.children = EditCourse.state.new_values.content_hierarchy.children.map(e=>e);

                EditCourse.setState(EditCourse.state, ()=>{
        
                    this.view.setState({update_loading:false});
        
                    this.onCancel();
                });
            }
        })
    }
    
}