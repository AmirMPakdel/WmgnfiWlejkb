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

            let params = {};

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

        let p = this.view.props.parent;
        let ov = p.state.old_values;
        let ve = [];

        if(ov.contents.length < env.LIMITS.MIN_VALID_CONTENTS_PUBLISH){
            ve.push("(محتویات دوره) " + "برای انتشار می بایست حداقل "+env.LIMITS.MIN_VALID_CONTENTS_PUBLISH+" محتوا برای دوره خود بارگذاری نمایید.");
        }

        if(!ov.logo){
            ve.push("بارگذاری لوگوی دوره الزامی است.");
        }

        if(!ov.cover){
            ve.push("بارگذاری عکس پس زمینه دوره الزامی است.");
        }

        if(!ov.intro_video || !ov.intro_video.id){
            ve.push("بارگذاری فیلم معرفی دوره الزامی است.");
        }

        if(!ov.educators.length){
            ve.push("برای هر دوره وارد کردن حداقل یک مدرس الزامی است.");
        }

        if(!ov.duration){
            ve.push("مدت زمان دوره می بایست حداقل "+ env.LIMITS.MIN_VALID_COURSE_DURATION+" ساعت باید.")
        }


        p.setState({validation_errors:ve});

        return ve.length===0;
    }
    
}