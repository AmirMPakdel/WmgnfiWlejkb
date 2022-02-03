import React, { Component } from "react";
import dynamic from 'next/dynamic'

const Overview = dynamic(() => import("@/views/dynamics/dashboard/Overview"), { ssr: false });

export default class overview extends Component {

  
  render(){
    return(
      <Overview/>
    )
  }
}