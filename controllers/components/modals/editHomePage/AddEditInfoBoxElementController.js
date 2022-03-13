import AddEditInfoBoxElementModel from "@/models/components/modals/editHomePage/AddEditInfoBoxElementModel";
import chest from "@/utils/chest";
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

        if(vs.loading){return};
        
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

            }else if(vs.media_type == "video"){

                params.type = env.CT.CONTENT_TYPE_VIDEO;
                params.upload_key = vs.upload_key;

            }else{

                params.type = env.CT.CONTENT_TYPE_NONE;
            }

            this.model.save(params, (err, data)=>{

                if(data.result_code === env.SC.SUCCESS){

                    v.setState({confirm_loading:false}, ()=>{

                        this.onCancel();
                    });
                }

            });
        }else{
            alert("not valid")
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

        }else if(vs.media_type==="video"){

        }else if(vs.media_type==="none"){

            if(!vs.title){
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
    
}