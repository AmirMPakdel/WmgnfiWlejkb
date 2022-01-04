import CreateEducatorModel from "@/models/components/modals/educators/CreateEducatorModel";
import chest from "@/utils/chest";
import Validation from "@/utils/validation";
import CreateEducatorModal from "@/views/components/modal/educators/CreateEducatorModal";

export default class CreateEducatorController{
    
    /**@param {CreateEducatorModal} CreateEducatorView*/
    constructor(CreateEducatorView){

        this.view = CreateEducatorView;

        this.model = new CreateEducatorModel();
    }

    createEducator(){

        if(this.lock)return;

        let res = this.createEducatorInputCheck();
        
        if(res){

            this.lock = true;

            this.view.setState({btn_loading:true});

            this.view.UploadEducatorImage.upload((upload_key)=>{

                let vs = this.view.state;
                let params = {
                    first_name : vs.first_name,
                    last_name : vs.last_name,
                    bio : vs.bio,
                }

                if(upload_key){
                    params.upload_key = upload_key;
                }

                this.model.creatingEducator(params, (err, data)=>{

                    this.view.setState({btn_loading:false});

                    if(data.result_code === env.SC.SUCCESS){

                        chest.openNotification("دبیر با موفقیت ایجاد شد.", "success");

                        if(chest.EducatorsCrudModal.controller && 
                            chest.EducatorsCrudModal.controller.loadEducators){
        
                            chest.EducatorsCrudModal.controller.loadEducators();
                        }

                        this.view.onCancel();

                    }else if(data.result_code === env.SC.INVALID_UPLOAD_KEY){

                        //TODO:handle this error
                        chest.openNotification("DEV::INVALID_UPLOAD_KEY", "error");

                    }else if(data.result_code === env.SC.CONVERTOR_SERVER_ISSUE_MOVING_FILE){

                        //TODO:handle this error
                        chest.openNotification("DEV::CONVERTOR_SERVER_ISSUE_MOVING_FILE", "error");
                    }

                    this.lock = false;
                });
            });
        }
    }

    createEducatorInputCheck(){

        let vs = this.view.state;
        let fn = Validation.persianName(vs.first_name);
        let ln = Validation.persianName(vs.last_name);

        let newState = {};
        let can = true;

        if(fn.valid){
            newState.first_name_error = false;
        }else{
            newState.first_name_error = fn.message;
            can = false;
        }

        if(ln.valid){
            newState.last_name_error = false;
        }else{
            newState.last_name_error = ln.message;
            can = false;
        }

        this.view.setState(newState);

        return can;
    }
}