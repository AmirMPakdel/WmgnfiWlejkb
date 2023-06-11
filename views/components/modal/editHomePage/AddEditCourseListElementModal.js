import AddEditCourseListElementController from "@/controllers/components/modals/editHomePage/AddEditCourseListElementController";
import React, { Component } from "react";
import styles from "./AddEditCourseListElementModal.module.css";
import CrossSvg from "@/views/svgs/Cross";
import chest from "@/utils/chest";
import { Checkbox } from "node_modules/antd/lib/index";
import MainButton from "@/views/components/global/MainButton";
import Dropdown from "@/views/components/global/Dropdown";
import CategorySelectModal from "../global/CategorySelectModal";
import HomePage from "@/views/dynamics/dashboard/HomePage";
import Storage from "@/utils/storage";
import CloseModalLayout from "../CloseModalLayout";

/**
* Props of AddEditCourseListElementModal Component
* @typedef Props
* @property {string} className
* @property {React.CSSProperties} style
* @property {HomePage} parent 
* 
* @extends {Component<Props>}
*/
export default class AddEditCourseListElementModal extends Component {
    
    constructor(props){
        super(props);
        this.controller = new AddEditCourseListElementController(this);
        this.state = {
            confirm_loading:false,
            ordering_item:null,
            active_grouping:false,
            checkedGroupKey:[],
            selected_title:"",
        }
    }
    
    componentDidMount(){
    }

    onCancel=()=>{

        this.controller.onCancel();
    }

    onOrderSelect=(item)=>{

        this.setState({ordering_item:item});
    }

    onGroupingCheck=()=>{

        this.setState({active_grouping: !this.state.active_grouping});
    }

    onSelectGroups=()=>{
        
        let modal = <CategorySelectModal multiSelect={false}
        defaultCheckedKeys={this.state.checkedGroupKey}
        onCancel={this.onGroupSelectCancel}
        onConfirm={this.onGroupConfirm}/>

        chest.ModalLayout.setAndShowModal(2, modal);
    }

    onGroupSelectCancel=()=>{

        chest.ModalLayout.closeAndDelete(2);
    }

    onGroupConfirm=(checkedKeys)=>{

        let groups = this.controller.extractSelectedGroups(checkedKeys[0], Storage.get("categories"));

        //console.log(groups);

        let group_title = groups[groups.length-1].title;

        let selected_title = group_title;
        //console.log(group_title);

        this.setState({checkedGroupKey: [checkedKeys[0]], selected_title}, ()=>{
            chest.ModalLayout.closeAndDelete(2);
        });
    }

    onConfirm=()=>{

        if(!this.state.ordering_item || this.state.confirm_loading){
            return;
        }
        
        this.controller.onConfirm();
    }
    
    render(){
        return(
            <CloseModalLayout className={styles.con+" bgw tbc2 xl_card_shd"}
            onClose={this.onCancel}>

                {
                    this.props.mode=="edit"?
                    <div className={styles.title+" tilt "}>{"تنظیمات آیتم جعبه اطلاعاتی"}</div>:
                    <div className={styles.title+" tilt "}>{"ایجاد آیتم جعبه اطلاعاتی"}</div>
                }

                <div className={styles.wrapper}>

                    <div className={styles.form_body}>

                        <Dropdown className={styles.order_dd}
                        placeholder={"ترتیب نمایش"}
                        options={OrdersOptions}
                        onSelect={this.onOrderSelect}/>

                        <div className={styles.active_group_select_row}>

                            <Checkbox checked={this.state.active_grouping}
                            onClick={this.onGroupingCheck}/>

                            <div className={styles.grouping_text}>{"فیلتر کردن براساس دسته بندی دوره ها"}</div>

                        </div>

                        {
                            this.state.active_grouping?
                            <MainButton className={styles.select_gorup_btn}
                            title={"انتخاب از دسته بندی ها"}
                            onClick={this.onSelectGroups}/>
                            :null
                        }

                    </div>

                    <div className={styles.sec1}>
                        
                        <MainButton className={styles.confirm_btn}
                        title={this.props.mode=="edit"?"ویرایش":"ایجاد"}
                        loading={this.state.confirm_loading}
                        disabled={!this.state.ordering_item}
                        onClick={this.onConfirm}/>

                    </div>

                </div>

            </CloseModalLayout>
        )
    }
}

//"dt_most_visited"|"dt_most_sell"|"dt_most_score"|"dt_most_newest"
const OrdersOptions = [
    {id:"dt_most_visited", title:"پربازدید ترین ها"},
    {id:"dt_most_sell", title:"پرفروش ترین ها"},
    {id:"dt_most_score", title:"بهترین ترین ها"},
    {id:"dt_most_newest", title:"جدید ترین ها"}
]