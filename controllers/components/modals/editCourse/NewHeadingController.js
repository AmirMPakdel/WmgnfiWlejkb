import NewHeadingModel from "@/models/components/modals/editCourse/NewHeadingModel";
import chest from "@/utils/chest";
import { getUrlPart } from "@/utils/helpers";
import NewHeadingModal from "@/views/components/modal/editCourse/NewHeadingModal";

export default class NewHeadingController{
    
    /**@param {NewHeadingModal} view*/
    constructor(view){
        this.view = view;
        this.model = new NewHeadingModel();
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
    
    create(){
        
        let s = this.view.state;

        if(!s.can_continue){return};

        this.view.setState({create_loading:true});

        let params = {
            course_id: getUrlPart(3),
            title: s.heading,
        }

        this.model.save(params, (err, data)=>{

            if(data.result_code === env.SC.SUCCESS){

                chest.openNotification("سرفصل جدید ایجاد شد.", "success");
                
                let EditCourseContents = this.view.props.parent;

                let EditCourse = EditCourseContents.props.parent;

                EditCourse.state.new_values.headings.push({id:data.data.heading_id, title: params.title});

                EditCourse.state.new_values.content_hierarchy.children.push({id:data.data.heading_id, title: params.title, children:[]});

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

                            this.view.setState({create_loading:false});
        
                            this.onCancel();
                        }
                    });
                });
            }
        })
    }
    
}