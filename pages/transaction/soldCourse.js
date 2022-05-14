import React, { Component } from "react";
import dynamic from 'next/dynamic'

const SoldCourse = dynamic(() => import("@/views/dynamics/transaction/SoldCourse"), { ssr: false });

export default class soldCourse extends Component {

  componentDidMount(){
    
  }
  
  render(){
    return(
      <SoldCourse/>
    )
  }
}