import AddEditInfoBoxElementModel from "@/models/components/modals/editHomePage/AddEditInfoBoxElementModel";
import chest from "@/utils/chest";
import { getCookie } from "@/utils/cookie";
import { fileType2Ext } from "@/utils/helpers";
import myServer from "@/utils/myServer";
import AddEditInfoBoxElementModal from "@/views/components/modal/editHomePage/AddEditInfoBoxElementModal";

export default class AddEditInfoBoxElementController{
    
    /**@param {AddEditInfoBoxElementModal} view*/
    constructor(view){
        this.view = view;
        this.model = new AddEditInfoBoxElementModel();
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

            let params = {
                mode: v.props.mode,
                title: vs.title,
                text: vs.text,
                has_link: vs.has_link,
                visible: true,
            }

            if(vs.has_link){

                params.link = vs.link_url;
                params.link_title = vs.link_title;
            }

            if(vs.media_type == "image"){

                params.type = env.CT.CONTENT_TYPE_IMAGE;
                params.upload_key = vs.upload_key;

                this.saveMediaType(params);

            }else if(vs.media_type == "video"){

                params.type = env.CT.CONTENT_TYPE_VIDEO;
                params.upload_key = vs.upload_key;

                this.saveMediaType(params);

            }else{

                params.type = env.CT.CONTENT_TYPE_NONE;

                this.saveNoMediaType(params);
            }

        }else{

            console.log("not valid")
        }
    }

    inputCheck(){

        let v = this.view;
        let vs = v.state;
        let valid = true;

        if(!vs.text.length){
            valid=false;
            vs.text_error = "متن توضیحات را پر کنید.";
        }else{
            vs.text_error = false;
        }

        if(vs.media_type=="image"){

            if(!v.UploadMedia.getFile()){
                valid=false;
                let message = "تصویری برای بارگذاری انتخاب نشده است.";
                chest.openNotification(message, "error");
            }
            
        }else if(vs.media_type==="video"){

            if(!v.UploadMedia.getFile()){
                valid=false;
                let message = "ویدیویی برای بارگذاری انتخاب نشده است.";
                chest.openNotification(message, "error");
            }

        }else if(vs.media_type==="none"){

            if(!vs.title.length){
                valid=false;
                vs.title_error = "عنوان در این حالت نمی تواند خالی باشد.";
            }else{
                vs.title_error = false;
            }
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

        v.setState(vs);

        return valid;
    }

    saveNoMediaType(params){

        let v = this.view;

        this.model.save(params, (err, data)=>{

            if(data.result_code === env.SC.SUCCESS){

                v.setState({confirm_loading:false}, ()=>{

                    this.onCancel();

                    v.props.parent.reload();
                });
            }

        });
    }

    saveMediaType(params){

        this.getUploadKey(params, (upload_key)=>{

            let v = this.view;
            params.upload_key = upload_key;

            this.model.save(params, (err, data)=>{

                if(data.result_code === env.SC.SUCCESS){

                    v.setState({confirm_loading:false}, ()=>{

                        this.onCancel();

                        v.props.parent.reload();
                    });
                }

            });

        });
    }

    getUploadKey(params, cb){

        let v = this.view;
        let file = v.UploadMedia.getFile();

        let upload_type=null;

        if(params.type == env.CT.CONTENT_TYPE_IMAGE){
            
            upload_type = env.UT.UPLOAD_TYPE_MAIN_PAGE_IMAGE;

        }else if(params.type == env.CT.CONTENT_TYPE_VIDEO){

            upload_type = env.UT.UPLOAD_TYPE_MAIN_PAGE_VIDEO;
        }

        let params1={
            file_size:file.size,
            file_type: fileType2Ext(file.type),
            token: getCookie(env.TOKEN_KEY),
            upload_type,
        }

        //TODO:: check if upload_type is correct

        //TODO:: check if old upload key exists
        // if(this.view.props.parent.state.old_values.logo){
        //     params1.old_upload_key = this.view.props.parent.state.old_values.logo;
        // }

        this.model.getUploadKey(params1, (err, data)=>{

            if(data.result_code === env.SC.SUCCESS){

                let params2 = {
                    token: params1.token,
                    file_type: params1.file_type,
                    upload_type: params1.upload_type,
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