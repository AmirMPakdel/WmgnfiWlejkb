import SalesReceiptController from "@/controllers/dynamics/dashboard/SalesReceiptController";
import React, { Component } from "react";
import styles from "./SalesReceipt.module.css";
import { priceFormat } from "@/utils/price";
import { sqlTimeStamp2ShamsiDateTime } from "@/utils/time";
import ListRow from "@/views/components/buyCredit/ListRow";
import Loading from "@/views/components/global/Loading";
import MainButton from "@/views/components/global/MainButton";
import IndexLayout from "@/views/layouts/IndexLayout";
const persianNToText = require('number-to-persian-text');

/**
* Props of SalesReceipt Component
* @typedef Props
* @property {string} className
* @property {React.CSSProperties} style
* 
* @extends {Component<Props>}
*/
export default class SalesReceipt extends Component {
    
    constructor(props){
        super(props);
        this.controller = new SalesReceiptController(this);
        this.state = {
            loading:true,
            details:{},
        }
    }
    
    componentDidMount(){
        this.controller.load()
    }

    onBack=()=>{
        window.history.back();
    }

    onPrint=()=>{

        this.btn_wrapper.style.display="none";

        let head = document.getElementsByTagName("head")[0];
        let content = document.getElementById("divcontents");
        let pri = document.getElementById("ifmcontentstoprint").contentWindow;
        pri.document.open();
        pri.document.write('<html><head>');
        pri.document.write(head.innerHTML);
        pri.document.write('</head><body>');
        pri.document.write(content.innerHTML);
        pri.document.write('</body></html>');
        pri.document.close();
        pri.focus();
        pri.print();

        this.btn_wrapper.style.display="flex";
    }
    
    render(){

        let dt = this.state.details;

        let dateTime = sqlTimeStamp2ShamsiDateTime(dt.date).split("-");
        let date = dateTime[0];
        let time = dateTime[1];

        let course_href = "";
        if(dt && dt.course_id && dt.course_title){
            course_href = env.PATHS.COURSE+dt.course_id+"/"+dt.course_title.split(" ").join("-");
        }

        return(
            <IndexLayout accessType="userL1"
            showWithoutAuth={false}>
            
            <iframe id={"ifmcontentstoprint"} style={{height:"0px", width:"0px", position:"absolute"}}></iframe>
            
            <div className={styles.con} id={"divcontents"}>
            
            {
                this.state.loading?
                <Loading style={{minHeight:"60vh"}}/>
                :
                <div className={styles.card+" md_card_shd bgw"}>

                    <div className={styles.title+" tilt md_card_shd bglc1"}>{"فاکتور خرید دوره"}</div>

                    <div className={styles.list_wrapper}>

                        <ListRow title="عنوان دوره" value={<a href={course_href} target="_blank" rel="noopener noreferrer">{dt.course_title}</a>}/>

                        {
                            dt.success?
                            <ListRow title={"نتیجه تراکنش"} value={"موفق"} valueClassName={"tcscs"}/>:
                            <>
                                <ListRow title={"نتیجه تراکنش"} value={"ناموفق"} valueClassName={"tcerr"}/>
                                
                                <ListRow title={"پیغام خطا"}  value={dt.error_msg}
                                vertical={true} titleClassName=" tcerr "/>
                            </>
                        }
                        
                        <ListRow title={"شماره فاکتور"} value={"#"+dt.order_no}
                        valueClassName={"eng_num"}/>
                        
                        {
                            dt.success?
                            <ListRow title={"شناسه پرداخت"} value={dt.ref_id}
                            valueClassName={"eng_num"}/>:null
                        }

                        <ListRow title={"نام پرداخت کننده"} value={dt.name}/>
                        
                        {/* <ListRow title={"درگاه پرداخت"} value={dt.portal}/> */}
                        
                        {
                            dt.success?
                            <>
                            <ListRow title={"تاریخ پرداخت"} value={date}/>
                            <ListRow title={"ساعت پرداخت"} value={time}/>
                            </>:
                            <>
                            <ListRow title={"تاریخ تلاش"} value={date}/>
                            <ListRow title={"ساعت تلاش"} value={time}/>
                            </>
                        }

                        <ListRow title={"مقدار اعتبار افزوده شده"} value={priceFormat(dt.price)+" تومان"}/>

                        <ListRow title={"مبلغ پرداخت شده"} value={priceFormat(dt.price)+" تومان"}/>

                        <ListRow title={"درصد تخفیف"} value={0+"%"}/>

                        <ListRow title={"مبلغ با احتساب تخفیف"} value={priceFormat(dt.price)+" تومان"}/>

                        <ListRow title={"مبلغ کل به حروف"} value={persianNToText.getText(dt.price)+" تومان"}/>

                        <ListRow title={"مبلغ کل"} value={priceFormat(dt.price)+" تومان"}/>


                        <div className={styles.btn_wrapper} ref={r=>this.btn_wrapper=r}>

                            {/* <MainButton className={styles.confirm_btn}
                            title={"بازگشت"}
                            onClick={this.onBack}/> */}

                            {/* {
                                dt.success?
                                <MainButton className={styles.pring_btn}
                                title={"چاپ"}
                                borderMode={true}
                                onClick={this.onPrint}/>:null
                            } */}
                            
                        </div>

                    </div>

                </div>
                }

            </div>

            </IndexLayout>
        )
    }
}