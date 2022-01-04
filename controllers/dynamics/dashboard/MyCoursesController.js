import MyCoursesModel from "@/models/dynamics/dashboard/MyCoursesModel";
import MyCourses from "@/views/dynamics/dashboard/MyCourses";

export default class MyCoursesController{
    
    /**@param {MyCourses} view*/
    constructor(view){
        this.view = view;
        this.model = new MyCoursesModel();
    }
    
    load=()=>{

        try{
        this.view.setState({loading:true});

        let params = {
            page_count:1,
            chunk_count:20,
            filters:null,
            sorting_mode: "sm_newest", //TODO
        }

        this.model.getCourses(params, (err, data)=>{

            if(data.result_code === env.SC.SUCCESS){

                let d = data.data;

                this.view.setState({
                    loading:false,
                    list: d.list,
                    total_size: d.total_size,
                });

            }else if(data.result_code === env.SC.NO_DATA){

                let d = data.data;

                this.view.setState({
                    loading:false,
                    list: [],
                    total_size: 0,
                });
            }

        });

    }catch(e){console.log(e);}

    }
}
