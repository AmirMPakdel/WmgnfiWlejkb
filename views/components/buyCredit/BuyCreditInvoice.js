import BuyCreditInvoiceController from "@/controllers/components/buyCredit/BuyCreditInvoiceController";
import { priceFormat } from "@/utils/price";
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
            accept:false,
        }
    }
    
    componentDidMount(){

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

        return(
            <div className={styles.con+" md_card_shd bgw"}>

                <div className={styles.title+" tilt md_card_shd bglc1"}>{"پیش فاکتور"}</div>

                <div className={styles.list_wrapper}>

                    <ListRow title={"نام پرداخت کننده"} value={"امیرمحمد پاکدل"}/>

                    {
                        ps.payment_type===1?
                        <ListRow title={"شیوه پرداخت"} value={"پرداخت اینترنتی"}/>:
                        <ListRow title={"شیوه پرداخت"} value={"از صندوق درآمد"}/>
                    }
                    
                    {
                        ps.payment_type===1?
                        <ListRow title={"درگاه پرداخت"} value={"بانک ملت"}/>:
                        null
                    }

                    <ListRow title={"تاریخ پرداخت"} value={"1400/02/16"}/>

                    <ListRow title={"مقدار اعتبار"} value={priceFormat(200000)+" تومان"}/>

                    <ListRow title={"مبلغ پرداخت"} value={priceFormat(200000)+" تومان"}/>

                    <ListRow title={"درصد تخفیف"} value={0+"%"}/>

                    <ListRow title={"مبلغ با احتساب تخفیف"} value={priceFormat(200000)+" تومان"}/>

                    <ListRow title={"مبلغ کل به حروف"} value={persianNToText.getText(200000)+" تومان"}/>

                    <ListRow title={"مبلغ کل"} value={priceFormat(200000)+" تومان"}/>

                    <div className={styles.checkbox_con}>

                        <Checkbox checked={this.state.accept} onClick={this.onAccept}/>

                        <div className={styles.checkbox+" bdyt"}>{"با زدن تیک، قوانین پرداخت سایت مینفو را پذیرفته ام."}</div>

                    </div>

                    <MainButton className={styles.confirm_btn}
                    title={"پرداخت"}
                    disabled={!this.state.accept}
                    onClick={this.onConfirm}/>

                    <div className={styles.cancel_link+" bdyt ftc2 btc2 amp_btn"}
                    onClick={this.onCancel}>{"انصراف"}</div>

                </div>
                
            </div>
        )
    }
}