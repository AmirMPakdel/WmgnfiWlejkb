import EditSitesTitlesModel from "@/models/components/modals/settings/EditSitesTitlesModel";
import chest from "@/utils/chest";
import Storage from "@/utils/storage";
import EditSitesTitlesModal from "@/views/components/modal/settings/EditSitesTitlesModal";

export default class EditSitesTitlesController{
    
    /**@param {EditSitesTitlesModal} view*/
    constructor(view){
        this.view = view;
        this.model = new EditSitesTitlesModel();
    }
    
    loadSiteTitle(){

        let v = this.view;
        
        let params = {};

        this.model.getData(params, (err, data)=>{

            let d = data;
            v.setState({
                loading:false,
                title: d.page_title,
                motto: d.motto,
            });
        });
    }

    checkInputs(){
        
        let v = this.view;
        let vs = v.state;

        if(!vs.title){

            chest.openNotification("مقدار عنوان سایت نامعتبر است.", "error");
            return false;
        }

        return true;
    }

    saveSiteInfo(){

        let v = this.view;

        let res = this.checkInputs();

        if(res){

            v.setState({confirm_loading:true});

            let params={
                title: v.state.title,
                motto: v.state.motto,
            }
            this.model.save(params, (err, data)=>{

                if(data.result_code === env.SC.SUCCESS){

                    v.setState({confirm_loading:false});
                    let site_info = {
                        page_title: params.title,
                        motto: params.motto,
                    }
                    Storage.store("site_info", site_info);
                    chest.openNotification("عنوان و شعار سایت با موفقیت ویرایش شد.", "success");
                    v.onCancel();
                }
            });
        }
    }
}