import EditSitesIconModel from "@/models/components/modals/settings/EditSitesIconModel";
import chest from "@/utils/chest";
import { getCookie } from "@/utils/cookie";
import EditSitesIconModal from "@/views/components/modal/settings/EditSitesIconModal";

export default class EditSitesIconController{
    
    /**@param {EditSitesIconModal} view*/
    constructor(view){
        this.view = view;
        this.model = new EditSitesIconModel();
    }

    checkImage(){

        let params = {
            url:"https://upload.wikimedia.org/wikipedia/commons/f/fb/Adobe_Illustrator_CC_icon.svg",
        }
        this.model.checkImage(params, (exists)=>{

            if(exists){
                this.view.state.image_src=params.url;
            }

            this.view.setState({loading:false}, ()=>{

                this.view.input.onchange= this.onFile;
            });
        });
    }
    
    onFile=(event)=>{

        let maxSize = 1;

        let file = event.target.files[0];

        if(!file) return;

        if(file.size < ((maxSize)*1024*1024)){
            
            let url = URL.createObjectURL(file);

            let img = new Image();

            img.src = url;

            img.onload = ()=>{

                this.view.state.file = file;

                this.view.state.image_src = img.src;

                this.view.setState(this.view.state);
            }

        }else{
            
            chest.openNotification("اندازه فایل نباید بیشتر از "+maxSize+" مگابایت باشد.", "error");
        }
    }

    onConfirm(){

        if(this.view.state.file){

            this.view.setState({loading_btn:true});

            this.uploadImage();

        }else{
            
            chest.openNotification("لطفا یک فایل عکس برای لوگوی سایت انتخاب نمایید.", "error")
        }
    }

    uploadImage(){

        let vs = this.view.state;

        let params = {
            mfile: vs.file,
        }

        params.tenant = getCookie(env.TENANT_KEY);

        this.model.uploadIcon(params, (err, data)=>{

            if(data.result_code === env.CSC.SUCCESS){
                
                chest.ModalLayout.closeAndDelete(1);

            }else{

                this.view.setState({loading_btn:false});
            }
        });
    }
}