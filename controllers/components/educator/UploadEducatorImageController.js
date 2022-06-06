import UploadEducatorModel from "@/models/components/educator/UploadEducatorModel";
import chest from "@/utils/chest";
import { getCookie } from "@/utils/cookie";
import { fileType2Ext, getTenant } from "@/utils/helpers";
import UploadEducatorImage from "@/views/components/educator/UploadEducatorImage";

export default class UploadEducatorImageController{
    
    /**@param {UploadEducatorImage} view*/
    constructor(view){
        this.view = view;
        this.model = new UploadEducatorModel();
    }
    
    onFile(event){

        let maxSize = (this.view.props.maxSize?this.view.props.maxSize:1);

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

    upload(cb){

        if(!this.view.state.file){
            cb(null)
            return
        }

        let vs = this.view.state;

        let params = {
            file_size: vs.file.size,
            file_type: fileType2Ext(vs.file.type),
            upload_type:"ut_educator_image",
        }

        if(this.view.props.uploadKey){
            params.old_upload_key = this.view.props.uploadKey;
        }

        this.model.getUploadKey(params, (err, data)=>{

            if(data.result_code === env.SC.SUCCESS){
                
                this.view.setState({upload_key:data.data.upload_key}, ()=>{

                    this.checkUploadKey(cb);
                });
            }
        })
    }

    checkUploadKey(cb){

        if(!this.view.state.upload_key){return}

        let vs = this.view.state;

        let params = {
            file_size: vs.file.size,
            file_type: fileType2Ext(vs.file.type),
            upload_type:"ut_educator_image",
            upload_key: vs.upload_key,
        }

        params.tenant = getTenant();

        this.model.getUploadCheck(params, (err, data)=>{

            if(data.result_code === env.CSC.SUCCESS){

                this.view.setState({
                    upload_id: data.data.upload_id,
                }, ()=>{

                    this.uploadImage(cb);
                });
            }
        });
    }

    uploadImage(cb){

        if(!this.view.state.upload_id){return}

        let vs = this.view.state;

        let params = {
            mfile: vs.file,
            upload_id: vs.upload_id,
            upload_key: vs.upload_key,
        }

        params.tenant = getTenant();

        this.model.getUploadFile(params, (err, data)=>{

            if(data.result_code === env.CSC.SUCCESS){
                
                cb(this.view.state.upload_key);
            }
        })

    }
}