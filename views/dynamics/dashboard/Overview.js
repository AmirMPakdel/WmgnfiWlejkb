import React, { Component } from "react";
import DashboardCard from "@/views/components/dashboard/DashboardCard";
import IncomeChart from "@/views/components/dashboard/IncomeChart";
import IncomesChestCard from "@/views/components/dashboard/IncomesChestCard";
import EducatorDashboardLayout from "@/views/layouts/EducatorDashboardLayout";
import styles from "./Overview.module.css";
import WrapperT1 from "@/views/layouts/WrapperT1";

export default class Overview extends Component {
    
    render(){
        return(
            <EducatorDashboardLayout accessType="userL1"
            showWithoutAuth={false}>

                <WrapperT1 className={styles.wrappert1}>

                    <div className={styles.con}>
                    
                        <div className={styles.sec1}>

                            <DashboardCard className={styles.dash_card}
                            number={"32,605"} number_title={"عدد"} title={"دوره فروخته شده"}/>

                            <DashboardCard  className={styles.dash_card} 
                            number={"15"} number_title={"عدد"} title={"دوره ارائه شده"}/>

                            <DashboardCard  className={styles.dash_card} 
                            number={"15,325"} number_title={"تومان"} title={"هزینه روزانه"}/>

                            <DashboardCard  className={styles.dash_card} 
                            number={"165"} number_title={"روز"} title={"باقی مانده تا اتمام اعتبار"}/>

                        </div>

                        <div className={styles.sec2}>

                            <IncomesChestCard/>

                            <IncomeChart/>

                        </div>

                    </div>

                </WrapperT1>

            </EducatorDashboardLayout>
        )
    }
}