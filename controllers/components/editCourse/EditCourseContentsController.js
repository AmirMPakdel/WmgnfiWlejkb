import EditCourseContentsModel from "@/models/components/editCourse/EditCourseContentsModel";
import chest from "@/utils/chest";
import { getUrlPart } from "@/utils/helpers";
import EditCourseContents from "@/views/components/editCourse/EditCourseContents";
import DeleteContentModal from "@/views/components/modal/editCourse/DeleteContentModal";
import DeleteHeadingModal from "@/views/components/modal/editCourse/DeleteHeadingModal";
import NewContentTypeModal from "@/views/components/modal/editCourse/NewContentTypeModal";
import NewHeadingModal from "@/views/components/modal/editCourse/NewHeadingModal";
import UpdateContentModal from "@/views/components/modal/editCourse/UpdateContentModal";
import UpdateHeadingModal from "@/views/components/modal/editCourse/UpdateHeadingModal";

export default class EditCourseContentsController{
    
    /**@param {EditCourseContents} view*/
    constructor(view){
        this.view = view;
        this.model = new EditCourseContentsModel();
    }
    
    onEdit(){
        let status = this.view.props.parent.state.status;
        status.content_hierarchy = "edit";
        this.view.props.parent.setState(status);
    }
    
    onSubmit(){

        let p = this.view.props.parent;
        let ps = p.state;
        let status = ps.status;
        
        if(_.isEqual(ps.new_values.content_hierarchy.children, ps.old_values.content_hierarchy.children)){

            status.content_hierarchy = "idle";
            p.setState({status});

        }else{
            
            status.content_hierarchy = "loading";
            p.setState({status});

            let params = {
                course_id : getUrlPart(3),
                hierarchy: ps.new_values.content_hierarchy,
            }

            this.model.save(params, (err, data)=>{

                if(data.result_code === env.SC.SUCCESS){

                    chest.openNotification("ترتیب سرفصل ها و محتویاتشان با موفقیت ویرایش شد.", "success");
                    
                    status.content_hierarchy = "idle";
                    let old_values = ps.old_values;
                    old_values.content_hierarchy.children = ps.new_values.content_hierarchy.children.map(e=>e);
                    p.setState({status, old_values});
                }
            });
        }
    }

    onCancel(){

        let p = this.view.props.parent;
        let ps = p.state;
        let status = ps.status;

        status.content_hierarchy = "idle";
        let new_values = ps.new_values;
        new_values.content_hierarchy.children = ps.old_values.content_hierarchy.children.map(e=>e);
        p.setState({status, new_values});

        p.setState(ps);
    }
    
    onAddHeading=()=>{

        let modal = <NewHeadingModal parent={this.view}/>;

        chest.ModalLayout.setModal(1, modal, ()=>{
            chest.ModalLayout.visibleToggle(1, true);
        })
    }

    onUpdateHeading=(heading_obj)=>{

        let modal = <UpdateHeadingModal heading={heading_obj} parent={this.view}/>;

        chest.ModalLayout.setModal(1, modal, ()=>{
            chest.ModalLayout.visibleToggle(1, true);
        })
    }

    onDeleteHeading=(heading_obj)=>{

        let modal = <DeleteHeadingModal heading={heading_obj} parent={this.view}/>;

        chest.ModalLayout.setModal(1, modal, ()=>{
            chest.ModalLayout.visibleToggle(1, true);
        })
    }

    onAddHeadingContent=(heading_obj)=>{

        let modal = <NewContentTypeModal heading={heading_obj} parent={this.view}/>;

        chest.ModalLayout.setModal(1, modal, ()=>{
            chest.ModalLayout.visibleToggle(1, true);
        })
    }

    onUpdateContent=(heading_obj, content_obj)=>{

        let modal = <UpdateContentModal heading={heading_obj} 
        content={content_obj} parent={this.view}/>;

        chest.ModalLayout.setModal(1, modal, ()=>{
            chest.ModalLayout.visibleToggle(1, true);
        })
    }

    onDeleteContent=(heading_obj, content_obj)=>{

        let modal = <DeleteContentModal heading={heading_obj} 
        content={content_obj} parent={this.view}/>;

        chest.ModalLayout.setModal(1, modal, ()=>{
            chest.ModalLayout.visibleToggle(1, true);
        })
    }
}