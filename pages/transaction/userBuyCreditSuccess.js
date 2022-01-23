import React, { Component } from "react";
import dynamic from 'next/dynamic'

const UserBuyCreditSuccess = dynamic(() => import("@/views/dynamics/transaction/UserBuyCreditSuccess"), { ssr: false });

export default class userBuyCreditSuccess extends Component {

  componentDidMount(){
    
  }
  
  render(){
    return(
      <UserBuyCreditSuccess/>
    )
  }
}