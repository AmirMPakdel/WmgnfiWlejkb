import React, { Component } from "react";
import EditCourseController from "@/controllers/dynamics/dashboard/EditCourseController";
import EditCourseBackground from "@/views/components/editCourse/EditCourseBackground";
import EditCourseEducators from "@/views/components/editCourse/EditCourseEducators";
import EditCourseIntroVideo from "@/views/components/editCourse/EditCourseIntroVideo";
import EditCourseLogo from "@/views/components/editCourse/EditCourseLogo";
import EditCourseTitle from "@/views/components/editCourse/EditCourseTitle";
import Loading from "@/views/components/global/Loading";
import EducatorDashboardLayout from "@/views/layouts/EducatorDashboardLayout";
import styles from "./EditCourse.module.css";
import EditCoruseDuration from "@/views/components/editCourse/EditCourseDuration";
import EditCourseHoldingStatus from "@/views/components/editCourse/EditCourseHoldingStatus";
import EditCourseLongDesc from "@/views/components/editCourse/EditCourseLongDesc";
import EditCourseShortDesc from "@/views/components/editCourse/EditCourseShortDesc";
import EditCoursePrice from "@/views/components/editCourse/EditCoursePrice";
import EditCourseDiscountPrice from "@/views/components/editCourse/EditCourseDiscountPrice";
import EditCourseReleaseDate from "@/views/components/editCourse/EditCourseReleaseDate";
import EditCourseSuggestedCourses from "@/views/components/editCourse/EditCourseSuggestedCourses";
import EditCourseSuggestedPosts from "@/views/components/editCourse/EditCourseSuggestedPosts";
import EditCourseSubjects from "@/views/components/editCourse/EditCourseSubjects";
import EditCourseRequirements from "@/views/components/editCourse/EditCourseRequirements";
import EditCourseGroups from "@/views/components/editCourse/EditCourseGroups";
import EditCourseTags from "@/views/components/editCourse/EditCourseTags";
import EditCourseContents from "@/views/components/editCourse/EditCourseContents";
import PublishRequest from "@/views/components/editCourse/PublishRequest";
import MainButton from "@/views/components/global/MainButton";
import { getUrlPart } from "@/utils/helpers";

export default class EditCourse extends Component {

    constructor(props){
        super(props);

        this.controller = new EditCourseController(this);

        this.state = {

            loading:true,

            old_values:{
                title:"",
                g1:null,
                g2:null,
                g3:null,
                logo:"",
                cover:"",
                intro_video:"",
                educators:[],
                duration:"",
                holding_status:"",
                short_desc:"",
                long_desc:"",
                price:"",
                discount_price:"",
                subjects:[],
                requirements:[],

                headings:[],
                contents:[],
                content_hierarchy:"",
            },

            new_values:{

                validation_status:"",
                validation_status_message:[],

                title:"",
                g1:null,
                g2:null,
                g3:null,
                logo:"",
                cover:"",
                intro_video:"",
                educators:[],
                duration:"",
                holding_status:"",
                short_desc:"",
                long_desc:"",
                price:"",
                discount_price:"",
                subjects:[],
                requirements:[],
                headings:[],
                contents:[],
                content_hierarchy:"",
            },

            status:{
                title:"idle",
                groups:"idle",
                logo:"idle",
                cover:"idle",
                intro_video:"idle",
                educators:"idle",
                duration:"idle",
                holding_status:"idle",
                short_desc:"idle",
                long_desc:"idle",
                price:"idle",
                discount_price:"idle",
                subjects:"idle",
                requirements:"idle",
                headings:"idle",
                contents:"idle",
                content_hierarchy:"idle",
            },

            validation_errors:[],
        }
    }

    componentDidMount(){

        this.controller.loadCourse();
    }

    onPreview=()=>{

        if(this.preview_win && this.preview_win.location && this.preview_win.location.reload){
            this.preview_win.location.reload();
            this.preview_win.focus();
        }else{
            let c_id = getUrlPart(3);
            this.preview_win = window.open(env.PATHS.USER_PREVIEW_COURSE + c_id);
        }
    }
    
    render(){
        return(
            <EducatorDashboardLayout accessType="userL1"
            showWithoutAuth={false}>

            {
                this.state.loading?
                <Loading style={{minHeight:"80vh"}}/>:
                <>

                    <div style={{marginTop:"1rem"}}/>

                    <MainButton className={styles.preview_btn+" sm_card_shd"}
                    title={"پیش نمایش"}
                    onClick={this.onPreview}/>

                    <PublishRequest parent={this}/>

                    <EditCourseContents parent={this}/>
                    
                    <EditCourseTitle parent={this}/>

                    <EditCourseGroups parent={this}/>

                    <EditCourseLogo parent={this}/>

                    <EditCourseBackground parent={this}/>

                    <EditCourseIntroVideo parent={this}/>

                    <EditCourseEducators parent={this}/>

                    <EditCoruseDuration parent={this}/>

                    {/* <EditCourseHoldingStatus parent={this}/> */}

                    <EditCourseShortDesc parent={this}/>

                    <EditCourseLongDesc parent={this}/>

                    <EditCoursePrice parent={this}/>

                    <EditCourseDiscountPrice parent={this}/>

                    <EditCourseSubjects parent={this}/>

                    <EditCourseRequirements parent={this}/>

                    {/* <EditCourseTags parent={this}/> */}

                    {/* <EditCourseReleaseDate parent={this}/> */}

                    {/* <EditCourseSuggestedCourses parent={this}/> */}

                    {/* <EditCourseSuggestedPosts parent={this}/> */}

                    <div style={{marginTop:"8rem"}}/>

                </>
            }

            </EducatorDashboardLayout>
        )
    }
}