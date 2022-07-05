import CourseInvoiceController from "@/controllers/dynamics/index/CourseInvoiceController";
import myServer from "@/utils/myServer";
import { calcDiscountPercent, priceFormat } from "@/utils/price";
import Storage from "@/utils/storage";
import { getCurrentShamsiDate } from "@/utils/time";
import ListRow from "@/views/components/buyCredit/ListRow";
import Loading from "@/views/components/global/Loading";
import MainButton from "@/views/components/global/MainButton";
import Price from "@/views/components/global/Price";
import IndexLayout from "@/views/layouts/IndexLayout";
import { Checkbox, Radio } from "node_modules/antd/lib/index";
import React, { Component } from "react";
import styles from "./CourseInvoice.module.css";
const persianNToText = require('number-to-persian-text');

/**
* Props of CourseInvoice Component
* @typedef Props
* @property {string} className
* @property {React.CSSProperties} style
* 
* @extends {Component<Props>}
*/
export default class CourseInvoice extends Component {
    
    constructor(props){
        super(props);
        this.controller = new CourseInvoiceController(this);
        this.state = {
            loading:true,
            student:{},
            portals:[],
            course:{},
            selected_portal:null,
            rules_accept:false,
            confirm_loading:false,
        }
    }
    
    componentDidMount(){
        this.controller.initialize();

        let student = Storage.get("student");
        this.setState({ student });
    }

    onPortal=(id)=>{
        this.setState({selected_portal:id})
    }

    onAccept=()=>{
        this.setState({rules_accept:!this.state.rules_accept})
    }

    onConfirm=()=>{
        if(!(this.state.rules_accept && this.state.selected_portal)){return};
        this.controller.onConfirm();
    }

    onFreeRegisterConfirm=()=>{
        this.controller.onFreeRegisterConfirm();
    }
    
    render(){
        let crs = this.state.course;
        let edu = getEducator(crs);
        let user_fullname = this.state.student.first_name+" "+this.state.student.last_name;
        let {price, total_price, off_percent} = getPriceData(crs);

        return(
            <IndexLayout accessType="student"
            showWithoutAuth={false}
            footerAutoLoad={true}>

                <div className={styles.con}>

                    {
                        this.state.loading?
                        <Loading style={{minHeight:"70vh"}}/>:
                        <>
                        <div className={styles.course_card_con+" md_card_shd bgw"}>

                            <div className={styles.course_info_wrapper}>

                                <div className={styles.course_logo} 
                                style={{backgroundImage:`url(${myServer.MediaFiles.publicImage(crs.logo)})`}}/>

                                <div className={styles.course_info}>

                                    <div className={styles.c_info_column}>
                                        <div className={styles.c_info_1+" tilt"}>{crs.title}</div>
                                        <div className={styles.c_info_2}>{edu}</div>
                                    </div>

                                    <Price className={styles.c_price} 
                                    price={crs.price}
                                    offPercent={0}
                                    orginalPrice={0}/>

                                </div>

                            </div>

                            </div>

                            <div className={styles.invoice_con+" md_card_shd bgw"}>

                            <div className={styles.invoice_title+" tilt md_card_shd bglc1"}>{"پیش فاکتور"}</div>

                            <div className={styles.invoice_list_wrapper}>

                                <ListRow title={"عنوان دوره"} value={crs.title}/>

                                <ListRow title={"نام پرداخت کننده"} value={user_fullname}/>

                                <ListRow title={"تاریخ"} value={getCurrentShamsiDate()}/>

                                {
                                    total_price != 0?
                                    <ListRow title={"قیمت دوره"} value={priceFormat(price)+" تومان"}/>
                                    :
                                    <ListRow title={"قیمت دوره"} value={"رایگان"}/>

                                }

                                <ListRow title={"درصد تخفیف"} value={off_percent+"%"}/>

                                <ListRow title={"مبلغ با احتساب تخفیف"} value={priceFormat(total_price)+" تومان"}/>

                                <ListRow title={"مبلغ کل به حروف"} value={persianNToText.getText(total_price)+" تومان"}/>

                                <ListRow title={"مبلغ کل"} value={priceFormat(total_price)+" تومان"}/>

                                {
                                    total_price != 0?
                                    <>
                                    <div className={styles.protal_title+" tilt"}>{"انتخاب درگاه پرداخت"}</div>

                                    <div className={styles.portal_con}>
                                        {
                                            this.state.portals.map((v,i)=>(

                                                <div key={i} className={styles.portal_item_con+" amp_btn "+ ((this.state.selected_portal==v.id)?"btc2 ":"blc2 ")}
                                                onClick={()=>this.onPortal(v.name)}>

                                                    <img className={styles.portal_item_icon} src={v.logo}/>
                                                    
                                                    <div className={styles.portal_item_text+" cpnt"}>{v.title}</div>

                                                    <Radio checked={this.state.selected_portal==v.name}/>

                                                </div>
                                            ))
                                        }
                                    </div>

                                    <div className={styles.invoice_checkbox_con}>

                                        <Checkbox checked={this.state.rules_accept} onClick={this.onAccept}/>

                                        <span className={styles.invoice_checkbox+" bdyt"}>
                                            {"با زدن تیک، "}
                                            <a href={env.PATHS.STUDENT_RULES+"?sec=purchase_rules"} target="_blank" rel="noreferrer noopener">{"قوانین پرداخت "}</a>
                                            {"این سایت را پذیرفته ام."}
                                        </span>

                                    </div>

                                    <MainButton className={styles.invoice_confirm_btn}
                                    title={"پرداخت"}
                                    disabled={!(this.state.rules_accept && this.state.selected_portal)}
                                    loading={this.state.confirm_loading}
                                    onClick={this.onConfirm}/>
                                    
                                    </>
                                    :
                                    <>

                                    <MainButton className={styles.invoice_confirm_btn}
                                    title={"ثبت نام رایگان"}
                                    loading={this.state.confirm_loading}
                                    onClick={this.onFreeRegisterConfirm}/>
                                    
                                    </>
                                }

                                

                            </div>

                            </div>
                        </>
                    }
                </div>

            </IndexLayout>
        )
    }
}

const getEducator = (course)=>{

    let str = "";
    if(course && course.educators){

        let edus = course.educators;
        if(edus.length > 1){
            str += "مدرسین : ";
        }else{
            str += "مدرس : ";
        }
        edus.forEach((v, i, a)=>{
            str+= v.first_name +" "+ v.last_name;
            if(i+1 != a.length){
                str+=", ";
            }
        });
    }
    return str;
}

const getPriceData = (course)=>{

    let data = {
        price:"",
        total_price:"",
        off_percent:"",
    }
    if(course){
        data.price = course.price;
        if(course.discount_price){
            data.total_price = course.discount_price;
            data.off_percent = calcDiscountPercent(course.price, course.discount_price);
        }else{
            data.total_price = course.price;
            data.off_percent = "0";
        }
    }
    return data;
}