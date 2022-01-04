import React, { Component } from "react";
import styles from "./IncomeChart.module.css";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import price from "@/utils/price";


export default class IncomeChart extends Component {
    
    render(){

        return(
            <div className={styles.con}>

            <div className={styles.header}>{"نمودار فروش"}</div>

            <ResponsiveContainer width="100%" height="100%">

                <LineChart
                width={500}
                height={300}
                data={data}
                margin={{
                    top: 10,
                    right: 40,
                    left: 0,
                    bottom: 5,
                }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis width={70}/>
                    <Tooltip 
                    formatter={(value, name, props) => price.priceFormat(value)+" تومان"}
                    labelFormatter={(value, name, props) => "تاریخ : "+value}/>
                    {/* <Legend /> */}
                    <Line type="monotone" dataKey="درآمد" stroke="#FBAD16" activeDot={{ r: 8 }} strokeWidth={3} />
                </LineChart>
            </ResponsiveContainer>

            </div>
        )
    }
}

const data = [
    {
      name: '01/01',
      درآمد: 0,
    },
    {
      name: '01/02',
      درآمد: 350000,
    },
    {
      name: '01/03',
      درآمد: 1000000,
    },
    {
      name: '01/04',
      درآمد: 350000,
    },
    {
      name: '01/05',
      درآمد: 189000,
    },
    {
      name: '01/06',
      درآمد: 2390000,
    },
    {
      name: '01/07',
      درآمد: 349000,
    },
    {
        name: "01/08",
        درآمد : 520000
    },
    {
        name: "01/09",
        درآمد : 120000
    },
    {
        name: "01/10",
        درآمد : 780000
    },
    {
        name: "01/11",
        درآمد : 520000
    },
    {
        name: "01/12",
        درآمد : 220000
    },
    {
        name: "01/13",
        درآمد : 640000
    },
    {
        name: "01/14",
        درآمد : 220000
    },
    {
        name: "01/15",
        درآمد : 0
    },
    {
        name: "01/16",
        درآمد : 320000
    },
    {
        name: "01/17",
        درآمد : 420000
    },
    {
        name: "01/18",
        درآمد : 960000
    },
    {
        name: "01/19"
    },
    {
        name: "01/20"
    },
    {
        name: "01/21"
    },
    {
        name: "01/22"
    },
    {
        name: "01/23"
    },
    {
        name: "01/24"
    },
    {
        name: "01/25"
    },
    {
        name: "01/26"
    },
    {
        name: "01/27"
    },
    {
        name: "01/28"
    },
    {
        name: "01/29"
    },
    {
        name: "01/30"
    },
  ];