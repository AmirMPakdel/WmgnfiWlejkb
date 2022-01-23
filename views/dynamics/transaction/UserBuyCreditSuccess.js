import { priceFormat } from "@/utils/price";
import ListRow from "@/views/components/buyCredit/ListRow";
import Loading from "@/views/components/global/Loading";
import MainButton from "@/views/components/global/MainButton";
import IndexLayout from "@/views/layouts/IndexLayout";
import React, { Component } from "react";
import styles from "./UserBuyCreditSuccess.module.css";
const persianNToText = require('number-to-persian-text');

/**
* Props of UserBuyCreditSuccess Component
* @typedef Props
* @property {string} className
* @property {React.CSSProperties} style
* 
* @extends {Component<Props>}
*/
export default class UserBuyCreditSuccess extends Component {
    
    constructor(props){
        super(props);
        //this.controller = new UserBuyCreditSuccessController(this);
        this.state = {
            loading:true,
        }
    }
    
    componentDidMount(){
        setTimeout(()=>{
            this.setState({loading:false})
        },2000)
    }

    onConfirm=()=>{
        window.location.href = env.PATHS.USER_DASHBOARD;
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

                        <ListRow title={"نتیجه تراکنش"} value={"موفق"}
                        valueClassName={"fsc"}/>

                        <ListRow title={"شماره فاکتور"} value={"#6559"}
                        valueClassName={"eng_num"}/>

                        <ListRow title={"شناسه پرداخت"} value={"452698558765"}
                        valueClassName={"eng_num"}/>

                        <ListRow title={"نام پرداخت کننده"} value={"امیرمحمد پاکدل"}/>
                        
                        <ListRow title={"درگاه پرداخت"} value={"بانک ملت"}/>

                        <ListRow title={"تاریخ پرداخت"} value={"1400/02/16"}/>

                        <ListRow title={"مقدار اعتبار افزوده شده"} value={priceFormat(200000)+" تومان"}/>

                        <ListRow title={"مبلغ پرداخت شده"} value={priceFormat(200000)+" تومان"}/>

                        <ListRow title={"درصد تخفیف"} value={0+"%"}/>

                        <ListRow title={"مبلغ با احتساب تخفیف"} value={priceFormat(200000)+" تومان"}/>

                        <ListRow title={"مبلغ کل به حروف"} value={persianNToText.getText(200000)+" تومان"}/>

                        <ListRow title={"مبلغ کل"} value={priceFormat(200000)+" تومان"}/>


                        <div className={styles.btn_wrapper} ref={r=>this.btn_wrapper=r}>

                            <MainButton className={styles.confirm_btn}
                            title={"پنل کاربری"}
                            onClick={this.onConfirm}/>

                            <MainButton className={styles.pring_btn}
                            title={"چاپ"}
                            borderMode={true}
                            onClick={this.onPrint}/>

                        </div>

                    </div>

                </div>
                }

            </div>

            </IndexLayout>
        )
    }
}