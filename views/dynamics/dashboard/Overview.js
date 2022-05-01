import React, { Component } from "react";
import DashboardCard from "@/views/components/overview/DashboardCard";
import IncomeChart from "@/views/components/overview/IncomeChart";
import IncomesChestCard from "@/views/components/overview/IncomesChestCard";
import EducatorDashboardLayout from "@/views/layouts/EducatorDashboardLayout";
import styles from "./Overview.module.css";
import WrapperT1 from "@/views/layouts/WrapperT1";
import Loading from "@/views/components/global/Loading";
import { priceFormat } from "@/utils/price";
import OverviewController from "@/controllers/dynamics/dashboard/OverviewController";

export default class Overview extends Component {

    constructor(props){
        super(props);
        this.controller = new OverviewController(this);
        this.state={
            loading:true,
            total_income:0,
            total_sell_count:0,
            total_courses_count:0,
            daily_cost:0,
            remaining_days:0,
            chart_data: null,
        }
    }

    componentDidMount(){

        this.controller.loadBaseData(this.loadChart);
    }

    loadChart=()=>{

        this.controller.loadChartData();
    }
    
    render(){
        return(
            <EducatorDashboardLayout accessType="userL1"
            showWithoutAuth={false}>

                <WrapperT1 className={styles.wrappert1}>

                    {
                        this.state.loading?
                        <Loading className={styles.loading}/>
                        :
                        <div className={styles.con}>
                    
                            <div className={styles.sec1}>

                                <DashboardCard className={styles.dash_card}
                                number={priceFormat(this.state.total_sell_count)} number_title={"عدد"} title={"دوره فروخته شده"}/>

                                <DashboardCard  className={styles.dash_card} 
                                number={this.state.total_courses_count} number_title={"عدد"} title={"دوره ارائه شده"}/>

                                <DashboardCard  className={styles.dash_card} 
                                number={priceFormat(this.state.daily_cost)} number_title={"تومان"} title={"هزینه روزانه"}/>

                                <DashboardCard  className={styles.dash_card} 
                                number={this.state.remaining_days} number_title={"روز"} title={"باقی مانده تا اتمام اعتبار"}/>

                            </div>

                            <div className={styles.sec2}>

                                <IncomesChestCard income={priceFormat(this.state.total_income)}/>

                                <IncomeChart data={this.state.chart_data}/>

                            </div>

                        </div>
                    }

                </WrapperT1>

            </EducatorDashboardLayout>
        )
    }
}