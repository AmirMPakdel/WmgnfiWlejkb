import React, { Component } from "react";
import dynamic from 'next/dynamic'

const NewCourse = dynamic(() => import("@/views/dynamics/dashboard/NewCourse"), { ssr: false });

export default class newCourse extends Component {

  componentDidMount(){
    
  }
  
  render(){
    return(
      <NewCourse/>
    )
  }
}