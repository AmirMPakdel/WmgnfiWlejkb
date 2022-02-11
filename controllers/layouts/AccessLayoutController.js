import UserModel from "@/models/global/UserModel";
import chest from "@/utils/chest";
import Observer from "@/utils/observer";
import AccessLayout from "@/views/layouts/AccessLayout";

export default class AccessLayoutController{
    
    /**@param {AccessLayout} view*/
    constructor(view){

        this.view = view;

        this.model = new UserModel();
    }

    loadUser(){
        
        this.model.getUser(null, (err, data)=>{

            if(data.result_code === env.SC.SUCCESS){

                let user = data.data;

                chest.user = user;

                Observer.execute("onUserChange", user);

                this.view.setState({
                    loading:false,
                    userAccessLevel: user.accessLevel,
                });
            }
        });
    }
    
}