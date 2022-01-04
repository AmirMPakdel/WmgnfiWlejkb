import PublishRequest from "@/views/components/editCourse/PublishRequest";
import PublishRequestModel from "@/models/components/editCourse/PublishRequestModel";

export default class PublishRequestController{
    
    /**@param {PublishRequest} view*/
    constructor(view){
        this.view = view;
        this.model = new PublishRequestModel();
    }
    
    onRequest=()=>{

        let can = this.continueCheck();

        if(can){

            this.view.setState({request_loading:true});

            this.model.sendRequest(params, (err, data)=>{

                if(data.result_code === env.SC.SUCCESS){

                    let EditCourse = this.view.props.parent;
                    EditCourse.state.new_values.validation_status = "is_checking";
                    this.view.setState({request_loading:true}, ()=>{
                        EditCourse.setState({new_values: EditCourse.state.new_values});
                    });
                }
            });
        }
    }

    continueCheck=()=>{

        let can = true;
        let completion_errors = [];

        //TODO: check the whole edit course data

        this.view.setState({completion_errors});

        return can;
    }
    
}