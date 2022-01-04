import React, { Component } from "react";
import dynamic from 'next/dynamic'

const Minfo = dynamic(() => import("@/views/dynamics/minfo/Minfo"), { ssr: false });

export default class minfo extends Component {

  componentDidMount(){
    
  }
  
  render(){
    return(
      <Minfo/>
    )
  }
}