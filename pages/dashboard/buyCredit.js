import React, { Component } from "react";
import dynamic from 'next/dynamic'

const BuyCredit = dynamic(() => import("@/views/dynamics/dashboard/BuyCredit"), { ssr: false });

export default class buyCredit extends Component {
  
  render(){
    return(
      <BuyCredit/>
    )
  }
}