import EditCourseGroupsModel from "@/models/components/editCourse/EditCourseGroupsModel";
import CategorySelectModel from "@/models/components/modals/global/CategorySelectModel";
import chest from "@/utils/chest";
import { getUrlPart } from "@/utils/helpers";
import Storage from "@/utils/storage";
import EditCourseGroups from "@/views/components/editCourse/EditCourseGroups";
import CategorySelectModal from "@/views/components/modal/global/CategorySelectModal";

export default class EditCourseGroupsController{
    
    /**@param {EditCourseGroups} view*/
    constructor(view){
        this.view = view;
        this.model = new EditCourseGroupsModel();
    }
    
    loadTitles(){

        let model = new CategorySelectModel();

        let key = "";
        
        let v = this.view;
        let vs = v.state;
        let p = v.props.parent;
        let ps = p.state;

        v.setState({loading:true});

        if(ps.new_values.g1){
            key += ps.new_values.g1;
        }
        if(ps.new_values.g2){
            key += "-"+ps.new_values.g2;
        }
        if(ps.new_values.g3){
            key += "-"+ps.new_values.g3;
        }

        model.getCategories({}, (err, data)=>{
            
            let group_list = data.data;

            if(ps.new_values.g1){
                let titles = extractSelectedGroupsTitle([key], group_list);
                v.selected = key;
                v.state.new_titles = titles;
                v.state.old_titles = titles;
            }
            v.setState({
                group_list,
                loading:false,
            });
        });
    }
    
    onEdit(){

        let modal = 
        <CategorySelectModal onConfirm={this.onGroupSelect}/>;
        chest.ModalLayout.setAndShowModal(1, modal);
    }

    onGroupSelect=(selected_keys)=>{

        if(!selected_keys || !selected_keys[0]){
            chest.ModalLayout.visibleToggle(1, false);
            return;
        }

        let categories = Storage.get("categories");

        let titles = extractSelectedGroupsTitle(selected_keys, categories);

        let status = this.view.props.parent.state.status;
        status.groups = "edit";
        this.view.props.parent.setState(status);

        this.view.setState({selected:selected_keys[0], new_titles: titles}, ()=>{

            chest.ModalLayout.visibleToggle(1, false);
        });
    }

    onCancel(){

        let v = this.view;
        let vs = v.state;
        v.setState({
            new_titles: vs.old_titles
        });
        let status = v.props.parent.state.status;
        status.groups = "idle";
        v.props.parent.setState(status);
    }

    onSubmit(){

        let status = this.view.props.parent.state.status;
        status.groups = "loading";
        this.view.props.parent.setState(status);

        let keys = this.view.state.selected.split("-");
        let groups = {g1: keys[0]};
        groups.g2 = keys[1]?keys[1]:null;
        groups.g3 = keys[2]?keys[2]:null;

        let params = {
            course_id: getUrlPart(3),
            groups,
        }

        this.model.save(params, (err, data)=>{

            if(data.result_code === env.SC.SUCCESS){

                chest.openNotification("دسته بندی دوره با موفقیت ویرایش شد.", "success");
                status.groups = "idle";

            }else{

                status.groups = "edit";
            }

            this.view.props.parent.setState(status);
        });
    }
}

function extractSelectedGroupsTitle (selected_keys, groupList){

    let key = selected_keys[0];
    
    if(!key) return null;

    let ids = key.split("-");
    let level = ids.length;
    let titles = [];

    let l1 = null;
    groupList.forEach((g1)=>{
        if(g1.id == ids[0]){
            l1 = g1;
            titles.push(l1.title);
        }
    });

    if(level > 1 && l1){
        let l2 = null;
        let groupL2 = l1.groups;
        groupL2.forEach((g2)=>{
            if(g2.id == ids[1]){
                l2 = g2;
                titles.push(l2.title);
            }
        });
    }

    if(level > 2 && l2){
        let l3 = null;
        let groupL3 = l2.groups;
        groupL3.forEach((g3)=>{
            if(g3.id == ids[2]){
                l3 = g3;
                titles.push(l3.title);
            }
        });
    }

    return titles;
}