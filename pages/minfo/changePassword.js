import React, { Component } from "react";
import dynamic from 'next/dynamic'

const ChangePassword = dynamic(() => import("@/views/dynamics/minfo/ChangePassword"), { ssr: false });

export default class changePassword extends Component {

  render(){
    return(
      <ChangePassword/>
    )
  }
}