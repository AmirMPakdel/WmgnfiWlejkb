import DeleteContentModel from "@/models/components/modals/editCourse/DeleteContentModel";
import chest from "@/utils/chest";
import { getUrlPart } from "@/utils/helpers";
import DeleteContentModal from "@/views/components/modal/editCourse/DeleteContentModal";

export default class DeleteContentController{
    
    /**@param {DeleteContentModal} view*/
    constructor(view){
        this.view = view;
        this.model = new DeleteContentModel();
    }
    
    onCancel=()=>{
        chest.ModalLayout.closeAndDelete(1);
    }

    onDelete=()=>{

        let heading = this.view.props.heading;
        let content = this.view.props.content;

        this.view.setState({delete_loading:true});

        let params = {
            course_id: getUrlPart(3),
            content_id: content.id,
        }

        //when deleting the new created content, content.type is not defined
        if(!content.type){
            content = findContentById(content.id, this.view.props.parent.props.parent.state.new_values);
        }

        console.log("delete content", content);

        this.model.delete(params, content.type, (err, data)=>{

            if(data.result_code === env.SC.SUCCESS){

                chest.openNotification("محتوای مورد نظر حذف شد.", "success");
                
                try{
                let EditCourseContents = this.view.props.parent;

                let EditCourse = EditCourseContents.props.parent;

                EditCourse.state.new_values.contents = EditCourse.state.new_values.contents.filter((v,i)=>{

                    if(v.id === params.content_id){
                        return false
                    }
                    return true;

                });

                EditCourse.state.new_values.content_hierarchy.children.forEach((v1,i1)=>{

                    if(v1.id === heading.id){

                        v1.children = v1.children.filter((v2,i2)=>{

                            if(v2.id === params.content_id){
                                return false;
                            }
                            return true;
                        });
                    }
                });

                EditCourse.state.old_values.contents = EditCourse.state.new_values.contents.map(e=>e);

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
                }catch(e){console.log(e);}

            }
        })
    }
    
}

function findContentById(c_id, nw){

    let content = {};

    nw.contents.forEach((v)=>{

        if(v.id == c_id){

            content = v;
        }
    })

    return content;
}