import React, { Component } from "react";
import dynamic from 'next/dynamic'

const Store = dynamic(() => import("@/views/dynamics/index/Store"), { ssr: false });

export default class store extends Component {

  componentDidMount(){
    
  }
  
  render(){
    return(
      <Store/>
    )
  }
}