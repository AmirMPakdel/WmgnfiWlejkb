import React, { Component } from "react";
import dynamic from 'next/dynamic'

const BuyCourseFail = dynamic(() => import("@/views/dynamics/transaction/BuyCourseFail"), { ssr: false });

export default class buyCourseFail extends Component {

  componentDidMount(){
    
  }
  
  render(){
    return(
      <BuyCourseFail/>
    )
  }
}