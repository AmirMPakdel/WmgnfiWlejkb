import React, { Component } from "react";
import dynamic from 'next/dynamic'

const StdRules = dynamic(() => import("@/views/dynamics/index/StdRules"), { ssr: false });

export default class stdRules extends Component {

  componentDidMount(){
    
  }
  
  render(){
    return(
      <StdRules/>
    )
  }
}