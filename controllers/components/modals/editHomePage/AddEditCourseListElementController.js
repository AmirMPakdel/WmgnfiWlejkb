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
}

const generateTitle = (vs)=>{

    return vs.ordering_item.title;
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