import React, { Component } from "react";
import dynamic from 'next/dynamic'

const BuyCourse = dynamic(() => import("@/views/dynamics/transaction/BuyCourse"), { ssr: false });

export default class buyCourse extends Component {

  componentDidMount(){
    
  }
  
  render(){
    return(
      <BuyCourse/>
    )
  }
}