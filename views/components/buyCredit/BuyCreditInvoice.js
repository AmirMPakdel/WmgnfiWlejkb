import BuyCreditInvoiceController from "@/controllers/components/buyCredit/BuyCreditInvoiceController";
import { priceFormat } from "@/utils/price";
import Storage from "@/utils/storage";
import { getCurrentShamsiDate } from "@/utils/time";
import BuyCredit from "@/views/dynamics/dashboard/BuyCredit";
import { Checkbox } from "node_modules/antd/lib/index";
import React, { Component } from "react";
import MainButton from "../global/MainButton";
import styles from "./BuyCreditInvoice.module.css";
import ListRow from "./ListRow";
const persianNToText = require('number-to-persian-text');

/**
* Props of BuyCreditInvoice Component
* @typedef Props
* @property {string} className
* @property {React.CSSProperties} style
* @property {BuyCredit} parent
* 
* @extends {Component<Props>}
*/
export default class BuyCreditInvoice extends Component {
    
    constructor(props){
        super(props);
        this.controller = new BuyCreditInvoiceController(this);
        this.state = {
            buyers_name:"",
            purchase_date:"",
            accept:false,
            confirm_loading:false,
        }
    }
    
    componentDidMount(){

        let user = Storage.retrive("user");
        let buyers_name = user.first_name+" "+user.last_name;
        let purchase_date = getCurrentShamsiDate();

        this.setState({
            buyers_name,
            purchase_date,
        })
    }

    onAccept=()=>{
        this.setState({accept:!this.state.accept});
    }

    onConfirm=()=>{
        this.controller.onConfirm();
    }

    onCancel=()=>{
        let p = this.props.parent;
        p.setState({show_invoice: false}, ()=>{
            scrollTo(0,0);
        });
    }
    
    render(){
        
        let p = this.props.parent;
        let ps = p.state;

        let price = ps.amount;
        if(ps.user_input){
            price = ps.user_amount_input;
        }

        return(
            <div className={styles.con+" md_card_shd bgw"}>

                <div className={styles.title+" tilt md_card_shd bglc1"}>{"پیش فاکتور"}</div>

                <div className={styles.list_wrapper}>

                    <ListRow title={"نام پرداخت کننده"} value={this.state.buyers_name}/>

                    {
                        ps.payment_type===1?
                        <ListRow title={"شیوه پرداخت"} value={"پرداخت اینترنتی"}/>:
                        <ListRow title={"شیوه پرداخت"} value={"از صندوق درآمد"}/>
                    }
                    
                    {
                        ps.payment_type===1?
                        <ListRow title={"درگاه پرداخت"} value={ps.selected_portal.title}/>:
                        null
                    }

                    <ListRow title={"تاریخ پرداخت"} value={this.state.purchase_date}/>

                    <ListRow title={"مقدار اعتبار"} value={priceFormat(price)+" تومان"}/>

                    <ListRow title={"مبلغ پرداخت"} value={priceFormat(price)+" تومان"}/>

                    <ListRow title={"درصد تخفیف"} value={0+"%"}/>

                    <ListRow title={"مبلغ با احتساب تخفیف"} value={priceFormat(price)+" تومان"}/>

                    <ListRow title={"مبلغ کل به حروف"} value={persianNToText.getText(price)+" تومان"}/>

                    <ListRow title={"مبلغ کل"} value={priceFormat(price)+" تومان"}/>

                    <div className={styles.checkbox_con}>

                        <Checkbox checked={this.state.accept} onClick={this.onAccept}/>

                        <div className={styles.checkbox+" bdyt"}>{"با زدن تیک، قوانین پرداخت سایت مینفو را پذیرفته ام."}</div>

                    </div>

                    <MainButton className={styles.confirm_btn}
                    title={"پرداخت"}
                    loading={this.state.confirm_loading}
                    disabled={!this.state.accept}
                    onClick={this.onConfirm}/>

                    <div className={styles.cancel_link+" bdyt ftc2 btc2 amp_btn"}
                    onClick={this.onCancel}>{"انصراف"}</div>

                </div>
                
            </div>
        )
    }
}