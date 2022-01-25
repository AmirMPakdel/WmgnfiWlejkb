import React, { Component } from "react";
import dynamic from 'next/dynamic'

const CourseInvoice = dynamic(() => import("@/views/dynamics/index/CourseInvoice"), { ssr: false });

export default class courseInvoice extends Component {

  componentDidMount(){
    
  }
  
  render(){
    return(
      <CourseInvoice/>
    )
  }
}