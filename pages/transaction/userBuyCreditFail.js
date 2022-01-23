import React, { Component } from "react";
import dynamic from 'next/dynamic'

const UserBuyCreditFail = dynamic(() => import("@/views/dynamics/transaction/UserBuyCreditFail"), { ssr: false });

export default class userBuyCreditFail extends Component {

  componentDidMount(){
    
  }
  
  render(){
    return(
      <UserBuyCreditFail/>
    )
  }
}