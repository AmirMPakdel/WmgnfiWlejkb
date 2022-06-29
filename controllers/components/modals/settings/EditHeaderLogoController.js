import EditHeaderLogoModel from "@/models/components/modals/settings/EditHeaderLogoModel";
import UploadFileModel from "@/models/global/UploadFileModel";
import chest from "@/utils/chest";
import { getCookie } from "@/utils/cookie";
import { fileType2Ext, getTenant } from "@/utils/helpers";
import EditHeaderLogoModal from "@/views/components/modal/settings/EditHeaderLogoModal";

export default class EditHeaderLogoController{
    
    /**@param {EditHeaderLogoModal} view*/
    constructor(view){
        this.view = view;
        this.model = new EditHeaderLogoModel();
        this.uploadModel = new UploadFileModel();
    }
    
    loadImage(){

        this.model.getHeaderLogo(null, (err, data)=>{
            
            this.view.setState({loading:false, logo:data.page_logo});
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

                this.view.setState({file, image_src: img.src});
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
            
            chest.openNotification("لطفا یک فایل عکس برای لوگوی هدر سایت انتخاب نمایید.", "error")
        }
    }

    uploadImage(){

        let vs = this.view.state;

        let params1={
            file_size: vs.file.size,
            file_type: fileType2Ext(vs.file.type),
            token: getCookie(env.TOKEN_KEY),
            upload_type: env.UT.UPLOAD_TYPE_MAIN_PAGE_LOGO
        }

        if(vs.logo){
            params1.old_upload_key = vs.logo;
        }

        this.uploadModel.getUploadKey(params1, (err1, data1)=>{

            if(data1.result_code === env.SC.SUCCESS){

                let params2 = {
                    token: params1.token,
                    file_type: params1.file_type,
                    upload_type: params1.upload_type,
                    tenant: getTenant(),
                    upload_key: data1.data.upload_key,
                }

                this.uploadModel.checkUploadKey(params2, (err2, data2)=>{

                    if(data2.result_code === env.CSC.SUCCESS){
        
                        let params3 = {
                            mfile: vs.file,
                            tenant: params2.tenant,
                            upload_id: data2.data.upload_id,
                            upload_key: params2.upload_key,
                        }
        
                        this.uploadModel.uploadFile(params3, (err3, data3)=>{

                            if(data3.result_code === env.CSC.SUCCESS){
                
                                let params4 = {
                                    upload_key:params3.upload_key,
                                }
                
                                if(vs.logo){
                                    params4.file_state = "ufs_replace";
                                }else{
                                    params4.file_state = "ufs_new";
                                }
                
                                this.model.save(params4, (err4, data4)=>{
                                    
                                    if(data4.result_code == env.SC.SUCCESS){

                                        chest.openNotification("لوگوی هدر سایت با موفقیت ویرایش شد.", "success");
                        
                                        this.view.setState({loading_btn:false, logo:params4.upload_key});
                                    }
                                });
                            }
                        });
                    }
                });
            }
        });
    }
}