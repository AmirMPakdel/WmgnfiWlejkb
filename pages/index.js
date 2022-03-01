import React, { Component } from "react";
import dynamic from 'next/dynamic'

const HomePage = dynamic(() => import("@/views/dynamics/index/HomePage"), { ssr: false });

export default class index extends Component {

  componentDidMount(){
    
  }
  
  render(){
    return(
      <HomePage/>
    )
  }
}