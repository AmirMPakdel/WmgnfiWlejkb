import EditProfileModel from "@/models/dynamics/stdPanel/EditProfileModel";
import chest from "@/utils/chest";
import Observer from "@/utils/observer";
import Storage from "@/utils/storage";
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
                let cities = [];

                if(province_id){
                    province_obj = FIND_PROVINCE_BY_ID(province_id);
                    cities = GET_CITIES_OF_PROVINCE(province_id);
                }

                let city_id = d.city?Number(d.city):null;
                let city_obj = {};

                if(city_id){
                    city_obj = FIND_CITY_BY_ID(city_id);                    
                }

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
                    email: d.email,
                })
            }
        })
    }

    updateStudentInfo(){

        let can = this.checkInputs();

        if(!can){return};

        let v = this.view;
        let vs = v.state;

        let params={
            first_name: vs.first_name,
            last_name: vs.last_name,
            email: vs.email,
            phone_number: vs.phone_number,
            state: vs.province_id.toString(),
            city: vs.city_id.toString(),
        }

        v.setState({btn_loading:true});

        this.model.updateProfile(params, (err, data)=>{

            if(data.result_code === env.SC.SUCCESS){

                chest.openNotification("اطلاعات پروفایل با موفقیت بروزرسانی شد.", "success");

                let student = Storage.get("student");
                let newStudent = Object.assign(student, params);
                newStudent.should_update = true;

                Storage.store("student", newStudent);

                Observer.execute("onStudentChange", newStudent);
            }

            v.setState({btn_loading:false});
        });
        
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