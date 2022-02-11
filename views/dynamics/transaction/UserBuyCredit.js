import UserBuyCreditController from "@/controllers/transaction/UserBuyCreditController";
import { priceFormat } from "@/utils/price";
import ListRow from "@/views/components/buyCredit/ListRow";
import Loading from "@/views/components/global/Loading";
import MainButton from "@/views/components/global/MainButton";
import IndexLayout from "@/views/layouts/IndexLayout";
import React, { Component } from "react";
import styles from "./UserBuyCredit.module.css";
const persianNToText = require('number-to-persian-text');

/**
* Props of UserBuyCredit Component
* @typedef Props
* @property {string} className
* @property {React.CSSProperties} style
* 
* @extends {Component<Props>}
*/
export default class UserBuyCredit extends Component {
    
    constructor(props){
        super(props);
        this.controller = new UserBuyCreditController(this);
        this.state = {
            loading:true,
            details:{},
        }
    }
    
    componentDidMount(){
        this.controller.load()
    }

    onConfirm=()=>{
        window.location.href = env.PATHS.USER_OVERVIEW;
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

        return(
            <IndexLayout>
            
            <iframe id={"ifmcontentstoprint"} style={{height:"0px", width:"0px", position:"absolute"}}></iframe>
            
            <div className={styles.con} id={"divcontents"}>
            
            {
                this.state.loading?
                <Loading style={{minHeight:"60vh"}}/>
                :
                <div className={styles.card+" md_card_shd bgw"}>

                    <div className={styles.title+" tilt md_card_shd bglc1"}>{"فاکتور خرید اعتبار"}</div>

                    <div className={styles.list_wrapper}>

                        {
                            dt.success?
                            <ListRow title={"نتیجه تراکنش"} value={"موفق"} valueClassName={"fsc"}/>:
                            <ListRow title={"نتیجه تراکنش"} value={"ناموفق"} valueClassName={"fec"}/>
                        }
                        
                        <ListRow title={"شماره فاکتور"} value={"#"+dt.id}
                        valueClassName={"eng_num"}/>

                        <ListRow title={"شناسه پرداخت"} value={dt.order_no}
                        valueClassName={"eng_num"}/>

                        <ListRow title={"نام پرداخت کننده"} value={"امیرمحمد پاکدل"}/>
                        
                        <ListRow title={"درگاه پرداخت"} value={dt.portal}/>

                        <ListRow title={"تاریخ پرداخت"} value={"1400/02/16"}/>

                        <ListRow title={"مقدار اعتبار افزوده شده"} value={priceFormat(dt.price)+" تومان"}/>

                        <ListRow title={"مبلغ پرداخت شده"} value={priceFormat(dt.price)+" تومان"}/>

                        <ListRow title={"درصد تخفیف"} value={0+"%"}/>

                        <ListRow title={"مبلغ با احتساب تخفیف"} value={priceFormat(dt.price)+" تومان"}/>

                        <ListRow title={"مبلغ کل به حروف"} value={persianNToText.getText(dt.price)+" تومان"}/>

                        <ListRow title={"مبلغ کل"} value={priceFormat(dt.price)+" تومان"}/>


                        <div className={styles.btn_wrapper} ref={r=>this.btn_wrapper=r}>

                            <MainButton className={styles.confirm_btn}
                            title={"پنل کاربری"}
                            onClick={this.onConfirm}/>

                            {
                                dt.success?
                                <MainButton className={styles.pring_btn}
                                title={"چاپ"}
                                borderMode={true}
                                onClick={this.onPrint}/>:null
                            }
                            
                        </div>

                    </div>

                </div>
                }

            </div>

            </IndexLayout>
        )
    }
}