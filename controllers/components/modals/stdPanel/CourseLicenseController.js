import CourseLicenseModel from "@/models/components/modals/stdPanel/CourseLicenseModel";
import chest from "@/utils/chest";
import CourseLicenseModal from "@/views/components/modal/stdPanel/CourseLicenseModal";

export default class CourseLicenseController{
    
    /**@param {CourseLicenseModal} view*/
    constructor(view){
        this.view = view;
        this.model = new CourseLicenseModel();
    }
    
    loadLicenseData(){
        
        let v = this.view;

        v.setState({loading: true});

        let params = {
            course_id: v.props.data.id
        }

        this.model.getLicenseData(params, (err, data)=>{

            if(data.result_code === env.SC.SUCCESS){

                v.setState({
                    loading: false,
                    info:{
                        license: "lj023jt8503kg86ls04jhtit85n403jg8i5nf94ntopbjheo04mk59",
                        device1 : 1,
                        device1_title: "PC-APackdel84751"
                    }
                });
            }
        });
    }

    copyCode(){

        let text = this.view.state.info.license;

        if (!navigator.clipboard) {

            return;
        }
      
        navigator.clipboard.writeText(text).then(()=>{
            chest.openNotification("کد خرید دوره در کلیپ بورد کپی شد.", "success");
        })
    }

    onCancel(){

        chest.ModalLayout.visibleToggle(1, false);
    }
    
}