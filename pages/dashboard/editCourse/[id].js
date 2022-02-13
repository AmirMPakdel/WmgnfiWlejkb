import React, { Component } from "react";
import dynamic from 'next/dynamic'

const EditCourse = dynamic(() => import("@/views/dynamics/dashboard/EditCourse"), { ssr: false });

export default class index extends Component {

  
  render(){
    return(
      <EditCourse/>
    )
  }
}