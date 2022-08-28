import React, { Component } from "react";
import dynamic from 'next/dynamic'

const Help = dynamic(() => import("@/views/dynamics/index/Help"), { ssr: false });

export default class help extends Component {

  componentDidMount(){
  }
  
  render(){
    return(
      <Help/>
    )
  }
}