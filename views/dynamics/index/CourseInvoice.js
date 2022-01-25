import CourseInvoiceController from "@/controllers/dynamics/index/CourseInvoiceController";
import { priceFormat } from "@/utils/price";
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
            portals:[],
            selected_portal:null,
            rules_accept:false,
        }
    }
    
    componentDidMount(){
        this.controller.initialize();
    }

    onPortal=(id)=>{
        this.setState({selected_portal:id})
    }

    onAccept=()=>{
        this.setState({rules_accept:!this.state.rules_accept})
    }
    
    render(){
        return(
            <IndexLayout>

                <div className={styles.con}>

                    {
                        this.state.loading?
                        <Loading style={{minHeight:"70vh"}}/>:
                        <>
                        <div className={styles.course_card_con+" md_card_shd bgw"}>

                            <div className={styles.course_info_wrapper}>

                                <div className={styles.course_logo} 
                                style={{backgroundImage:`url(${"https://cdn.iconscout.com/icon/free/png-256/adobe-illustrator-2522532-2132720.png"})`}}/>

                                <div className={styles.course_info}>

                                    <div className={styles.c_info_column}>
                                        <div className={styles.c_info_1+" tilt"}>{"دوره مبتی تا پیشرفته ادوبی adobe illustrator و یادگیری نقاشی دیجیتال"}</div>
                                        <div className={styles.c_info_2}>{"مدرس : علیرضا رمضانی"}</div>
                                    </div>

                                    <Price className={styles.c_price} 
                                    price={400000}
                                    offPercent={10}
                                    orginalPrice={440000}/>

                                </div>

                            </div>

                            </div>

                            <div className={styles.invoice_con+" md_card_shd bgw"}>

                            <div className={styles.invoice_title+" tilt md_card_shd bglc1"}>{"پیش فاکتور"}</div>

                            <div className={styles.invoice_list_wrapper}>

                                <ListRow title={"عنوان دوره"} value={"دوره مبتی تا پیشرفته ادوبی adobe illustrator و یادگیری نقاشی دیجیتال"}/>

                                <ListRow title={"نام پرداخت کننده"} value={"امیرمحمد پاکدل"}/>

                                <ListRow title={"تاریخ"} value={"1400/02/16"}/>

                                <ListRow title={"قیمت دوره"} value={priceFormat(440000)+" تومان"}/>

                                <ListRow title={"درصد تخفیف"} value={10+"%"}/>

                                <ListRow title={"مبلغ با احتساب تخفیف"} value={priceFormat(400000)+" تومان"}/>

                                <ListRow title={"مبلغ کل به حروف"} value={persianNToText.getText(400000)+" تومان"}/>

                                <ListRow title={"مبلغ کل"} value={priceFormat(400000)+" تومان"}/>

                                <div className={styles.protal_title+" tilt"}>{"انتخاب درگاه پرداخت"}</div>

                                <div className={styles.portal_con}>
                                    {
                                        this.state.portals.map((v,i)=>(

                                            <div key={i} className={styles.portal_item_con+" amp_btn "+ ((this.state.selected_portal==v.id)?"btc2 ":"blc2 ")}
                                            onClick={()=>this.onPortal(v.id)}>

                                                <img className={styles.portal_item_icon} src={v.icon}/>
                                                
                                                <div className={styles.portal_item_text+" cpnt"}>{v.title}</div>

                                                <Radio checked={this.state.selected_portal==v.id}/>

                                            </div>
                                        ))
                                    }
                                </div>

                                <div className={styles.invoice_checkbox_con}>

                                    <Checkbox checked={this.state.rules_accept} onClick={this.onAccept}/>

                                    <div className={styles.invoice_checkbox+" bdyt"}>
                                        {"با زدن تیک، قوانین پرداخت این سایت را پذیرفته ام."}
                                    </div>

                                </div>

                                <MainButton className={styles.invoice_confirm_btn}
                                title={"پرداخت"}
                                disabled={!(this.state.rules_accept && this.state.selected_portal)}
                                onClick={this.onConfirm}/>

                            </div>

                            </div>
                        </>
                    }
                </div>

            </IndexLayout>
        )
    }
}