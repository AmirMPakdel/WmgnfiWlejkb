import EditIntroElementModel from "@/models/components/modals/editHomePage/EditIntroElementModel";
import chest from "@/utils/chest";
import { getCookie } from "@/utils/cookie";
import { fileType2Ext } from "@/utils/helpers";
import EditIntroElementModal from "@/views/components/modal/editHomePage/EditIntroElementModal";

export default class EditIntroElementController{
    
    /**@param {EditIntroElementModal} view*/
    constructor(view){
        this.view = view;
        this.model = new EditIntroElementModel();
    }
    
    
    onCancel(){

        chest.ModalLayout.closeAndDelete(1);
    }
    
    onConfirm(){

        let v = this.view;
        let vs = v.state;
        
        if(vs.confirm_loading){return};
        
        let valid = this.inputCheck();
        if(valid){

            v.setState({confirm_loading:true});

            let params = {template: vs.template};

            if(vs.template===1){
                params.title = vs.title;
                params.text = vs.text;
                params.has_link = vs.has_link;
            }

            if(vs.has_link && vs.template===1){
                params.link = vs.link_url;
                params.link_title = vs.link_title;
            }

            if(!v.props.data.template || !v.props.data.cover){

                params.file_state = "ufs_new";

            }else if(v.UploadMedia.getFile()){

                params.old_upload_key = v.props.data.cover;
                params.file_state = "ufs_replace";

            }else{

                params.file_state = "ufs_no_change";
                this.save(params);
                return;
            }

            this.getUploadKey(params, (upload_key)=>{

                params.upload_key = upload_key;
                this.save(params);
            });

        }else{

            console.log("not valid");
        }
    }

    inputCheck(){

        let v = this.view;
        let vs = v.state;
        let valid = true;

        if(!v.props.data.template && !v.UploadMedia.getFile()){
            valid=false;
            let message = "تصویری برای بارگذاری انتخاب نمایید.";
            chest.openNotification(message, "error");
        }

        if(vs.type===1){

            if(!vs.text.length){
                valid=false;
                vs.text_error = "متن توضیحات را پر کنید.";
            }else{
                vs.text_error = false;
            }

            if(!vs.title.length){
                valid=false;
                vs.title_error = "عنوان در این حالت نمی تواند خالی باشد.";
            }else{
                vs.title_error = false;
            }

            if(vs.has_link){

                if(!vs.link_title){
                    valid=false;
                    chest.openNotification("عنوان لینک را وارد نمایید.", "error");
                }
    
                if(!vs.link_url){
                    valid=false;
                    chest.openNotification("لینک موردنظرتان را وارد نمایید.", "error");
                }
            }
        }

        v.setState(vs);

        return valid;
    }

    save(params){

        let v = this.view;
        this.model.save(params, (err, data)=>{

            if(data.result_code === env.SC.SUCCESS){

                v.setState({confirm_loading:false}, ()=>{

                    this.onCancel();

                    chest.openNotification("بخش شروع سایت با موفقیت ویرایش شد.", "success");

                    v.props.parent.reload();
                });
            }
        });
    }

    getUploadKey(params, cb){

        let v = this.view;
        let file = v.UploadMedia.getFile();

        let upload_type = env.UT.UPLOAD_TYPE_MAIN_PAGE_COVER;

        let params_1={
            file_size:file.size,
            file_type: fileType2Ext(file.type),
            token: getCookie(env.TOKEN_KEY),
            old_upload_key: params.old_upload_key,
            upload_type,
        }

        this.model.getUploadKey(params_1, (err, data)=>{

            if(data.result_code === env.SC.SUCCESS){

                let params2 = {
                    token: params_1.token,
                    file_type: params_1.file_type,
                    upload_type: params_1.upload_type,
                    tenant: getCookie(env.TENANT_KEY),
                    upload_key: data.data.upload_key,
                }

                this.checkUploadKey(file, params2, cb);
            }
        });
    }

    checkUploadKey(file, params2, cb){

        this.model.checkUploadKey(params2, (err, data)=>{

            if(data.result_code === env.CSC.SUCCESS){

                let params3 = {
                    mfile: file,
                    tenant: params2.tenant,
                    upload_id: data.data.upload_id,
                    upload_key: params2.upload_key,
                }

                this.uploadFile(params3, cb);
            }
        });
    }

    uploadFile(params3, cb){

        this.model.uploadFile(params3, (err, data)=>{

            if(data.result_code === env.CSC.SUCCESS){

                cb(params3.upload_key);
            }
        });
    }
}