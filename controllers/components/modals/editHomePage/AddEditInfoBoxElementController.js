import AddEditInfoBoxElementModel from "@/models/components/modals/editHomePage/AddEditInfoBoxElementModel";
import myServer from "@/utils/myServer";
import AddEditInfoBoxElementModal from "@/views/components/modal/editHomePage/AddEditInfoBoxElementModal";

export default class AddEditInfoBoxElementController{
    
    /**@param {AddEditInfoBoxElementModal} view*/
    constructor(view){
        this.view = view;
        this.model = new AddEditInfoBoxElementModel();
    }
    
    onConfirm(){

        let v = this.view;
        let vs = v.state;
        let valid = this.inputCheck();
        if(valid){

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

            this.model
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

        v.setState(vs);

        return valid;
    }
    
}