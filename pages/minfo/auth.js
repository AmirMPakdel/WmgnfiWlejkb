import React, { Component } from "react";
import dynamic from 'next/dynamic'

const Auth = dynamic(() => import("@/views/dynamics/minfo/Auth"), { ssr: false });

export default class auth extends Component {

  componentDidMount(){
    
  }
  
  render(){
    return(
      <Auth/>
    )
  }
}