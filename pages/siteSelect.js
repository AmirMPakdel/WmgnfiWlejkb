import React, { Component } from "react";
import dynamic from 'next/dynamic'

const SiteSelect = dynamic(() => import("@/views/dynamics/index/SiteSelect"), { ssr: false });

export default class siteSelect extends Component {

  componentDidMount(){
    
  }
  
  render(){
    return(
      <SiteSelect/>
    )
  }
}