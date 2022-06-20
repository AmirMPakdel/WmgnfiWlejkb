import AddEditCourseListElementModel from "@/models/components/modals/editHomePage/AddEditCourseListElementModel";
import chest from "@/utils/chest";
import AddEditCourseListElementModal from "@/views/components/modal/editHomePage/AddEditCourseListElementModal";

export default class AddEditCourseListElementController{
    
    /**@param {AddEditCourseListElementModal} view*/
    constructor(view){
        this.view = view;
        this.model = new AddEditCourseListElementModel();
    }

    onCancel(){

        chest.ModalLayout.closeAndDelete(1);
    }
    
    onConfirm(){
        
        let valid = this.inputCheck()

        let v = this.view;
        let vs = v.state;

        if(valid){

            v.setState({confirm_loading:true});

            let params = {
                title: generateTitle(vs),
                default_type: vs.ordering_item.id,
            }

            if(vs.active_grouping){

                params.groups = generateGroupingObj(vs.checkedGroupKey);
            }else{
                params.groups = {g1:null,g2:null,g3:null}
            }

            params.mode = v.props.mode;

            this.model.save(params, (err, data)=>{

                if(data.result_code === env.SC.SUCCESS){

                    this.onCancel();

                    v.props.parent.reload();
                }

                v.setState({confirm_loading:false});
            });
        }
    }

    inputCheck(){

        let valid = true;
        let v = this.view;
        let vs = v.state;

        if(!vs.ordering_item){

            valid=false;
            chest.openNotification("ترتیب نمایش لیست را مشخص نمایید.", "error");
        }

        if(vs.active_grouping && !vs.checkedGroupKey[0]){

            valid=false;
            chest.openNotification("درصورت فعال کردن فیلتر دسته بندی باید دسته بندی موردنظرتان را انتخاب نمایید.", "error");
        }

        return valid;
    }

    extractSelectedGroups (group, groupList){

        let key = group;
        
        if(!key || !groupList) return [];
    
        let ids = key.split("-");
        let level = ids.length;
        let groups = [];
    
        let l1 = null;
        groupList.forEach((g1)=>{
            if(g1.id == ids[0]){
                l1 = g1;
                groups.push({id:l1.id, key:l1.id, title:l1.title});
            }
        });
    
        let l2 = null;
        if(level > 1 && l1){
            let groupL2 = l1.groups;
            groupL2.forEach((g2)=>{
                if(g2.id == ids[1]){
                    l2 = g2;
                    groups.push({id:l2.id, key:l1.id+"-"+l2.id, title:l2.title});
                }
            });
        }
    
        if(level > 2 && l2){
            let l3 = null;
            let groupL3 = l2.groups;
            groupL3.forEach((g3)=>{
                if(g3.id == ids[2]){
                    l3 = g3;
                    groups.push({id:l3.id, key:l1.id+"-"+l2.id+"-"+l3.id, title:l3.title});
                }
            });
        }
    
        return groups;
    }
}

const generateTitle = (vs)=>{

    if(vs.active_grouping){

        let part1 = vs.ordering_item.title.split("ها")[0];

        let part2 = vs.selected_title;

        return part1+"دوره‌های "+part2;

    }else{

        return vs.ordering_item.title;
    }
    
}

const generateGroupingObj = (keys)=>{

    let key = keys[0];

    let groups_arr = key.split("-");

    let obj = {
        g1: groups_arr[0] || null,
        g2: groups_arr[1] || null,
        g3: groups_arr[2] || null,
    };

    return obj;
}

