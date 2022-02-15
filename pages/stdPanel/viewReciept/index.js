import React, { Component } from "react";
import dynamic from 'next/dynamic'

const ViewReciept = dynamic(() => import("@/views/dynamics/stdPanel/ViewReciept"), { ssr: false });

export default class viewReciept extends Component {

  componentDidMount(){
    
  }
  
  render(){
    return(
      <ViewReciept/>
    )
  }
}