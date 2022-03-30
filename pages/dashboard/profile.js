import React, { Component } from "react";
import dynamic from 'next/dynamic'

const Profile = dynamic(() => import("@/views/dynamics/dashboard/Profile"), { ssr: false });

export default class profile extends Component {

  render(){
    return(
      <Profile/>
    )
  }
}