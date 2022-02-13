import MyWishlistModel from "@/models/dynamics/stdPanel/MyWishlistModel";
import MyWishlist from "@/views/dynamics/stdPanel/MyWishlist";

export default class MyWishlistController{
    
    /**@param {MyWishlist} view*/
    constructor(view){
        this.view = view;
        this.model = new MyWishlistModel();
    }
    
    
    
}