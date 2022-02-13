import React, { Component } from "react";
import dynamic from 'next/dynamic'

const PreviewCourse = dynamic(() => import("@/views/dynamics/dashboard/PreviewCourse"), { ssr: false });

export default class previewCourse extends Component {

  
  render(){
    return(
      <PreviewCourse/>
    )
  }
}