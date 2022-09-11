import React, { Component } from "react";
import dynamic from 'next/dynamic'

const ManageStudents = dynamic(() => import("@/views/dynamics/dashboard/ManageStudents"), { ssr: false });

export default class manageStudents extends Component {

  componentDidMount(){
    
  }
  
  render(){
    return(
      <ManageStudents/>
    )
  }
}