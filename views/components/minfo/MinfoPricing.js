import React, { Component } from "react";
import styles from "./MinfoPricing.module.css";
import MinfoSectionHeader from "./MinfoSectionHeader";

const planDataStorage = ["1 گیگ", "20 گیگ", "50 گیگ", "100 گیگ", "نامشخص"];

const planDataUsers = ["100 کاربر", "500 کاربر فعال", "2,500 کاربر فعال", "6,000 کاربر فعال", "نامحدود"];

const planDataPrices = {
    "month":["رایگان", "185,000 تومان", "450,000 تومان", "780,000 تومان", "با ما تماس بگیرید"],
    "3month":["رایگان", "550,000 تومان", "1,250,000 تومان", "2,250,000 تومان", "با ما تماس بگیرید"],
    "6month":["رایگان", "1,100,000 تومان", "2,500,000 تومان", "4,500,000 تومان", "با ما تماس بگیرید"],
    "year":["رایگان", "2,200,000 تومان", "5,000,000 تومان", "9,000,000 تومان", "با ما تماس بگیرید"],
}

/**
* Props of MinfoPricing Component
* @typedef Props
* @property {string} className
* @property {React.CSSProperties} style
* 
* @extends {Component<Props>}
*/
export default class MinfoPricing extends Component {
    
    constructor(props){
        super(props);
        //this.controller = new MinfoPricingController(this);
        this.state = {
            selected_period: "year",
            storages: planDataStorage,
            users: planDataUsers,
            prices: planDataPrices["year"],
        }
    }
    
    componentDidMount(){
    }

    onPeriodSelect=(p)=>{

        let prices = planDataPrices[p];

        this.setState({selected_period:p, prices});
    }
    
    render(){
        return(
            <div className={styles.con}>

                <MinfoSectionHeader title="تعرفه ها"/>

                <div id="pricing" className={styles.anchor}/>

                <div className={styles.period_selector+" btc1"}>

                    <PeriodSelectorBtn
                    periodName="month"
                    selectedPeriod={this.state.selected_period}
                    title="یک ماهه"
                    onSelect={this.onPeriodSelect}/>

                    <PeriodSelectorBtn
                    periodName="3month"
                    selectedPeriod={this.state.selected_period}
                    title="سه ماهه"
                    onSelect={this.onPeriodSelect}/>

                    <PeriodSelectorBtn
                    periodName="6month"
                    selectedPeriod={this.state.selected_period}
                    title="شش ماهه"
                    onSelect={this.onPeriodSelect}/>

                    <PeriodSelectorBtn
                    periodName="year"
                    selectedPeriod={this.state.selected_period}
                    title="یک ساله"
                    onSelect={this.onPeriodSelect}/>

                </div>

                <div className={styles.wrapper}>

                    <div className={styles.wrapper2}>

                    <PricingCard
                        icon={"/statics/svg/minfo-pricing-plan1.svg"}
                        title={"رایگان"}
                        shadow={"0px 2px 12px -2px rgba(0, 0, 0, 0.3)"}
                        storage={this.state.storages[0]}
                        users={this.state.users[0]}
                        price={this.state.prices[0]}
                    />

                    <PricingCard
                        icon={"/statics/svg/minfo-pricing-plan2.svg"}
                        title={"پایه"}
                        shadow={"0px 2px 12px -2px rgba(1, 240, 147, 0.7)"}
                        storage={this.state.storages[1]}
                        users={this.state.users[1]}
                        price={this.state.prices[1]}
                    />

                    <PricingCard
                        icon={"/statics/svg/minfo-pricing-plan3.svg"}
                        title={"اقتصادی"}
                        shadow={"0px 2px 12px -2px rgba(54, 161, 255, 0.85)"}
                        storage={this.state.storages[2]}
                        users={this.state.users[2]}
                        price={this.state.prices[2]}
                    />

                    <PricingCard
                        icon={"/statics/svg/minfo-pricing-plan4.svg"}
                        title={"پیشرفته"}
                        shadow={"0px 2px 12px -2px rgba(111, 58, 249, 0.8)"}
                        storage={this.state.storages[3]}
                        users={this.state.users[3]}
                        price={this.state.prices[3]}
                    />

                    <PricingCard
                        icon={"/statics/svg/minfo-pricing-plan5.svg"}
                        title={"سازمانی"}
                        shadow={"0px 2px 12px -2px rgba(255, 171, 2, 0.85)"}
                        storage={this.state.storages[4]}
                        users={this.state.users[4]}
                        price={this.state.prices[4]}
                    />

                    </div>

                </div>
                
            </div>
        )
    }
}

function PeriodSelectorBtn(props){

    return(
        <div className={props.selectedPeriod===props.periodName?
        (styles.psb_con_active+" fwi bgtc1"):styles.psb_con}
        onClick={()=>props.onSelect(props.periodName)}>

            {props.title}

        </div>
    )
}

class PricingCard extends Component{

    render(){
        return(
            <div className={styles.pc_con}>
                
                <div className={styles.pc_wrapper} style={{boxShadow:this.props.shadow}}>

                    <div className={styles.pc_heading} style={{boxShadow:this.props.shadow}}>

                        <img className={styles.pc_icon}
                        src={this.props.icon}/>

                    </div>

                    <div className={styles.title}>{this.props.title}</div>

                    <div className={styles.pc_wrapper2}>

                        <img className={styles.pc_row_icon}
                        src={"/statics/svg/minfo-pricing-storage.svg"}/>

                        <div className={styles.pc_row_text}>
                            {this.props.storage}
                        </div>
                        
                        <img className={styles.pc_row_icon}
                        src={"/statics/svg/minfo-pricing-users.svg"}/>

                        <div className={styles.pc_row_text}>
                            {this.props.users}
                        </div>

                        <div className={styles.pc_price}>{this.props.price}</div>

                    </div>

                </div>
            </div>
        )
    }
}