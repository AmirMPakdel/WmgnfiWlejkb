import AddContentModel from "@/models/components/modals/editCourse/AddContentModel";
import chest from "@/utils/chest";
import { getCookie } from "@/utils/cookie";
import { fileType2Ext, getUrlPart } from "@/utils/helpers";
import AddContentModal from "@/views/components/modal/editCourse/AddContentModal";

export default class AddContentController{
    
    /**@param {AddContentModal} view*/
    constructor(view){
        this.view = view;
        this.model = new AddContentModel();
    }
    
    onCancel=()=>{
        chest.ModalLayout.closeAndDelete(2);
    }

    onInput=(t)=>{
        this.view.setState({title:t}, this.checkContinue);
    }

    checkContinue=()=>{

        let can = true;
        if(this.view.state.title.length < 4){
            can = false;
        }

        this.view.setState({can_continue:can})
    }
    
    onCreate=()=>{

        this.view.setState({status:"uploading"});

        let file = this.view.state.file;

        let params1={
            file_size:file.size,
            file_type: fileType2Ext(file.type),
            token: getCookie(env.TOKEN_KEY),
            course_id: getUrlPart(3),
            upload_type: contentType2UT(this.view.props.type, this.view.state.is_free),
        }

        this.model.getUploadKey(params1, (err, data)=>{

            if(data.result_code === env.SC.SUCCESS){

                let params2 = {
                    token: params1.token,
                    file_type: params1.file_type,
                    upload_type: params1.upload_type,
                    course_id: getUrlPart(3),
                    tenant: getCookie(env.TENANT_KEY),
                    upload_key: data.data.upload_key,
                }

                this.checkUploadKey(file, params1, params2);
            }
        });
    }

    checkUploadKey(file, params1, params2){

        this.model.checkUploadKey(params2, (err, data)=>{

            if(data.result_code === env.CSC.SUCCESS){

                let params3 = {
                    mfile: file,
                    tenant: params2.tenant,
                    upload_id: data.data.upload_id,
                    upload_key: params2.upload_key,
                }

                this.uploadFile(params3, params2);
            }
        });
    }

    onUploadProgress=(progressEvent)=>{

        console.log(progressEvent);

        let {loaded, total} = progressEvent;

        this.view.setState({
            upload_percent: Math.floor((loaded*100)/total)
        });
    }

    uploadFile(params3, params2){

        this.model.uploadFile(params3, this.onUploadProgress, (err, data)=>{

            if(data.result_code === env.CSC.SUCCESS){

                let params4 = {
                    upload_key:params3.upload_key,
                    course_id: getUrlPart(3),
                    title: this.view.state.title,
                    is_free: this.view.state.is_free,
                }

                params4.file_state = "ufs_new";

                params4.type = this.view.props.type;

                try{
                    this.save(params4, params3, params2);
                }catch(e){
                    console.log(e);
                }
            }
        });
    }

    save(params4, params3, params2){

        this.model.save(params4, (err, data)=>{

            if(data.result_code === env.SC.SUCCESS){

                chest.openNotification(contentType2SuccessMessage(this.view.props.type), "success");

                let EditCourseContents = this.view.props.parent;
                let EditCourse = EditCourseContents.props.parent;
                console.log(EditCourse.state);
                console.log(this.view.props.heading);

                EditCourse.state.new_values.contents.push({
                    id:data.data.content_id,
                    url: params4.upload_key,
                    title: params4.title,
                    type: contentType2CT(this.view.props.type),
                    is_free: params4.is_free,
                    size: this.view.state.file.size,
                });

                console.log(EditCourse.state.new_values.contents);

                EditCourse.state.new_values.content_hierarchy.children.forEach((v1,i1)=>{

                    if(v1.id === this.view.props.heading.id){

                        v1.children.push({id:data.data.content_id, title:this.view.state.title})
                    }
                });

                EditCourse.state.old_values.contents = EditCourse.state.new_values.contents.map(e=>e);

                console.log(EditCourse.state.old_values.contents);

                EditCourse.state.old_values.content_hierarchy.children = EditCourse.state.new_values.content_hierarchy.children.map(e=>e);

                //set EditContent status to idle
                EditCourse.state.status.content_hierarchy = "idle";

                EditCourse.setState(EditCourse.state, ()=>{

                    //save new content_hierarchy which includes new heading
                    let params = {
                        course_id : getUrlPart(3),
                        hierarchy: EditCourse.state.new_values.content_hierarchy,
                    }
        
                    EditCourseContents.controller.model.save(params, (err, data)=>{
        
                        if(data.result_code === env.SC.SUCCESS){

                            this.view.setState({upload_loading:false});
        
                            chest.ModalLayout.closeAndDelete(2);
                        }
                    });
                });
            }
        });
    }
}

function contentType2UT(type, is_free){

    switch(type){
        case "video":{
            if(is_free){
                return env.UT.UPLOAD_TYPE_COURSE_VIDEO_FREE;
            }
            return env.UT.UPLOAD_TYPE_COURSE_VIDEO;
        }
        case "audio":{
            if(is_free){
                return env.UT.UPLOAD_TYPE_COURSE_VOICE_FREE;
            }
            return env.UT.UPLOAD_TYPE_COURSE_VOICE;
        }
        case "text":{
            if(is_free){
                return env.UT.UPLOAD_TYPE_COURSE_DOCUMENT_FREE;
            }
            return env.UT.UPLOAD_TYPE_COURSE_DOCUMENT;
        }
    }
}

function contentType2SuccessMessage(type){

    switch(type){
        case "video":{

            return "محتوای ویدیویی موردنظر با موفقیت بارگذاری و ایجاد شد."
        }
        case "audio":{

            return "محتوای صوتی موردنظر با موفقیت بارگذاری و ایجاد شد."
        }
        case "text":{

            return "محتوای متنی موردنظر با موفقیت بارگذاری و ایجاد شد."
        }
    }
}

function contentType2CT(type){

    switch(type){
        case "video":{

            return env.CT.CONTENT_TYPE_VIDEO;
        }
        case "audio":{

            return env.CT.CONTENT_TYPE_VOICE;
        }
        case "text":{

            return env.CT.CONTENT_TYPE_DOCUMENT;
        }
    }
}