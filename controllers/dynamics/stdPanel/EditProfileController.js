import EditProfileModel from "@/models/dynamics/stdPanel/EditProfileModel";
import chest from "@/utils/chest";
import Validation from "@/utils/validation";
import EditProfile from "@/views/dynamics/stdPanel/EditProfile";

export default class EditProfileController{
    
    /**@param {EditProfile} view*/
    constructor(view){
        this.view = view;
        this.model = new EditProfileModel();
    }
    
    loadStudentInfo(){

        let v = this.view;
        v.setState({loading:true});

        this.model.getProfile(null, (err, data)=>{

            if(data.result_code === env.SC.SUCCESS){

                let d = data.data;

                let province_id = d.state?Number(d.state):null;
                let province_obj = {};

                let city_id = d.city?Number(d.city):null;
                let city_obj = {};

                let cities = [];

                v.setState({
                    loading:false,
                    first_name: d.first_name,
                    last_name: d.last_name,
                    phone_number: d.phone_number,
                    province_id,
                    province_obj,
                    city_id,
                    city_obj,
                    cities,
                })
            }
        })
    }

    updateStudentInfo(){

        let res = this.checkInputs();

        if(!can){return};

        
    }

    checkInputs(){

        let v = this.view;
        let vs = v.state;
        let can = true;

        if(vs.first_name.length < 2){
            chest.openNotification("نام وارد شده نا معتبر است.", "error");
            can = false;
        }
        if(vs.last_name.length < 2){
            chest.openNotification("نام خانوادگی وارد شده نا معتبر است.", "error");
            can = false;
        }
        if(!vs.province_id){
            chest.openNotification("استان خود را انتخاب نمایید.", "error");
            can = false;
        }
        if(!vs.city_id){
            chest.openNotification("شهر خود را انتخاب نمایید.", "error");
            can = false;
        }
        if(!Validation.email(vs.email).valid){
            chest.openNotification(Validation.email(vs.email).message, "error");
            can = false;
        }
        return can;
    }
}