import React, { Component } from "react";
import dynamic from 'next/dynamic'

const ChangePassword = dynamic(() => import("@/views/dynamics/index/ChangePassword"), { ssr: false });

export default class changePassword extends Component {

  componentDidMount(){
  }
  
  render(){
    return(
      <ChangePassword/>
    )
  }
}