import React, { Component } from "react";
import styles from "./IncomeChart.module.css";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import price from "@/utils/price";
import Loading from "../global/Loading";


export default class IncomeChart extends Component {
    
    render(){

        return(
            <div className={styles.con}>
            
            {
                !this.props.data?
                <Loading style={{height:"100%", width:"100%"}}/>
                :
                <>
                    <div className={styles.header}>{"نمودار فروش"}</div>
                    <ResponsiveContainer width="100%" height="100%">

                        <LineChart
                        width={500}
                        height={300}
                        data={this.props.data}
                        margin={{
                            top: 10,
                            right: 40,
                            left: 0,
                            bottom: 5,
                        }}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis width={50} tickFormatter={(value, name, props) => value/1000+"k"}/>
                            <Tooltip 
                            formatter={(value, name, props) => price.priceFormat(value)+" تومان"}
                            labelFormatter={(value, name, props) => "تاریخ : "+value}/>
                            {/* <Legend /> */}
                            <Line type="monotone" dataKey="درآمد" stroke="#FBAD16" activeDot={{ r: 8 }} strokeWidth={3} />
                        </LineChart>

                    </ResponsiveContainer>
                </>
            }
            </div>
        )
    }
}