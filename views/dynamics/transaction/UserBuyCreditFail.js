import { priceFormat } from "@/utils/price";
import ListRow from "@/views/components/buyCredit/ListRow";
import Loading from "@/views/components/global/Loading";
import MainButton from "@/views/components/global/MainButton";
import IndexLayout from "@/views/layouts/IndexLayout";
import React, { Component } from "react";
import styles from "./UserBuyCreditFail.module.css";
const persianNToText = require('number-to-persian-text');

/**
* Props of UserBuyCreditFail Component
* @typedef Props
* @property {string} className
* @property {React.CSSProperties} style
* 
* @extends {Component<Props>}
*/
export default class UserBuyCreditFail extends Component {
    
    constructor(props){
        super(props);
        //this.controller = new UserBuyCreditFailController(this);
        this.state = {
            loading:true,
        }
    }
    
    componentDidMount(){
        setTimeout(()=>{
            this.setState({loading:false})
        },1000)
    }

    onConfirm=()=>{
        window.location.href = env.PATHS.USER_OVERVIEW;
    }

    onRetry=()=>{
        window.location.href = env.PATHS.USER_BUY_CREDIT;
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

                        <ListRow title={"نتیجه تراکنش"} value={"ناموفق"}
                        valueClassName={"fec"}/>

                        <ListRow title={"پیغام خطا"} 
                        value={text}
                        vertical={true}
                        titleClassName=" fec "/>

                        <ListRow title={"شماره فاکتور"} value={"#6559"}
                        valueClassName={"eng_num"}/>

                        <ListRow title={"نام پرداخت کننده"} value={"امیرمحمد پاکدل"}/>
                        
                        <ListRow title={"درگاه پرداخت"} value={"بانک ملت"}/>

                        <ListRow title={"تاریخ تلاش"} value={"1400/02/16"}/>

                        <ListRow title={"مبلغ پرداخت"} value={priceFormat(200000)+" تومان"}/>

                        <ListRow title={"درصد تخفیف"} value={0+"%"}/>

                        <ListRow title={"مبلغ با احتساب تخفیف"} value={priceFormat(200000)+" تومان"}/>

                        <ListRow title={"مبلغ کل به حروف"} value={persianNToText.getText(200000)+" تومان"}/>

                        <ListRow title={"مبلغ کل"} value={priceFormat(200000)+" تومان"}/>


                        <div className={styles.btn_wrapper} ref={r=>this.btn_wrapper=r}>

                            <MainButton className={styles.confirm_btn}
                            title={"پنل کاربری"}
                            onClick={this.onConfirm}/>

                            {/* TODO: upcomming feature */}
                            {/* <MainButton className={styles.pring_btn}
                            title={"تلاش مجدد"}
                            borderMode={true}
                            onClick={this.onRetry}/> */}

                        </div>

                    </div>

                </div>
                }

            </div>

            </IndexLayout>
        )
    }
}

const text = "همچنین با توجه به قدیمی بودن نسخه نصبی و بهبود عملکرد در ورژن های جدید توصیه میشود ابتدا نرم افزار خود را به نسخه 3.5.8 ارتقا داده و سپس اقدام به نصب پلاگین ها نمایید. لینک دانلود نسخه 3.5.8 به پیوست این ایمیل و پلاگین ها  در ایمیل بعدی ارسال می گردد."