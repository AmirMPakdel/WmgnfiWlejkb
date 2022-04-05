import React, { Component } from "react";
import dynamic from 'next/dynamic'

const FinancialReports = dynamic(() => import("@/views/dynamics/dashboard/FinancialReports"), { ssr: false });

export default class financialReports extends Component {

  componentDidMount(){
  }
  
  render(){
    return(
      <FinancialReports/>
    )
  }
}