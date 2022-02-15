import MyWishlistModel from "@/models/dynamics/stdPanel/MyWishlistModel";
import MyWishlist from "@/views/dynamics/stdPanel/MyWishlist";

export default class MyWishlistController{
    
    /**@param {MyWishlist} view*/
    constructor(view){
        this.view = view;
        this.model = new MyWishlistModel();
    }
    
    loadWishlistPage(page){

        window.scrollTo(null, 0);
        
        this.view.setState({
            loading:true
        });

        this.model.getMyWishlist(null, (err, data)=>{

            let d = data.data;
            if(data.result_code === env.SC.SUCCESS){
                this.view.setState({
                    loading:false,
                    list: d.list,
                    total: d.total,
                    currentPage: page,
                })
            }
        })
    }
    
}