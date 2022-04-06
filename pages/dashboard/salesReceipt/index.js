import React, { Component } from "react";
import dynamic from 'next/dynamic'

const SalesReceipt = dynamic(() => import("@/views/dynamics/dashboard/SalesReceipt"), { ssr: false });

export default class salesReceipt extends Component {

  
  render(){
    return(
      <SalesReceipt/>
    )
  }
}