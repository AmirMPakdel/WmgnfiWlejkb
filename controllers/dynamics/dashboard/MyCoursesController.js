import MyCoursesModel from "@/models/dynamics/dashboard/MyCoursesModel";
import MyCourses from "@/views/dynamics/dashboard/MyCourses";

export default class MyCoursesController{
    
    /**@param {MyCourses} view*/
    constructor(view){
        this.view = view;
        this.model = new MyCoursesModel();
    }
    
    load=()=>{

        
        this.view.setState({loading:true});

        let params = {
            page_count: this.view.state.currentPage,
            chunk_count: this.view.state.pageSize,
            filters:null,
            sorting_mode: "sm_newest", //TODO
        }

        this.model.getCourses(params, (err, data)=>{

            if(data.result_code === env.SC.SUCCESS){

                let d = data.data;

                this.view.setState({
                    loading:false,
                    list: d.list,
                    total: d.total_size,
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

        this.setupPageTitle();
    }

    setupPageTitle(){
        
        document.title = "دوره های من "+" | داشبورد کاربر"+" | مینفو";
    }
}
