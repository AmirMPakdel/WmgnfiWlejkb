import React, { Component } from "react";
import dynamic from 'next/dynamic'

const ViewHelp = dynamic(() => import("@/views/dynamics/index/ViewHelp"), { ssr: false });

export default class viewHelp extends Component {

  componentDidMount(){
  }
  
  render(){
    return(
      <ViewHelp/>
    )
  }
}