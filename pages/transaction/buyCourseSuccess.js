import React, { Component } from "react";
import dynamic from 'next/dynamic'

const BuyCourseSuccess = dynamic(() => import("@/views/dynamics/transaction/BuyCourseSuccess"), { ssr: false });

export default class buyCourseSuccess extends Component {

  componentDidMount(){
    
  }
  
  render(){
    return(
      <BuyCourseSuccess/>
    )
  }
}