import ViewRecieptController from "@/controllers/dynamics/stdPanel/ViewRecieptController";
import Observer from "@/utils/observer";
import { priceFormat } from "@/utils/price";
import { sqlTimeStamp2ShamsiDateTime } from "@/utils/time";
import ListRow from "@/views/components/buyCredit/ListRow";
import Loading from "@/views/components/global/Loading";
import StudentPanelLayout from "@/views/layouts/StudentPanelLayout";
import WrapperT1 from "@/views/layouts/WrapperT1";
import React, { Component } from "react";
import styles from "./ViewReciept.module.css";
const persianNToText = require('number-to-persian-text');

/**
* Props of ViewReciept Component
* @typedef Props
* @property {string} className
* @property {React.CSSProperties} style
* 
* @extends {Component<Props>}
*/
export default class ViewReciept extends Component {
    
    constructor(props){
        super(props);
        this.controller = new ViewRecieptController(this);
        this.state = {
            loading:true,
            details:{},
        }

        Observer.add("onAuthenticate", ()=>{
            this.controller.getReciept();
        });
    }
    
    componentDidMount(){
    }
    
    render(){

        let dt = this.state.details;

        let dateTime = sqlTimeStamp2ShamsiDateTime(dt.date).split(" - ");
        let date = dateTime[0];
        let time = dateTime[1];

        return(
            <StudentPanelLayout accessType="student"
            showWithoutAuth={false}>

                <WrapperT1>

                    <div className={styles.con}>
                    {
                        this.state.loading?
                        <Loading style={{minHeight:"16rem"}}/>:
                        <>
                            <div className={styles.card+" md_card_shd bgw"}>

                            {/* <div className={styles.title+" tilt md_card_shd bglc1"}>{"فاکتور خرید اعتبار"}</div> */}

                            <div className={styles.list_wrapper}>

                                {
                                    dt.success?
                                    <ListRow title={"نتیجه تراکنش"} value={"موفق"} valueClassName={"fsc"}/>:
                                    <>
                                        <ListRow title={"نتیجه تراکنش"} value={"ناموفق"} valueClassName={"fec"}/>
                                        
                                        <ListRow title={"پیغام خطا"}  value={dt.error_msg}
                                        vertical={true} titleClassName=" fec "/>
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
                        
                        </>
                    }
                    </div>

                </WrapperT1>

            </StudentPanelLayout>
        )
    }
}