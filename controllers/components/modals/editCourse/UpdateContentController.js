import UpdateContentModel from "@/models/components/modals/editCourse/UpdateContentModel";
import chest from "@/utils/chest";
import { getUrlPart } from "@/utils/helpers";
import UpdateContentModal from "@/views/components/modal/editCourse/UpdateContentModal";

export default class UpdateContentController{
    
    /**@param {UpdateContentModal} view*/
    constructor(view){
        this.view = view;
        this.model = new UpdateContentModel();
    }
    
    onCancel(){

        chest.ModalLayout.closeAndDelete(1);
    }

    onInput(t){

        this.view.setState({content_title:t}, this.continueCheck);
    }

    continueCheck=()=>{

        let can = true;
        let s = this.view.state;
        
        if(s.content_title.length < 4){
            can = false;
        }

        this.view.setState({can_continue:can});
    }

    update(){
        
        let s = this.view.state;
        let heading = this.view.props.heading;
        let content = this.view.props.content;

        if(!s.can_continue){return};

        this.view.setState({update_loading:true});

        let params = {
            course_id: getUrlPart(3),
            content_id: content.id,
            title: s.content_title,
            file_state:"ufs_no_change",
            is_free: content.is_free,
        }

        console.log(content.type);

        this.model.update(params, content.type, (err, data)=>{

            if(data.result_code === env.SC.SUCCESS){

                chest.openNotification("محتوای موردنظر ویرایش شد.", "success");
                
                let EditCourseContents = this.view.props.parent;

                let EditCourse = EditCourseContents.props.parent;

                EditCourse.state.new_values.contents.forEach((v,i)=>{

                    if(v.id === params.content_id){
                        v.title = params.title;
                    }
                })

                EditCourse.state.new_values.content_hierarchy.children.forEach((v1,i1)=>{

                    if(v1.id === heading.id){
                        
                        v1.children.forEach((v2,i2)=>{

                            if(v2.id === params.content_id){

                                v2.title = params.title;
                            }
                        });
                    }
                })

                EditCourse.state.old_values.contents = EditCourse.state.new_values.contents.map(e=>e);

                EditCourse.state.old_values.content_hierarchy.children = EditCourse.state.new_values.content_hierarchy.children.map(e=>e);

                EditCourse.setState(EditCourse.state, ()=>{
        
                    this.view.setState({update_loading:false});
        
                    this.onCancel();
                });
            }
        })
    }
    
}