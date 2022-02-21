import MyRecieptsModel from "@/models/dynamics/stdPanel/MyRecieptsModel";
import MyReciepts from "@/views/dynamics/stdPanel/MyReciepts";

export default class MyRecieptsController{
    
    /**@param {MyReciepts} view*/
    constructor(view){
        this.view = view;
        this.model = new MyRecieptsModel();
    }
    
    loadMyRecieptPage(page){

        window.scrollTo(null, 0);
        
        this.view.setState({
            loading:true
        });

        this.model.getMyReciepts(null, (err, data)=>{

            let d = data.data;
            if(data.result_code === env.SC.SUCCESS){
                this.view.setState({
                    loading:false,
                    list: d,
                    total: d.length,
                    currentPage: page,
                })
            }
        })
    }
    
}