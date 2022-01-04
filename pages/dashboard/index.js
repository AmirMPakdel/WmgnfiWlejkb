import React, { Component } from "react";
import dynamic from 'next/dynamic'

const Dashboard = dynamic(() => import("@/views/dynamics/dashboard/Dashboard"), { ssr: false });

export default class index extends Component {

  
  render(){
    return(
      <Dashboard/>
    )
  }
}