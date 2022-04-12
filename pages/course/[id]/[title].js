import React, { Component } from "react";
import dynamic from 'next/dynamic'

const Course = dynamic(() => import("@/views/dynamics/index/Course"), { ssr: false });

export default class index extends Component {

  componentDidMount(){
    
  }
  
  render(){
    return(
      <Course/>
    )
  }
}