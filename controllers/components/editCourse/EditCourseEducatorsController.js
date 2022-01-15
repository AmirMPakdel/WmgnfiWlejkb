import EditCourseEducators from "@/views/components/editCourse/EditCourseEducators";
import EditCourseEducatorsModel from "@/models/components/editCourse/EditCourseEducatorsModel"
import chest from "@/utils/chest";
import EducatorsCrudModal from "@/views/components/modal/educators/EducatorsCrudModal";
import { getUrlPart } from "@/utils/helpers";

export default class EditCourseEducatorsController{
    
    /**@param {EditCourseEducators} view*/
    constructor(view){
        this.view = view;
        this.model = new EditCourseEducatorsModel();
    }
    
    onEdit(){

        this.view.props.parent.state.status.educators = "edit";

        this.view.props.parent.setState(this.view.props.parent.state);
    }
    
    onCancel(){

        let p = this.view.props.parent;
        let ps = p.state;

        ps.status.educators = "idle";
        ps.new_values.educators = ps.old_values.educators;

        this.view.props.parent.setState(ps, ()=>{
            
            this.view.setState({
                selected_edu_keys : this.apiEducators2IdArray(ps.old_values.educators),
                selected_edus: ps.old_values.educators,
                educators: ps.old_values.educators,
            });
        });
    }

    onAddEducator(){
        let modal = <EducatorsCrudModal 
        selectable={true} 
        selectionType={"checkbox"}
        selectedRowKeys={this.view.state.selected_edu_keys}
        selectedRows={this.view.state.selected_edus}
        onConfirm={this.EducatorsCrudModalConfirm}
        onCancel={this.EducatorsCrudModalCancel}/>;

        chest.ModalLayout.setModal(1, modal, ()=>{
            chest.ModalLayout.visibleToggle(1, true);
        });
    }

    EducatorsCrudModalConfirm=(selected_row_keys, selected_rows)=>{

        let p = this.view.props.parent;
        p.state.new_values.educators = selected_rows;

        p.setState({
            new_values: p.state.new_values
        }, ()=>{

            this.view.setState({
                selected_edu_keys: selected_row_keys,
                selected_edus: selected_rows,
            });
        });

        chest.ModalLayout.closeAndDelete(1);
    }

    EducatorsCrudModalCancel=()=>{

        chest.ModalLayout.closeAndDelete(1);
    }

    onRemoveEducator(obj){
        
        let p = this.view.props.parent;

        if(p.state.new_values.educators.length === 1){

            chest.openNotification("دوره باید حداقل یک مدرس داشته باشد", "alert");
            return;
        }

        let new_educator = p.state.new_values.educators.filter((v,i)=>{
            if(v.id !== obj.id){return v}
        });
        
        p.state.new_values.educators = new_educator;

        p.setState({
            new_values: p.state.new_values
        }, ()=>{

            this.view.setState({
                selected_edu_keys: this.apiEducators2IdArray(new_educator),
                selected_edus: new_educator,
            });
        });
    }

    onSubmit(){
        
        let p = this.view.props.parent;
        let ps = p.state;

        let params = {
            educators: this.apiEducators2IdArray(p.state.new_values.educators),
            course_id: getUrlPart(3)
        }

        this.model.saveEducators(params, (err, data)=>{

            if(data.result_code === env.SC.SUCCESS){

                chest.openNotification("مدرسین دوره با موفقیت ویرایش شد.", "success");

                ps.status.educators = "idle";
                ps.old_values.educators = ps.new_values.educators;

                this.view.props.parent.setState(ps);

            }else{

                //this.onCancel();
            }
        })
    }


    apiEducators2SelectBoxData(edus){

        let data = [];
    
        edus.forEach((v,i)=>{
    
            data.push({
                title: v.first_name+" "+v.last_name,
                id: v.id
            })
        })
    
        return data;
    }

    apiEducators2IdArray(edus){

        let array = [];
    
        edus.forEach((v,i)=>{
            array.push(v.id)
        })
    
        return array;
    }
}