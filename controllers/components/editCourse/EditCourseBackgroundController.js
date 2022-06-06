import EditCourseBackgroundModel from "@/models/components/editCourse/EditCourseBackgroundModel";
import chest from "@/utils/chest";
import { getCookie } from "@/utils/cookie";
import { fileType2Ext, getTenant, getUrlPart } from "@/utils/helpers";
import EditCourseBackground from "@/views/components/editCourse/EditCourseBackground";

export default class EditCourseBackgroundController{
    
    /**@param {EditCourseBackground} view*/
    constructor(view){
        this.view = view;
        this.model = new EditCourseBackgroundModel();
    }
    
    
    onEdit(){

        this.view.EditableImage.onEdit();
    }

    onSelect(){

        let status = this.view.props.parent.state.status;
        status.cover = "edit";
        this.view.props.parent.setState({status});
    }

    onCancel(){

        this.view.EditableImage.onCancel();

        let status = this.view.props.parent.state.status;
        status.cover = "idle";
        this.view.props.parent.setState({status});
    }

    onSubmit(image_file){

        let status = this.view.props.parent.state.status;
        status.cover = "loading";
        this.view.props.parent.setState({status});

        let params1={
            file_size:image_file.size,
            file_type: fileType2Ext(image_file.type),
            token: getCookie(env.TOKEN_KEY),
            upload_type: env.UT.UPLOAD_TYPE_MAIN_PAGE_COVER,
        }

        if(this.view.props.parent.state.old_values.cover){
            params1.old_upload_key = this.view.props.parent.state.old_values.cover;
        }

        this.model.getUploadKey(params1, (err, data)=>{

            if(data.result_code === env.SC.SUCCESS){

                let params2 = {
                    token: params1.token,
                    file_type: params1.file_type,
                    upload_type: params1.upload_type,
                    course_id: getUrlPart(3),
                    tenant: getTenant(),
                    upload_key: data.data.upload_key,
                }

                this.checkUploadKey(image_file, params1, params2);
            }
        });
    }

    checkUploadKey(image_file, params1, params2){

        this.model.checkUploadKey(params2, (err, data)=>{

            if(data.result_code === env.CSC.SUCCESS){

                let params3 = {
                    mfile: image_file,
                    tenant: params2.tenant,
                    upload_id: data.data.upload_id,
                    upload_key: params2.upload_key,
                }

                this.uploadFile(params3);
            }
        });
    }

    uploadFile(params3){

        this.model.uploadFile(params3, (err, data)=>{

            if(data.result_code === env.CSC.SUCCESS){

                let params4 = {
                    upload_key:params3.upload_key,
                    course_id: getUrlPart(3),
                }

                if(this.view.props.parent.state.old_values.cover){
                    params4.file_state = "ufs_replace";
                }else{
                    params4.file_state = "ufs_new"
                }

                this.save(params4);
            }
        })
    }

    save(param4){

        this.model.save(param4, (err, data)=>{

            chest.openNotification("تصویر پس زمینه دوره با موفقیت ویرایش شد.", "success");

            let status = this.view.props.parent.state.status;
            status.cover = "idle";
            this.view.props.parent.setState({status});
        });
    }

}