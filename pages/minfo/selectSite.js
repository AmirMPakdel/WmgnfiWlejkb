import React, { Component } from "react";
import dynamic from 'next/dynamic'

const SelectSite = dynamic(() => import("@/views/dynamics/minfo/SelectSite"), { ssr: false });

export default class selectSite extends Component {

  componentDidMount(){
    
  }
  
  render(){
    return(
      <SelectSite/>
    )
  }
}