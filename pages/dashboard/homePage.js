import React, { Component } from "react";
import dynamic from 'next/dynamic'

const HomePage = dynamic(() => import("@/views/dynamics/dashboard/HomePage"), { ssr: false });

export default class homePage extends Component {

  componentDidMount(){
    
  }
  
  render(){
    return(
      <HomePage/>
    )
  }
}