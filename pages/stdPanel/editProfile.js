import React, { Component } from "react";
import dynamic from 'next/dynamic'

const EditProfile = dynamic(() => import("@/views/dynamics/stdPanel/EditProfile"), { ssr: false });

export default class editProfile extends Component {

  componentDidMount(){
    
  }
  
  render(){
    return(
      <EditProfile/>
    )
  }
}