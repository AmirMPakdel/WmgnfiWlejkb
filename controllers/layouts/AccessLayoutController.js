import UserModel from "@/models/global/UserModel";
import chest from "@/utils/chest";
import Storage from "@/utils/storage";
import AccessLayout from "@/views/layouts/AccessLayout";

export default class AccessLayoutController{
    
    /**@param {AccessLayout} AccessLayoutView*/
    constructor(AccessLayoutView){

        this.view = AccessLayoutView;

        this.model = new UserModel();
    }

    async loadUser(){

        let user = await this.model.getUser();

        chest.user = user;

        Storage.store("user", user);

        this.view.setState({
            loading:false,
            userAccessLevel: user.accessLevel,
        });
    }
    
}